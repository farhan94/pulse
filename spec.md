# Pulse - Farcaster Mini App Specification

## Overview
Pulse is a Farcaster Mini App that displays the top 10 most popular casts in a given Farcaster channel over the last 24 hours. Users can view trending content and click to open posts directly in Farcaster.

## Tech Stack

### Core
- **Next.js 14+** - App Router, React Server Components
- **Node.js 20.x** - LTS version
- **pnpm** - Package manager
- **TypeScript** - Strict mode enabled
- **Tailwind CSS** - Styling framework with dark mode support
- **next-themes** - Theme management and persistence

### Integrations
- **@farcaster/frame-sdk** - Farcaster Mini App integration
- **@neynar/nodejs-sdk** - Neynar API client for Farcaster data
- **Neynar API** - Free tier (rate limits apply)

### Deployment
- **Vercel** - Hosting platform

## Requirements

### Functional Requirements

#### 1. Channel Pages
- Dynamic route: `/channel/[channelId]`
- Display top 10 most popular casts from the last 24 hours
- Initial channel: `/channel/animenews`
- Channel allowlist system (only approved channels accessible)

#### 2. Popularity Calculation
**Scoring Formula:**
```
score = (likes × 1.0) + (recasts × 1.2) + (replies × 1.3)
```
- Fetch all casts from channel in last 24 hours
- Calculate score for each cast
- Sort by score descending
- Display top 10

#### 3. User Interactions
- Click on any cast → Opens cast in Farcaster client (minimizes mini app)
- Uses Frame SDK `sdk.actions.openUrl()` method
- Smooth, responsive interactions

#### 4. Channel Allowlist
- Only allowlisted channels are accessible
- Initial allowlist: `["animenews"]`
- Non-allowlisted channels show "Request Access" page
- Easy to add new channels via config file

#### 5. Caching Strategy
- Cache duration: **1 hour** (60 minutes)
- Cache popular posts API responses
- Reduces Neynar API calls (free tier rate limits)
- Cache key pattern: `channel:{channelId}:24h`

#### 6. Configuration System
All settings easily modifiable in config files:
- Number of posts to show (default: 10)
- Popularity score weights (likes, recasts, replies)
- Time range (currently: 24h only)
- Cache duration (currently: 1 hour)
- Allowlisted channels
- Per-channel customizations (background, description)
- Theme colors and typography (fonts, sizes, etc.)

#### 7. Dark Mode Theme
- **Theme Options**: Light, Dark, System (auto-detect OS preference)
- **Default**: System preference
- **Persistence**: localStorage (persists across sessions)
- **Toggle Location**: App header/navigation
- **Scope**: Global across entire app
- **Colors**: Tailwind CSS dark mode defaults (customizable via config)
- **Typography**: Easily modifiable fonts, sizes, weights via theme config
- **Transition**: Smooth theme transitions without flash

### Design Guidelines

#### Visual Style
- **Modern, sleek, minimal** aesthetic
- Each cast in its own **bubble/container** with clear separation
- **Mobile-friendly** responsive design
- Clean typography, generous whitespace
- Smooth hover states and transitions

#### Channel Page Layout
- Channel header section
  - Channel name
  - Channel description (from Farcaster, or custom if configured)
  - Customizable background (default: plain background for now)
- Top posts list
  - Grid/list of cast cards
  - Loading states with skeletons
  - Error states with friendly messages

#### Cast Card Design
Each card displays:
- Author avatar (circular)
- Author username and display name
- Cast text content (truncated if too long)
- Engagement metrics:
  - Likes count
  - Recasts count
  - Replies count
- Popularity score badge (optional, can show/hide)
- Timestamp (relative, e.g., "2h ago")
- Click target (entire card is clickable)

#### Color Scheme & Theme
- **Light Mode**:
  - Background: Neutral whites and light grays
  - Text: Dark gray/black
  - Cards: White with subtle shadows
  - Accents: Tailwind default colors

- **Dark Mode**:
  - Background: Dark gray (#1a1a1a, #2a2a2a)
  - Text: Light gray/white
  - Cards: Darker gray with elevated appearance
  - Accents: Tailwind dark mode colors

- **Theme Toggle**: Sun/moon icon in header
- **Customization**: All colors defined in theme config file
- Placeholder logo until custom logo is designed

#### Responsive Design
- Mobile-first approach
- Single column on mobile
- Multi-column grid on tablet/desktop (if appropriate)
- Touch-friendly tap targets

### Non-Functional Requirements

#### Performance
- Fast initial load (< 2s)
- Optimized images (Next.js Image component)
- Efficient caching
- Minimal API calls

#### Error Handling
- Neynar API failures: Show cached data or error message
- Rate limit exceeded: Show friendly message with retry time
- Channel not found: 404 page
- Channel not allowlisted: "Request Access" page
- Frame SDK unavailable: Graceful fallback

#### SEO & Metadata
- Proper meta tags for each channel page
- Open Graph tags
- Frame metadata for Farcaster integration

## Project Structure

```
pulse/
├── app/
│   ├── layout.tsx                    # Root layout, Frame SDK + Theme providers
│   ├── page.tsx                      # Home/landing page
│   ├── channel/
│   │   └── [channelId]/
│   │       └── page.tsx              # Channel page with top posts
│   └── api/
│       ├── posts/
│       │   └── route.ts              # GET /api/posts?channelId=X&timeRange=24h
│       └── channels/
│           └── route.ts              # GET /api/channels (allowlist)
├── components/
│   ├── CastCard.tsx                  # Individual cast bubble
│   ├── MiniAppProvider.tsx           # Frame SDK context wrapper
│   ├── ThemeProvider.tsx             # Theme context wrapper (next-themes)
│   ├── ThemeToggle.tsx               # Theme toggle button component
│   ├── Header.tsx                    # App header with theme toggle
│   ├── PostsList.tsx                 # List of top posts
│   ├── LoadingState.tsx              # Loading skeletons
│   ├── ErrorState.tsx                # Error UI
│   └── RequestAccessPage.tsx         # Non-allowlisted channel page
├── lib/
│   ├── neynar.ts                     # Neynar API client wrapper
│   ├── popularity.ts                 # Popularity calculation logic
│   ├── cache.ts                      # In-memory caching utility
│   ├── frame.ts                      # Frame SDK utilities
│   └── types.ts                      # TypeScript type definitions
├── config/
│   ├── channels.ts                   # Allowlisted channels configuration
│   ├── settings.ts                   # App-wide settings (scores, cache, etc.)
│   └── theme.ts                      # Theme configuration (colors, fonts, etc.)
├── public/
│   ├── logo-placeholder.svg          # Placeholder logo
│   └── channel-backgrounds/          # Custom channel background images
└── .env.local                        # Environment variables
```

## Configuration Files

### `/config/settings.ts`
```typescript
export const settings = {
  popularity: {
    weights: {
      likes: 1.0,
      recasts: 1.2,
      replies: 1.3
    }
  },
  display: {
    postsPerPage: 10,
    timeRange: '24h' // Future: ['6h', '24h', '7d', '30d']
  },
  cache: {
    durationMs: 60 * 60 * 1000 // 1 hour
  },
  theme: {
    defaultMode: 'system' // 'light' | 'dark' | 'system'
  }
}
```

### `/config/theme.ts`
```typescript
export const themeConfig = {
  colors: {
    light: {
      background: {
        primary: '#ffffff',
        secondary: '#f9fafb',
        tertiary: '#f3f4f6'
      },
      text: {
        primary: '#111827',
        secondary: '#6b7280',
        tertiary: '#9ca3af'
      },
      accent: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      },
      card: {
        background: '#ffffff',
        border: '#e5e7eb',
        hover: '#f9fafb'
      }
    },
    dark: {
      background: {
        primary: '#0a0a0a',
        secondary: '#1a1a1a',
        tertiary: '#2a2a2a'
      },
      text: {
        primary: '#f9fafb',
        secondary: '#d1d5db',
        tertiary: '#9ca3af'
      },
      accent: {
        primary: '#60a5fa',
        secondary: '#a78bfa',
        success: '#34d399',
        warning: '#fbbf24',
        error: '#f87171'
      },
      card: {
        background: '#1a1a1a',
        border: '#374151',
        hover: '#2a2a2a'
      }
    }
  },
  typography: {
    fonts: {
      sans: 'var(--font-geist-sans)', // Can be changed to any font
      mono: 'var(--font-geist-mono)'
    },
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem' // 30px
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  spacing: {
    castCard: {
      padding: '1rem',        // 16px
      gap: '0.75rem',         // 12px
      borderRadius: '0.75rem' // 12px
    }
  },
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    }
  }
}
```

### `/config/channels.ts`
```typescript
export const channels = [
  {
    id: 'animenews',
    allowlisted: true,
    customization: {
      backgroundImage: null, // Future: '/channel-backgrounds/animenews.jpg'
      description: null      // null = use Farcaster channel description
    }
  }
]
```

## API Endpoints

### GET `/api/posts`
**Query Parameters:**
- `channelId` (required): Channel ID (e.g., "animenews")
- `timeRange` (optional): Time range (default: "24h")

**Response:**
```json
{
  "channelId": "animenews",
  "timeRange": "24h",
  "posts": [
    {
      "hash": "0x...",
      "author": {
        "fid": 123,
        "username": "user",
        "displayName": "User Name",
        "pfpUrl": "https://..."
      },
      "text": "Cast content...",
      "timestamp": "2025-10-25T10:00:00Z",
      "engagement": {
        "likes": 50,
        "recasts": 20,
        "replies": 10
      },
      "popularityScore": 89,
      "url": "https://warpcast.com/user/0x..."
    }
  ],
  "cachedAt": "2025-10-25T10:00:00Z"
}
```

### GET `/api/channels`
**Response:**
```json
{
  "channels": [
    {
      "id": "animenews",
      "name": "Anime News",
      "description": "Latest anime news and updates",
      "customization": {
        "backgroundImage": null,
        "description": null
      }
    }
  ]
}
```

## Environment Variables

```bash
# .env.local
NEYNAR_API_KEY=your_neynar_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Implementation Plan

### Phase 1: Project Setup ✅
**Milestone:** Development environment ready

- [x] Initialize Next.js 14 project with TypeScript and Tailwind
- [x] Install dependencies (Frame SDK, Neynar SDK, next-themes, etc.)
- [x] Configure TypeScript (strict mode)
- [x] Setup Tailwind CSS configuration with dark mode
- [x] Configure ESLint and Prettier
- [x] Create environment variables file
- [x] Setup project folder structure
- [x] Add placeholder logo to `/public`

### Phase 2: Configuration Layer ✅
**Milestone:** Settings and configuration system ready

- [x] Create `/config/settings.ts` with all configurable values
- [x] Create `/config/channels.ts` with animenews allowlist
- [x] Create `/config/theme.ts` with theme colors, fonts, spacing
- [x] Create `/lib/types.ts` with TypeScript definitions
- [x] Document configuration options

### Phase 3: Neynar Integration
**Milestone:** Able to fetch and rank channel posts

- [ ] Create Neynar API client wrapper (`/lib/neynar.ts`)
- [ ] Implement popularity calculation logic (`/lib/popularity.ts`)
- [ ] Create caching utility (`/lib/cache.ts`)
- [ ] Test fetching casts from /animenews channel
- [ ] Test popularity score calculation
- [ ] Test caching mechanism (1-hour TTL)

### Phase 4: API Routes
**Milestone:** Backend API endpoints functional

- [ ] Implement `GET /api/posts` endpoint
  - [ ] Validate channelId parameter
  - [ ] Check channel allowlist
  - [ ] Fetch casts from Neynar
  - [ ] Calculate popularity scores
  - [ ] Sort and return top 10
  - [ ] Implement caching
  - [ ] Add error handling
- [ ] Implement `GET /api/channels` endpoint
- [ ] Test API routes with Postman/Thunder Client

### Phase 5: Frame SDK Integration
**Milestone:** Farcaster Mini App integration working

- [ ] Create MiniAppProvider component (`/components/MiniAppProvider.tsx`)
- [ ] Initialize Frame SDK in app layout
- [ ] Implement SDK context for app-wide access
- [ ] Create utility functions (`/lib/frame.ts`)
- [ ] Implement `openUrl()` action for opening casts
- [ ] Test in Farcaster client
- [ ] Add fallback for non-Frame context

### Phase 6: Theme System
**Milestone:** Dark mode and theming fully functional

- [ ] Create `ThemeProvider.tsx` component (next-themes wrapper)
- [ ] Create `ThemeToggle.tsx` component (sun/moon icon button)
- [ ] Create `Header.tsx` component with theme toggle
- [ ] Integrate ThemeProvider in app layout
- [ ] Configure Tailwind for dark mode (class strategy)
- [ ] Apply theme classes to base components
- [ ] Test theme switching (light/dark/system)
- [ ] Test theme persistence in localStorage
- [ ] Ensure smooth transitions without flash

### Phase 7: UI Components
**Milestone:** Reusable UI components built

- [ ] Create `CastCard.tsx` component
  - [ ] Author section (avatar, username, display name)
  - [ ] Cast text content
  - [ ] Engagement metrics display
  - [ ] Popularity score badge
  - [ ] Timestamp
  - [ ] Click handler
  - [ ] Hover states
  - [ ] Dark mode styling
  - [ ] Mobile-responsive styling
- [ ] Create `PostsList.tsx` component
- [ ] Create `LoadingState.tsx` with skeleton loaders
- [ ] Create `ErrorState.tsx` component
- [ ] Create `RequestAccessPage.tsx` for non-allowlisted channels
- [ ] Test components in isolation (light + dark modes)

### Phase 8: Channel Page
**Milestone:** Main feature complete - channel pages work

- [ ] Create `/app/channel/[channelId]/page.tsx`
- [ ] Fetch channel data and top posts
- [ ] Check if channel is allowlisted
- [ ] Render channel header
  - [ ] Channel name and description
  - [ ] Background (plain for now, support custom later)
- [ ] Render top posts list using PostsList component
- [ ] Implement click-to-open in Farcaster
- [ ] Add loading states
- [ ] Add error states
- [ ] Test with /animenews channel
- [ ] Test in both light and dark modes
- [ ] Mobile responsiveness testing

### Phase 9: Additional Pages
**Milestone:** Supporting pages complete

- [ ] Create home page (`/app/page.tsx`)
  - [ ] App description
  - [ ] Link to /channel/animenews
  - [ ] Branding (Pulse name + placeholder logo)
- [ ] Create 404 page for invalid channels
- [ ] Add proper meta tags and SEO
- [ ] Add Frame metadata
- [ ] Ensure all pages support dark mode

### Phase 10: Testing & Polish
**Milestone:** Production-ready app

- [ ] Test all user flows
- [ ] Test in Farcaster client (Warpcast)
- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Test theme switching (light/dark/system)
- [ ] Test theme persistence across sessions
- [ ] Test error scenarios
- [ ] Test rate limiting behavior
- [ ] Optimize performance
- [ ] Review accessibility (including dark mode contrast)
- [ ] Code cleanup and documentation

### Phase 11: Deployment
**Milestone:** Live in production

- [ ] Create Vercel project
- [ ] Configure environment variables in Vercel
- [ ] Deploy to production
- [ ] Test production deployment
- [ ] Configure custom domain (if applicable)
- [ ] Submit to Farcaster Mini Apps directory (if applicable)
- [ ] Monitor for errors

## Future Enhancements (Out of Scope)

These features are planned for future versions:

1. **Multiple Time Ranges**
   - Add 6h, 7d, 30d options
   - UI selector for time range

2. **Historical View**
   - "Top posts for specific day" feature
   - Date picker interface

3. **In-App Interactions**
   - Like, recast, reply directly in mini app
   - Comment threads
   - User authentication

4. **Advanced Caching**
   - Redis for production multi-instance deployments
   - Background job to refresh cache

5. **Open to All Channels**
   - Remove allowlist requirement
   - Better rate limit management
   - Upgrade Neynar plan

6. **Channel Management**
   - Admin panel for managing channels
   - Self-service channel registration
   - Custom channel themes

7. **Analytics**
   - Track popular channels
   - User engagement metrics
   - Popular posts over time

8. **Notifications**
   - Alert when new trending posts appear
   - Daily/weekly digests

## Success Criteria

Initial version (v1.0) is successful if:

- [ ] `/channel/animenews` displays top 10 posts from last 24 hours
- [ ] Posts are correctly ranked by popularity score
- [ ] Clicking a post opens it in Farcaster client
- [ ] App works smoothly in Farcaster Mini App context
- [ ] UI is clean, modern, and mobile-friendly
- [ ] Dark mode works perfectly (light/dark/system preference)
- [ ] Theme persists across sessions via localStorage
- [ ] Theme toggle is accessible in header
- [ ] All colors and fonts are easily customizable via theme config
- [ ] Caching reduces API calls to acceptable levels
- [ ] Non-allowlisted channels show request access page
- [ ] Settings are easily modifiable via config files
- [ ] No critical bugs or errors

## Questions & Decisions

### Resolved
- Time range: 24 hours (fixed for v1)
- Number of posts: 10 (configurable)
- Popularity weights: likes=1.0, recasts=1.2, replies=1.3
- Cache duration: 1 hour
- Initial channel: animenews
- Channel allowlist: Required for v1
- Click behavior: Open in Farcaster (minimize mini app)
- Dark mode: Enabled with light/dark/system preference
- Theme default: System preference (auto-detect)
- Theme persistence: localStorage (persists across sessions)
- Theme toggle location: App header/navigation
- Theme customization: All colors, fonts, spacing in `/config/theme.ts`

### Open Questions
- None currently - proceed with implementation

## Notes

- Keep code clean and well-documented
- Follow Next.js and React best practices
- Optimize for Neynar free tier rate limits
- Design for easy expansion to more channels
- Maintain TypeScript strict mode throughout
- Mobile-first responsive design approach
