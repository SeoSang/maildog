-- SQLite

CREATE TABLE "breeds" (
  "id"  TEXT NOT NULL,
  "name" TEXT,
  "temperament" TEXT,
  "life_span" TEXT,
  "alt_names" TEXT,
  "wikipedia_url" TEXT,
  "origin" TEXT,
  "weight_imperial" TEXT,
  "weight_metric" TEXT,
  "height_imperial" TEXT,
  "height_metric" TEXT,
  "country_code" TEXT,
  PRIMARY KEY("id")
);