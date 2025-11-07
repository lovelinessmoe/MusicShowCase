interface TrackInfoProps {
  title: string;
  artist: string;
}

export function TrackInfo({ title, artist }: TrackInfoProps) {
  return (
    <div className="text-center space-y-1 py-4 transition-all duration-300">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white transition-colors duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400">
        {title}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-400 transition-colors duration-300 hover:text-gray-300">
        {artist}
      </p>
    </div>
  );
}
