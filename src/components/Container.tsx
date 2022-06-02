import { Box, IBoxProps } from "native-base";

export default function Container({ children, ...props }: IBoxProps) {
  return (
    <Box flex={1} paddingX={6} paddingTop={6} paddingBottom={8} {...props}>
      {children}
    </Box>
  );
}
