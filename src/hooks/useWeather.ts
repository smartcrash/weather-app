import { useEffect, useState } from "react";
import { getWeather } from "../api";
import { isEmpty, isUndefined } from "../helpers";
import { Weather } from "../types";

interface UseWeatherProps {
  lat?: number,
  lon?: number,
  city?: string
  units?: 'metric'
  onError?: (e: Error) => void
}

export default function useWeather({ lat, lon, city, units, onError = () => { } }: UseWeatherProps): [Weather | null, { loading: boolean, error: Error | null }] {
  const [data, setData] = useState<Weather | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      setError(null)

      if ((isUndefined(lat) && isUndefined(lon)) && (isUndefined(city) || isEmpty(city))) {
        return
      }

      try {
        setLoading(true)
        setData(await getWeather(lat, lon, city, units))
      } catch (error) {
        if (error instanceof Error) {
          setError(error)
          onError(error)
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [lat, lon, city])

  return [data, { loading, error }]
}
