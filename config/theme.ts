/**
 * Theme configuration for Pulse
 * Easily customizable colors, fonts, spacing, and transitions
 */

export const themeConfig = {
  colors: {
    light: {
      background: {
        primary: "#ffffff",
        secondary: "#f9fafb",
        tertiary: "#f3f4f6",
      },
      text: {
        primary: "#111827",
        secondary: "#6b7280",
        tertiary: "#9ca3af",
      },
      accent: {
        primary: "#3b82f6",
        secondary: "#8b5cf6",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      card: {
        background: "#ffffff",
        border: "#e5e7eb",
        hover: "#f9fafb",
      },
    },
    dark: {
      background: {
        primary: "#0a0a0a",
        secondary: "#1a1a1a",
        tertiary: "#2a2a2a",
      },
      text: {
        primary: "#f9fafb",
        secondary: "#d1d5db",
        tertiary: "#9ca3af",
      },
      accent: {
        primary: "#60a5fa",
        secondary: "#a78bfa",
        success: "#34d399",
        warning: "#fbbf24",
        error: "#f87171",
      },
      card: {
        background: "#1a1a1a",
        border: "#374151",
        hover: "#2a2a2a",
      },
    },
  },
  typography: {
    fonts: {
      sans: 'var(--font-geist-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
      mono: 'var(--font-geist-mono, ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace)',
    },
    sizes: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
    },
    weights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeights: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },
  spacing: {
    castCard: {
      padding: "1rem", // 16px
      gap: "0.75rem", // 12px
      borderRadius: "0.75rem", // 12px
    },
  },
  transitions: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
  },
} as const;
