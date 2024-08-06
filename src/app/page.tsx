import { Suspense } from "react";
import { HomeContent } from "./content";
import { PageTitle } from "./_components/page-title";
import { PageSubtitle } from "./_components/page-subtitle";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full pt-6 pl-10">
      <header>
        <PageTitle title="Home" />
        <PageSubtitle title="Welcome to the MovieLens 20M dataset, feel free to explore the movie!" />
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeContent />
      </Suspense>
    </main>
  );
}
