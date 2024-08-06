"use server";

export async function fetchMovieDetail(tmdbId: number): Promise<Movie> {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_URL}/${tmdbId}?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch movie details");
  }
}

export async function fetchImdbDetail(imdbID: string): Promise<Omdb> {
  try {
    const response = await fetch(
      `${process.env.OMDB_API_URL}/?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch movie details from OMDB");
  }
}
