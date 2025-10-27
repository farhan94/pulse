import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <Image
            src="/logo-placeholder.svg"
            alt="Pulse Logo"
            width={120}
            height={120}
            priority
          />
        </div>

        <h1 className="text-4xl font-bold">Pulse</h1>

        <p className="text-lg text-gray-600 dark:text-gray-400">
          A Farcaster mini app that shows the most reacted to posts in a channel
        </p>

        <div className="pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            🚧 Under Construction - Phase 2 Complete
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">
            Next up: Neynar Integration
          </p>
        </div>
      </div>
    </div>
  );
}
