import {
  fetchImdbDetail,
  fetchMovieDetail,
} from "@/actions/fetch-movie-details";
import { PageSubtitle } from "@/app/_components/page-subtitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";

export default async function Page({ params }: { params: { tmdbid: number } }) {
  const { tmdbid } = params;

  const movie = await fetchMovieDetail(tmdbid);
  const omdbMovie = await fetchImdbDetail(movie.imdb_id);

  return (
    <main className="flex flex-col w-full gap-6">
      <section className="w-full h-screen flex items-center justify-center gap-24 bg-zinc-50">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={400}
          className="shadow-2xl"
        />

        <div className="flex flex-col gap-4 max-w-lg">
          <h1 className="text-4xl font-medium">{movie.title}</h1>
          <PageSubtitle title={movie.release_date.split("-")[0]} />

          <Separator />

          <p className="text-justify text-lg text-muted-foreground leading-relaxed">
            {omdbMovie.Plot}
          </p>
        </div>
      </section>

      <section className="box-border w-full h-screen flex flex-col pt-10 px-20">
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-2xl font-bold">Plot Summary</h3>
            <p className="text-muted-foreground">{movie.overview}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="mb-4 text-2xl font-bold">Production Companies</h3>
            <ul className="flex flex-col gap-2">
              {movie.production_companies.map((company) => (
                <li key={company.id} className="text-muted-foreground">
                  {company.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div>
              <h3 className="mb-4 text-2xl font-bold">Casting</h3>

              <ul className="space-y-3">
                {omdbMovie.Director && (
                  <li className="text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-zinc-100">
                        <FaUserAlt />
                      </div>

                      <section className="flex flex-col">
                        <span className="text-primary font-medium">
                          {omdbMovie.Director}
                        </span>
                        <span>Director</span>
                      </section>
                    </div>
                  </li>
                )}

                {omdbMovie.Writer &&
                  omdbMovie.Writer.split(",").map((writer) => (
                    <li key={writer} className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-zinc-100">
                          <FaUserAlt />
                        </div>

                        <section className="flex flex-col">
                          <span className="text-primary font-medium">
                            {writer}
                          </span>
                          <span>Writers</span>
                        </section>
                      </div>
                    </li>
                  ))}

                {omdbMovie.Actors &&
                  omdbMovie.Actors.split(",").map((actor) => (
                    <li key={actor} className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-zinc-100">
                          <FaUserAlt />
                        </div>

                        <section className="flex flex-col">
                          <span className="text-primary font-medium">
                            {actor}
                          </span>
                          <span>Actor</span>
                        </section>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            <aside className="absolute right-0 top-0 space-y-4">
              <Card className="w-96 h-fit">
                <CardHeader>
                  <CardTitle className="text-xl">Genres</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-primary text-white px-2 py-1 rounded-full text-sm mr-2"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="w-96 h-fit">
                <CardHeader>
                  <CardTitle className="text-xl">Languages</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col">
                    {omdbMovie.Language.split(",").map((language) => (
                      <span key={language} className="text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="w-96 h-fit">
                <CardHeader>
                  <CardTitle className="text-xl">Countries</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col">
                    {omdbMovie.Country.split(",").map((country) => (
                      <span key={country} className="text-sm">
                        {country}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
