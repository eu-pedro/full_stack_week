'use client'

import { QuickSearch } from "./components/QuickSearch/QuickSearch"
import { TripSearch } from "./components/TripSearch/TripSearch"


export default function Home() {
  return (
    <div>
      <TripSearch />
      <QuickSearch />
    </div>
  )
}
