import { format } from "date-fns";
import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Pressable,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import { useState } from "react";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import Background from "./components/Background";
import Container from "./components/Container";
import SearchCityModal from "./components/SearchCityModal";
import { toZonedTime } from "./helpers";
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
  const { isOpen, onOpen, onClose } = useDisclose();
  const [city, setCity] = useState("");
  const [location] = useLocation({ lat: 51.509865, lng: -0.118092 });
  const [data] = useWeather(location?.lat, location?.lng, city);

  // TODO: Handle loading state
  if (!data) {
    return <></>;
  }

  const { temp, humidity, feels_like: feelsLike } = data.main;
  const { main, description } = data.weather[0];
  const { speed: windSpeed } = data.wind;
  const currentDate = toZonedTime(new Date(), data.timezone);

  const details = [
    {
      key: "Wind",
      value: windSpeed.toFixed(0),
      unit: "m/s",
    },
    {
      key: "Humidity",
      value: humidity.toFixed(0),
      unit: "%",
    },
    {
      key: "Feels like",
      value: feelsLike.toFixed(0),
      unit: "°",
    },
  ];

  return (
    <>
      <Background colors={["#5bd6f7", "#71b5fa", "#1069f4"]} />
      <SearchCityModal isOpen={isOpen} onClose={onClose} onChange={setCity} />

      <Container>
        <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
          <VStack width={"full"} flexShrink={0}>
            <Pressable onPress={onOpen}>
              <Heading fontSize={"2xl"} fontWeight={"semibold"}>
                {data.name}
              </Heading>
            </Pressable>
            <Text fontSize={"sm"} opacity={0.8}>
              {format(currentDate, "eeee, p")}
            </Text>
          </VStack>

          <Box flexGrow={1}>
            <Center marginY={"auto"}>
              {/*
            TODO: Change icons
            <Text fontSize={"180px"}>
              {WEATHER_ICONS[data.weather[0].description]}
            </Text>
            */}
              <Animated.View entering={FadeInDown.duration(800)}>
                <HStack>
                  <Heading
                    fontWeight={"normal"}
                    // fontSize={"9xl"}
                    fontSize={"150px"}
                    style={{
                      textShadowColor: "white",
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 9,
                    }}
                  >
                    {temp.toFixed(0)}
                  </Heading>
                  <Text fontSize={"6xl"} marginTop={2} opacity={0.5}>
                    °
                  </Text>
                </HStack>
              </Animated.View>

              <Animated.View entering={FadeInDown.duration(800).delay(100)}>
                <Text fontSize={"3xl"} fontWeight={"normal"}>
                  {main}
                </Text>
              </Animated.View>

              <Animated.View entering={FadeInDown.duration(800).delay(200)}>
                <Text fontSize={"md"} opacity={0.5}>
                  {description}
                </Text>
              </Animated.View>
            </Center>
          </Box>

          <Divider background={"white"} marginY={4} opacity={0.2} />

          <HStack
            justifyContent={"space-between"}
            flexShrink={0}
            width={"full"}
          >
            {details.map(({ key, value, unit }, index) => (
              <Animated.View
                entering={FadeInRight.duration(800).delay(100 * index)}
                key={index}
              >
                <VStack
                  space={0.5}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <HStack alignItems={"flex-start"} space={0}>
                    <Text
                      fontSize={"4xl"}
                      fontWeight={"semibold"}
                      style={{
                        textShadowColor: "white",
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 5,
                      }}
                    >
                      {value}
                    </Text>
                    <Text fontSize={"md"} fontWeight={"bold"} marginTop={2}>
                      {unit}
                    </Text>
                  </HStack>
                  <Text fontSize={"sm"} opacity={0.75}>
                    {key}
                  </Text>
                </VStack>
              </Animated.View>
            ))}
          </HStack>
        </VStack>
      </Container>
    </>
  );
}
