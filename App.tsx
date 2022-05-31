import { FontAwesome } from "@expo/vector-icons";
import { format } from "date-fns";
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  NativeBaseProvider,
  Text,
  VStack,
} from "native-base";
import useLocation from "./hooks/useLocation";
import useWeather from "./hooks/useWeather";

const WEATHER_ICONS: Record<string, string> = {
  "clear sky": "☀️",
  "few clouds": "🌤",
  "scattered clouds": "☁️",
  "broken clouds": "🌤",
  "shower rain": "🌧",
  rain: "🌧",
  thunderstorm: "⛈",
  snow: "🌨",
  mist: "🌫",
};

export default function App() {
  const [location, { loading, error }] = useLocation();
  const [data] = useWeather(
    location?.coords.latitude,
    location?.coords.longitude
  );

  // TODO: Handle loading state
  if (!data) {
    return <></>;
  }

  const details = [
    {
      key: "Wind",
      value: `${data.wind.speed.toFixed(0)} m/s`,
    },
    {
      key: "Humidity",
      value: `${data.main.humidity.toFixed(0)}%`,
    },
    {
      key: "Feels like",
      value: `${data.main.feels_like.toFixed(0)}°`,
    },
  ];

  return (
    <NativeBaseProvider>
      <VStack
        safeArea
        height={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        paddingX={9}
        paddingTop={6}
        paddingBottom={6}
      >
        <HStack
          space={1}
          alignItems={"center"}
          flexShrink={0}
          borderWidth={1}
          borderRadius={"full"}
          paddingX={4}
          paddingY={0.5}
        >
          <Icon
            as={FontAwesome}
            name={"map-marker"}
            color={"black"}
            size={"sm"}
          />
          <Text fontSize={"lg"}>{data.name}</Text>
        </HStack>

        <Box flexGrow={1}>
          <Center marginY={"auto"}>
            <Text fontSize={"180px"}>
              {WEATHER_ICONS[data.weather[0].description]}
            </Text>
            <HStack>
              <Heading fontWeight={"extrabold"} fontSize={"9xl"}>
                {data.main.temp.toFixed(0)}
              </Heading>
              <Text fontSize={"6xl"} marginTop={2} color={"gray.300"}>
                °
              </Text>
            </HStack>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              {data.weather[0].main}
            </Text>
            <Text marginTop={2} fontSize={"sm"} color={"gray.400"}>
              {format(new Date(), "eeee, d LLL")}
            </Text>
          </Center>
        </Box>

        <HStack justifyContent={"space-between"} flexShrink={0} width={"full"}>
          {details.map(({ key, value }, index) => (
            <VStack
              space={0.5}
              justifyContent={"center"}
              alignItems={"center"}
              key={index}
            >
              <Text fontSize={"xl"} fontWeight={"bold"}>
                {value}
              </Text>
              <Text color={"gray.400"} fontSize={"sm"}>
                {key}
              </Text>
            </VStack>
          ))}
        </HStack>
      </VStack>
    </NativeBaseProvider>
  );
}
