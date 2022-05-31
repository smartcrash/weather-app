import { useEffect, useState } from "react";
import { Weather } from "../types";

const API_KEY = "934ed876a8de43bf010a96d95a05b30c";
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

const isUndefined = (o: any): o is undefined => o === undefined

export default function useWeather(lat?: number, lon?: number): [Weather | null, { loading: boolean }] {
  const [data, setData] = useState<Weather | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      if (!isUndefined(lat) && !isUndefined(lon)) {
        setLoading(true)

        const url = new URL(API_URL)

        url.searchParams.append('lat', lat.toString())
        url.searchParams.append('lon', lon.toString())
        url.searchParams.append('units', 'metric')
        url.searchParams.append('appid', API_KEY)

        const response = await fetch(url.href)
          .then(response => response.json())
          .finally(() => setLoading(false))

        console.log(response);


        setData(response as Weather)
      }
    })()
  }, [lat, lon])

  return [data, { loading }]
}
