import { isEmpty, isUndefined } from "./helpers";
import { API_KEY, API_URL } from "./constants";
import { Weather } from "./types";

const createURL = (lat?: number, lon?: number, city?: string, units = 'methic'): string => {
  const url = new URL(API_URL)

  url.searchParams.append('units', units)
  url.searchParams.append('appid', API_KEY)

  if (!isUndefined(city) && !isEmpty(city)) {
    url.searchParams.append('q', city)
  } else if (!isUndefined(lat) && !isUndefined(lon)) {
    url.searchParams.append('lat', lat.toString())
    url.searchParams.append('lon', lon.toString())
  }

  return url.href
}

export async function getWeather(lat?: number, lon?: number, city?: string, units?: string): Promise<Weather> {
  const url = createURL(lat, lon, city, units)
  const response = await fetch(url)
  const weather = await response.json() as Weather

  if (weather.cod.toString().startsWith('4')) {
    throw new Error(weather.message)
  }

  return weather
}
