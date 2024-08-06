import { useMemo } from "react";

interface MovieTableGenresProps {
  genres: string;
}

export function MovieTableGenres({ genres }: MovieTableGenresProps) {
  const splittedGenres = useMemo(() => genres.split("|"), [genres]);

  return (
    <div className="flex gap-2 flex-wrap">
      {splittedGenres.map((genre) => (
        <span
          key={genre}
          className="px-2 py-1 text-xs font-semibold bg-gray-200 rounded-full"
        >
          {genre}
        </span>
      ))}
    </div>
  );
}
