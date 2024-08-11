"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MovieList } from "./_components/movie-list";
import { useQueryState } from "nuqs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TbChevronLeft,
  TbChevronRight,
  TbChevronsLeft,
  TbChevronsRight,
} from "react-icons/tb";

export function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 0);
  const [totalPages, setTotalPages] = useState(1);

  const [localGenre, setLocalGenre] = useState("");
  const [localYear, setLocalYear] = useState("");
  const [localRating, setLocalRating] = useState("");
  const [localRatingCount, setLocalRatingCount] = useState("");

  const [genre, setGenre] = useQueryState("genre");
  const [year, setYear] = useQueryState("year");
  const [rating, setRating] = useQueryState("rating");
  const [ratingCount, setRatingCount] = useQueryState("ratings_count");

  function handlePagination(next: boolean) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (next) {
      if (!hasNext) return;
      current.set("page", String(page + 1));
    } else {
      if (!hasPrevious) return;
      current.set("page", String(page - 1));
    }

    router.push(`${pathname}?${current.toString()}`);
  }

  function stepToPage(page: number) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", String(page));
    router.push(`${pathname}?${current.toString()}`);
  }

  function applyFilters(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (localGenre) setGenre(localGenre);
    else setGenre("");
    if (localYear) setYear(localYear);
    else setYear("");
    if (localRating) setRating(localRating);
    else setRating("");
    if (localRatingCount) setRatingCount(localRatingCount);
    else setRatingCount("");
  }

  function clearFilters() {
    setLocalGenre("");
    setLocalYear("");
    setLocalRating("");
    setLocalRatingCount("");
    setGenre("");
    setYear("");
    setRating("");
    setRatingCount("");
  }

  useEffect(() => {
    const currentPage = Number(searchParams.get("page")) || 0;
    setPage(currentPage);
  }, [searchParams]);

  return (
    <div className="h-full flex flex-col gap-4">
      <section className="flex flex-col gap-2 my-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <form className="flex gap-3" onSubmit={applyFilters}>
          <Input
            className="max-w-xs"
            type="text"
            value={localGenre}
            onChange={(e) => setLocalGenre(e.target.value)}
            placeholder="Genre"
          />
          <Input
            className="max-w-xs"
            type="text"
            value={localYear}
            onChange={(e) => setLocalYear(e.target.value)}
            placeholder="Year"
          />
          <Input
            className="max-w-xs"
            type="number"
            min={0}
            value={localRating}
            onChange={(e) => setLocalRating(e.target.value)}
            placeholder="Rating"
            max={5}
          />
          <Input
            className="max-w-xs"
            type="number"
            min={0}
            value={localRatingCount}
            onChange={(e) => setLocalRatingCount(e.target.value)}
            placeholder="Rating Count"
          />
          <Button type="submit">Apply Filters</Button>
          <Button variant="secondary" type="submit" onClick={clearFilters}>
            Clear Filters
          </Button>
        </form>
      </section>

      <section className="max-h-[70vh] overflow-y-auto w-full">
        <MovieList
          filters={{
            genre,
            year,
            rating,
            rating_counts: ratingCount,
          }}
          onPaginationChange={(next, previous, total) => {
            setHasNext(next);
            setHasPrevious(previous);
            setTotalPages(total);
          }}
        />
      </section>

      <Pagination className="w-full justify-between px-2">
        <span className="text-muted-foreground ">
          Page {page} of {totalPages - 1}
        </span>

        <PaginationContent>
          <PaginationItem>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-transparent"
              disabled={!hasPrevious}
              onClick={() => stepToPage(0)}
            >
              <TbChevronsLeft size={24} />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-transparent"
              disabled={!hasPrevious}
              onClick={() => handlePagination(false)}
            >
              <TbChevronLeft size={24} />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-transparent"
              disabled={!hasNext}
              onClick={() => handlePagination(true)}
            >
              <TbChevronRight size={24} />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-transparent"
              disabled={!hasNext}
              onClick={() => stepToPage(totalPages - 1)}
            >
              <TbChevronsRight size={24} />
            </Button>
          </PaginationItem>
        </PaginationContent>

        <div />
      </Pagination>
    </div>
  );
}
