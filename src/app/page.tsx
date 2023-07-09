'use client'

import { QuickSearch } from "./components/QuickSearch/QuickSearch"
import { RecommendedTrips } from "./components/RecommendedTrips/RecommendedTrips"
import { TripSearch } from "./components/TripSearch/TripSearch"


export default function Home() {
  return (
    <div>
      <TripSearch />
      <QuickSearch />
      <RecommendedTrips />
    </div>
  )
}
