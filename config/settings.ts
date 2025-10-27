/**
 * Application-wide settings
 * Easily modifiable configuration for Pulse
 */

export const settings = {
  /**
   * Popularity calculation weights
   */
  popularity: {
    weights: {
      likes: 1.0,
      recasts: 1.2,
      replies: 1.3,
    },
  },

  /**
   * Display settings
   */
  display: {
    postsPerPage: 10,
    timeRange: "24h" as const, // Future: ['6h', '24h', '7d', '30d']
  },

  /**
   * Cache configuration
   */
  cache: {
    durationMs: 60 * 60 * 1000, // 1 hour
  },

  /**
   * Theme configuration
   */
  theme: {
    defaultMode: "system" as "light" | "dark" | "system", // 'light' | 'dark' | 'system'
  },
} as const;
