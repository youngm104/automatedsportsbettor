/*
  Warnings:

  - The values [BET365,BETFAIR,DABBLE,PINNACLE,SPORTSBET,UNIBET,TABTOUCH] on the enum `Book` will be removed. If these variants are still used in the database, this will fail.
  - The values [TENNIS,BASKETBALL,CRICKET,FOOTBALL,AMERICAN_FOOTBALL] on the enum `Sport` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Book_new" AS ENUM ('neds', 'betr_au', 'betfair_ex_au', 'ladbrokes_au', 'pointsbet_au', 'tabtouch', 'sportsbet', 'tab', 'unibet', 'betright', 'boombet', 'playup');
ALTER TABLE "Market" ALTER COLUMN "book" TYPE "Book_new" USING ("book"::text::"Book_new");
ALTER TABLE "OddsSummary" ALTER COLUMN "book" TYPE "Book_new" USING ("book"::text::"Book_new");
ALTER TYPE "Book" RENAME TO "Book_old";
ALTER TYPE "Book_new" RENAME TO "Book";
DROP TYPE "public"."Book_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Sport_new" AS ENUM ('basketball_nba');
ALTER TABLE "Event" ALTER COLUMN "sport" TYPE "Sport_new" USING ("sport"::text::"Sport_new");
ALTER TYPE "Sport" RENAME TO "Sport_old";
ALTER TYPE "Sport_new" RENAME TO "Sport";
DROP TYPE "public"."Sport_old";
COMMIT;
