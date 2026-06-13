/**
 * Static catalog metadata — *not* data records.
 * Used to render filter UI; the actual filterable values come from the API.
 */
import { TourCategory } from "@prisma/client";

export const TOUR_CATEGORIES = Object.values(TourCategory) as TourCategory[];

export const POPULAR_DESTINATIONS = [
  "Greece",
  "Switzerland",
  "Indonesia",
  "Norway",
  "Peru",
  "Kenya",
  "Japan",
  "Italy",
  "Iceland",
  "Morocco",
  "Thailand",
  "Egypt",
  "Mexico",
  "Vietnam",
  "Spain",
  "Australia",
  "India",
  "UAE",
  "Chile",
  "UK",
];
