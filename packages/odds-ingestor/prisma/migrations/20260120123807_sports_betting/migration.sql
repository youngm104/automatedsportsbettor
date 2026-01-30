-- CreateEnum
CREATE TYPE "Sport" AS ENUM ('TENNIS', 'BASKETBALL', 'CRICKET', 'FOOTBALL', 'AMERICAN_FOOTBALL');

-- CreateEnum
CREATE TYPE "Book" AS ENUM ('BET365', 'BETFAIR', 'DABBLE', 'PINNACLE', 'SPORTSBET', 'UNIBET', 'TABTOUCH');

-- CreateEnum
CREATE TYPE "CompetitorRole" AS ENUM ('HOME', 'AWAY', 'NEUTRAL');

-- CreateEnum
CREATE TYPE "MarketType" AS ENUM ('H2H', 'SPREAD', 'TOTALS');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "sport" "Sport" NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competitor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "CompetitorRole" NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Competitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Market" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "book" "Book" NOT NULL,
    "type" "MarketType" NOT NULL,

    CONSTRAINT "Market_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeadToHeadOutcome" (
    "id" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "odds" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HeadToHeadOutcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeadToHeadMarket" (
    "marketId" TEXT NOT NULL,

    CONSTRAINT "HeadToHeadMarket_pkey" PRIMARY KEY ("marketId")
);

-- CreateTable
CREATE TABLE "OddsSummary" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "marketType" "MarketType" NOT NULL,
    "book" "Book" NOT NULL,
    "capturedTimestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OddsSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricedOutcome" (
    "id" TEXT NOT NULL,
    "summaryId" TEXT NOT NULL,
    "outcomeKey" TEXT NOT NULL,
    "odds" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PricedOutcome_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Market_eventId_book_type_key" ON "Market"("eventId", "book", "type");

-- CreateIndex
CREATE UNIQUE INDEX "HeadToHeadOutcome_marketId_competitorId_key" ON "HeadToHeadOutcome"("marketId", "competitorId");

-- CreateIndex
CREATE INDEX "OddsSummary_eventId_capturedTimestamp_idx" ON "OddsSummary"("eventId", "capturedTimestamp");

-- CreateIndex
CREATE UNIQUE INDEX "PricedOutcome_summaryId_outcomeKey_key" ON "PricedOutcome"("summaryId", "outcomeKey");

-- AddForeignKey
ALTER TABLE "Competitor" ADD CONSTRAINT "Competitor_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeadToHeadOutcome" ADD CONSTRAINT "HeadToHeadOutcome_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "HeadToHeadMarket"("marketId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeadToHeadOutcome" ADD CONSTRAINT "HeadToHeadOutcome_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "Competitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeadToHeadMarket" ADD CONSTRAINT "HeadToHeadMarket_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OddsSummary" ADD CONSTRAINT "OddsSummary_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricedOutcome" ADD CONSTRAINT "PricedOutcome_summaryId_fkey" FOREIGN KEY ("summaryId") REFERENCES "OddsSummary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
