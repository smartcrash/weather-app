import { Box } from "native-base";

export default function Container({ children }: { children: any }) {
  return (
    <Box flex={1} paddingX={6} paddingTop={6} paddingBottom={8}>
      {children}
    </Box>
  );
}
