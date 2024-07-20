-- CreateTable
CREATE TABLE "Movie" (
    "movieId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "genres" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("movieId")
);

-- CreateTable
CREATE TABLE "Rating" (
    "ratingId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("ratingId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "tagId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "Link" (
    "linkId" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "imdbId" TEXT NOT NULL,
    "tmdbId" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("linkId")
);

-- CreateTable
CREATE TABLE "GenomeScore" (
    "scoreId" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "relevance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GenomeScore_pkey" PRIMARY KEY ("scoreId")
);

-- CreateTable
CREATE TABLE "GenomeTag" (
    "tagId" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "GenomeTag_pkey" PRIMARY KEY ("tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_movieId_key" ON "Link"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "GenomeScore_movieId_tagId_key" ON "GenomeScore"("movieId", "tagId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("movieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("movieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("movieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenomeScore" ADD CONSTRAINT "GenomeScore_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("movieId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenomeScore" ADD CONSTRAINT "GenomeScore_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "GenomeTag"("tagId") ON DELETE RESTRICT ON UPDATE CASCADE;
