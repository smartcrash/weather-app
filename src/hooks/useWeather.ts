import { useEffect, useState } from "react";
import { Weather } from "../types";

const API_KEY = "934ed876a8de43bf010a96d95a05b30c";
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

const isUndefined = (o: any): o is undefined => o === undefined
const isEmpty = <T extends { length: number }>(o: T) => o.length === 0

export default function useWeather(lat?: number, lon?: number, city?: string): [Weather | null, { loading: boolean }] {
  const [data, setData] = useState<Weather | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      if ((isUndefined(lat) && isUndefined(lon)) && (isUndefined(city) || isEmpty(city))) {
        return
      }

      setLoading(true)

      const url = new URL(API_URL)

      url.searchParams.append('units', 'metric')
      url.searchParams.append('appid', API_KEY)

      if (!isUndefined(city) && !isEmpty(city)) {
        url.searchParams.append('q', city)
      } else if (!isUndefined(lat) && !isUndefined(lon)) {
        url.searchParams.append('lat', lat.toString())
        url.searchParams.append('lon', lon.toString())
      }

      const response = await fetch(url.href)
        .then(response => response.json())
        .finally(() => setLoading(false))

      setData(response as Weather)
    })()
  }, [lat, lon, city])

  return [data, { loading }]
}
