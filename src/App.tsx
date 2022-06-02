import * as SplashScreen from "expo-splash-screen";
import { format } from "date-fns";
import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Pressable,
  Spinner,
  Text,
  useDisclose,
  useToast,
  VStack,
} from "native-base";
import { useState, useCallback } from "react";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import Container from "./components/Container";
import SearchCityModal from "./components/SearchCityModal";
import { toZonedTime } from "./helpers";
import useLocation from "./hooks/useLocation";
import useWeather from "./hooks/useWeather";

export default function App() {
  const { show: showToast } = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [city, setCity] = useState("");
  const [location] = useLocation({ lat: 51.509865, lng: -0.118092 });
  const [data, { loading }] = useWeather({
    lat: location?.lat,
    lon: location?.lng,
    city,
    onError: (error) =>
      showToast({
        render: () => (
          <Box
            background={"white"}
            borderRadius={"md"}
            paddingX={4}
            paddingY={2}
          >
            <Text color={"black"} textTransform={"capitalize"}>
              {error.message}
            </Text>
          </Box>
        ),
      }),
  });

  const onLayout = useCallback(async () => {
    // This tells the splash screen to hide immediately!.
    // We hide the splash screen once the initial data is fetched.
    await SplashScreen.hideAsync();
  }, []);

  if (!data) {
    return null;
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
    <Container onLayout={onLayout}>
      <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
        <VStack alignItems={"flex-start"} width={"full"} flexShrink={0}>
          <Pressable onPress={onOpen}>
            <Heading fontSize={"2xl"} fontWeight={"semibold"}>
              {data.name}
            </Heading>
          </Pressable>
          <Text fontSize={"sm"} opacity={0.8}>
            {format(currentDate, "eeee, p")}
          </Text>

          {loading && (
            <Spinner
              marginTop={2}
              accessibilityLabel="Loading"
              color={"white"}
            />
          )}
        </VStack>

        <Box flexGrow={1}>
          <Center marginY={"auto"}>
            <Animated.View entering={FadeInDown.duration(800)}>
              <HStack>
                <Heading
                  fontWeight={"normal"}
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
              <Text fontSize={"md"} opacity={0.5} textTransform={"capitalize"}>
                {description}
              </Text>
            </Animated.View>
          </Center>
        </Box>

        <Divider background={"white"} marginY={4} opacity={0.2} />

        <HStack justifyContent={"space-between"} flexShrink={0} width={"full"}>
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

      <SearchCityModal isOpen={isOpen} onClose={onClose} onChange={setCity} />
    </Container>
  );
}
