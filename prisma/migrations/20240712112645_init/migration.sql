-- CreateTable
CREATE TABLE "Movie" (
    "movieId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "genres" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rating" (
    "ratingId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "timestamp" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "tagId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Link" (
    "linkId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "imdbId" INTEGER NOT NULL,
    "tmdbId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "GenomeScore" (
    "scoreId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "relevance" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "GenomeTag" (
    "tagId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tag" TEXT NOT NULL
);
