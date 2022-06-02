import { registerRootComponent } from "expo";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import { extendTheme, NativeBaseProvider, StatusBar } from "native-base";
import { useEffect, useState } from "react";
import App from "./src/App";
import Background from "./src/components/Background";

const theme = extendTheme({
  components: {
    Heading: { defaultProps: { color: "white" } },
    Text: { defaultProps: { color: "white" } },
  },
});

export default registerRootComponent(() => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we request permissions
        await SplashScreen.preventAutoHideAsync();
        await Location.requestForegroundPermissionsAsync();

        // Artificially delay for two seconds to simulate a slow loading
        // await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.warn(error);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#5bd6f7"} />
      <Background colors={["#5bd6f7", "#71b5fa", "#1069f4"]} />
      <App />
    </NativeBaseProvider>
  );
});
