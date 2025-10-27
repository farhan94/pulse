/**
 * Channel allowlist and customization configuration
 */

export interface ChannelCustomization {
  backgroundImage?: string | null;
  description?: string | null;
}

export interface Channel {
  id: string;
  allowlisted: boolean;
  customization?: ChannelCustomization;
}

export const channels: Channel[] = [
  {
    id: "animenews",
    allowlisted: true,
    customization: {
      backgroundImage: null, // Future: '/channel-backgrounds/animenews.jpg'
      description: null, // null = use Farcaster channel description
    },
  },
];

/**
 * Check if a channel is allowlisted
 */
export function isChannelAllowlisted(channelId: string): boolean {
  return channels.some(
    (channel) => channel.id === channelId && channel.allowlisted
  );
}

/**
 * Get channel configuration
 */
export function getChannelConfig(channelId: string): Channel | undefined {
  return channels.find((channel) => channel.id === channelId);
}
