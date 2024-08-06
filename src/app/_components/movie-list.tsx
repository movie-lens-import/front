"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { MovieTableGenres } from "./movie-table-genres";
import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TbExternalLink } from "react-icons/tb";
import { TaskActionTooltiped } from "../(main)/files/_components/task-list";
import { TooltipProvider } from "@/components/ui/tooltip";

type Movie = {
  genres: string;
  movieid: number;
  title: string;
  average_rating: number;
  ratings_count: number;
  imdbid: string;
  tmdbid: string;
};

interface MoviesStruct {
  results: Movie[];
  count: number;
  next?: string;
  previous?: string;
}

interface MovieListProps {
  onPaginationChange: (
    hasNext: boolean,
    hasPrevious: boolean,
    totalPage: number
  ) => void;
}

export function MovieList({ onPaginationChange }: MovieListProps) {
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("movies") || 30);
  const offset = Number(searchParams.get("page") || 0);

  const { data, error, isLoading } = useSWR<MoviesStruct>(
    `${process.env.NEXT_PUBLIC_FLASK_API_URL}/movies?limit=${limit}&offset=${
      offset * limit
    }`,
    fetcher
  );

  if (data) {
    onPaginationChange(
      !!data.next,
      !!data.previous,
      Math.floor(data.count / limit)
    );
  }

  const renderSkeletonRows = () => {
    return (
      <>
        {[...Array(30)].map((_, index) => (
          <TableRow key={index}>
            <TableCell className="py-4">
              <Skeleton width={40} />
            </TableCell>
            <TableCell className="py-4">
              <Skeleton width={600} />
            </TableCell>
            <TableCell className="py-4">
              <Skeleton width={60} />
            </TableCell>
            <TableCell className="py-4">
              <Skeleton width={60} />
            </TableCell>
            <TableCell className="py-4">
              <Skeleton width={200} />
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase text-xs font-semibold tracking-wide">
              Movie ID
            </TableHead>
            <TableHead className="uppercase text-xs font-semibold tracking-wide">
              Title
            </TableHead>
            <TableHead className="uppercase text-xs font-semibold tracking-wide">
              Avg. Rating
            </TableHead>
            <TableHead className="uppercase text-xs font-semibold tracking-wide">
              Num. Ratings
            </TableHead>
            <TableHead className="uppercase text-xs font-semibold tracking-wide">
              Genres
            </TableHead>
            <TableHead className="uppercase text-xs font-semibold tracking-wide" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading
            ? renderSkeletonRows()
            : data?.results.map((movie) => (
                <TableRow key={movie.movieid}>
                  <TableCell className="py-4 w-[100px]">
                    {movie.movieid}
                  </TableCell>
                  <TableCell className="py-4">{movie.title}</TableCell>
                  <TableCell className="py-4 space-x-2 w-[200px]">
                    <span>{movie.average_rating.toFixed(2)}</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-muted-foreground">5</span>
                  </TableCell>
                  <TableCell className="py-4 w-[200px]">
                    {movie.ratings_count.toLocaleString()}
                  </TableCell>
                  <TableCell className="py-4 w-[320px] overflow-hidden">
                    <MovieTableGenres genres={movie.genres} />
                  </TableCell>
                  <TableCell className="py-4 flex items-center gap-2">
                    <TaskActionTooltiped
                      title="View details"
                      href={`/movies/${movie.tmdbid}`}
                    >
                      <TbExternalLink size={24} />
                    </TaskActionTooltiped>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
