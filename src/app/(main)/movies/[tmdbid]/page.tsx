import {
  fetchImdbDetail,
  fetchMovieDetail,
} from "@/actions/fetch-movie-details";
import Image from "next/image";
import { InfoCard } from "./_components/info-card";
import { PersonList } from "./_components/person-list";
import { ProductionCompanies } from "./_components/production-companies";
import { MovieHeader } from "./_components/movie-header";
import { PlotSummary } from "./_components/plot-summary";

export default async function Page({ params }: { params: { tmdbid: number } }) {
  const { tmdbid } = params;

  const movie = await fetchMovieDetail(tmdbid);
  const omdbMovie = await fetchImdbDetail(movie.imdb_id);

  const directors = omdbMovie.Director ? [omdbMovie.Director] : [];
  const writers = omdbMovie.Writer ? omdbMovie.Writer.split(",") : [];
  const actors = omdbMovie.Actors ? omdbMovie.Actors.split(",") : [];

  return (
    <main className="flex flex-col w-full gap-4">
      <section className="w-full h-screen flex items-center justify-center gap-24 bg-zinc-50">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${movie.poster_path}`}
          alt={movie.title}
          width={450}
          height={400}
          className="shadow-2xl"
        />

        <div className="flex flex-col gap-4 max-w-lg">
          <MovieHeader title={movie.title} releaseDate={movie.release_date} />
          <p className="text-justify text-lg text-muted-foreground leading-relaxed">
            {omdbMovie.Plot}
          </p>
        </div>
      </section>

      <section className="box-border w-full h-screen flex flex-col py-10 px-20">
        <div className="space-y-4">
          <PlotSummary plot={movie.overview} />
          <ProductionCompanies companies={movie.production_companies} />
          <div className="relative space-y-4">
            <PersonList title="Director" persons={directors} role="Director" />
            <PersonList title="Writers" persons={writers} role="Writer" />
            <PersonList title="Actors" persons={actors} role="Actor" />
            <aside className="space-y-4 lg:absolute lg:right-0 lg:top-0">
              <InfoCard
                title="Genres"
                items={movie.genres.map((g) => g.name)}
              />
              <InfoCard
                title="Languages"
                items={omdbMovie.Language.split(",")}
              />
              <InfoCard
                title="Countries"
                items={omdbMovie.Country.split(",")}
              />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
