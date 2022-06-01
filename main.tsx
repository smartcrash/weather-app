import { registerRootComponent } from "expo";
import { extendTheme, NativeBaseProvider, StatusBar } from "native-base";
import App from "./src/App";
import Background from "./src/components/Background";

const theme = extendTheme({
  components: {
    Heading: { defaultProps: { color: "white" } },
    Text: { defaultProps: { color: "white" } },
  },
});

export default registerRootComponent(() => (
  <NativeBaseProvider theme={theme}>
    <StatusBar barStyle={"light-content"} backgroundColor={"#5bd6f7"} />
    <Background colors={["#5bd6f7", "#71b5fa", "#1069f4"]} />
    <App />
  </NativeBaseProvider>
));
