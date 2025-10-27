/**
 * TypeScript type definitions for Pulse
 */

/**
 * Farcaster Cast Author
 */
export interface CastAuthor {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
}

/**
 * Cast Engagement Metrics
 */
export interface CastEngagement {
  likes: number;
  recasts: number;
  replies: number;
}

/**
 * Farcaster Cast with Popularity Score
 */
export interface PopularCast {
  hash: string;
  author: CastAuthor;
  text: string;
  timestamp: string;
  engagement: CastEngagement;
  popularityScore: number;
  url: string;
  embeds?: CastEmbed[];
}

/**
 * Cast Embed (images, videos, links)
 */
export interface CastEmbed {
  url?: string;
  castId?: {
    fid: number;
    hash: string;
  };
}

/**
 * API Response for Popular Posts
 */
export interface PopularPostsResponse {
  channelId: string;
  timeRange: string;
  posts: PopularCast[];
  cachedAt: string;
}

/**
 * Channel Information
 */
export interface ChannelInfo {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  followerCount?: number;
}

/**
 * API Response for Channels
 */
export interface ChannelsResponse {
  channels: {
    id: string;
    name: string;
    description: string;
    customization: {
      backgroundImage: string | null;
      description: string | null;
    };
  }[];
}

/**
 * Cache Entry
 */
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

/**
 * Time Range Options
 */
export type TimeRange = "6h" | "24h" | "7d" | "30d";

/**
 * Theme Mode
 */
export type ThemeMode = "light" | "dark" | "system";

/**
 * Error Response
 */
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
