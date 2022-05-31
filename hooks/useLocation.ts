import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function useLocation(): [Location.LocationObject | null, { error: string | null, loading: boolean }] {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted) {
        setLoading(false)
        setError('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLoading(false)
      setLocation(location);
    })();
  }, []);

  return [location, { loading, error }]
}
