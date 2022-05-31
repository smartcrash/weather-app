import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import {
  Box,
  Center,
  Divider,
  extendTheme,
  Heading,
  HStack,
  NativeBaseProvider,
  StatusBar,
  Text,
  VStack,
} from "native-base";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import useLocation from "./hooks/useLocation";
import useWeather from "./hooks/useWeather";

const theme = extendTheme({ config: { initialColorMode: "dark" } });

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

  const currentDate = new Date(Date.now() + data.timezone);

  const details = [
    {
      key: "Wind",
      value: `${data.wind.speed.toFixed(0)}`,
      unit: "m/s",
    },
    {
      key: "Humidity",
      value: `${data.main.humidity.toFixed(0)}`,
      unit: "%",
    },
    {
      key: "Feels like",
      value: `${data.main.feels_like.toFixed(0)}`,
      unit: "°",
    },
  ];

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#5bd6f7"} />

      <LinearGradient
        colors={["#5bd6f7", "#71b5fa", "#1069f4"]}
        start={{ x: 0.8, y: 0 }}
        end={{ x: 0, y: 0.9 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <VStack
        height={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        paddingX={6}
        paddingTop={6}
        paddingBottom={8}
      >
        <VStack width={"full"} flexShrink={0}>
          <Heading fontSize={"2xl"} fontWeight={"semibold"}>
            {data.name}
          </Heading>
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
                  {data.main.temp.toFixed(0)}
                </Heading>
                <Text fontSize={"6xl"} marginTop={2} opacity={0.5}>
                  °
                </Text>
              </HStack>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(800).delay(100)}>
              <Text fontSize={"3xl"} fontWeight={"normal"}>
                {data.weather[0].main}
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(800).delay(200)}>
              <Text fontSize={"md"} opacity={0.5}>
                {data.weather[0].description}
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
    </NativeBaseProvider>
  );
}
