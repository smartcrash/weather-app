import { useEffect, useState } from "react";
import { API_KEY, API_URL } from "../constants";
import { isEmpty, isUndefined } from "../helpers";
import { Weather } from "../types";

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
