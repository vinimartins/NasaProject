import { createContext, ReactNode, useEffect, useState } from "react";
import { nasaApi } from "./services/api";

export interface NearEarthObjects {
  id: string;
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: {
    close_approach_date: string;
    miss_distance: {
      kilometers: string;
    };
  }[];
}

interface AsteroidApproaches {
  element_count: number;
  links: {
    next: string;
    prev: string;
    self: string;
  };
  near_earth_objects: Record<string, NearEarthObjects[]>;
}

interface AsteroidProviderProps {
  children: ReactNode;
}

export const AsteroidContext = createContext<AsteroidApproaches | null>(null);

export function AsteroidProvider(props: AsteroidProviderProps) {
  const [asteroidSearched, setAsteroidSearched] =
    useState<AsteroidApproaches | null>(null);
  // useEffect(() => {
  //   nasaApi.get("").then((res) => console.log(res.data));
  // }, []);

  useEffect(() => {
    nasaApi
      .get<AsteroidApproaches>("")
      .then((response) => setAsteroidSearched(response.data));
  }, []);

  return (
    <AsteroidContext.Provider value={asteroidSearched}>
      {props.children}
    </AsteroidContext.Provider>
  );
}

// chamada api
/* 
https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=dHibVheWA2fA9aXWNzoC1aMTeesGBnGMtbqZjhx6
 */
