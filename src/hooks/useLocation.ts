import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

interface Coord {
  lat: number,
  lng: number
}

export default function useLocation(defaultLocation?: Coord): [Coord | null, { error: string | null, loading: boolean }] {
  const [location, setLocation] = useState<Coord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted) {
        setLoading(false)
        setError('Permission to access location was denied');

        if (defaultLocation) setLocation(defaultLocation)

        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });

      setLoading(false)
    })();
  }, []);

  return [location, { loading, error }]
}
