import { registerRootComponent } from "expo";
import { extendTheme, NativeBaseProvider, StatusBar } from "native-base";
import App from "./src/App";

const theme = extendTheme({ config: { initialColorMode: "dark" } });

export default registerRootComponent(() => (
  <NativeBaseProvider theme={theme}>
    <StatusBar barStyle={"light-content"} backgroundColor={"#5bd6f7"} />
    <App />
  </NativeBaseProvider>
));
