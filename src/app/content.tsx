"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MovieList } from "./_components/movie-list";
import { PageTitle } from "./_components/page-title";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

export function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const currentPage = Number(searchParams.get("page")) || 0;
    setPage(currentPage);
  }, [searchParams]);

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

  return (
    <div className="h-full flex flex-col gap-4">
      <section className="max-h-[calc(100vh-9rem)] overflow-y-auto w-full">
        <MovieList
          onPaginationChange={(next, previous, total) => {
            setHasNext(next);
            setHasPrevious(previous);
            setTotalPages(total);
          }}
        />
      </section>

      <Pagination className="">
        <PaginationContent className="space-x-2">
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePagination(false)} />
          </PaginationItem>

          {page > 1 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => stepToPage(0)}>0</PaginationLink>
              </PaginationItem>

              <PaginationEllipsis />
            </>
          )}

          <div className="space-x-2">
            <span className="font-medium">{page}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{totalPages}</span>
          </div>

          {page < totalPages && (
            <>
              <PaginationEllipsis />

              <PaginationItem>
                <PaginationLink onClick={() => stepToPage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext onClick={() => handlePagination(true)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}