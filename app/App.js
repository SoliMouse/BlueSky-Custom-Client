import "text-encoding-polyfill";
import "react-native-gesture-handler";
import React from "react";
import { HStack, NativeBaseProvider, VStack, extendTheme } from "native-base";
import { QueryClient, QueryClientProvider } from "react-query";
// interal
import { Navigation } from "./src/navigation/navigation";
import { AuthContextProvider } from "./src/services/auth.context";

const queryClient = new QueryClient();
const theme = extendTheme({
  useSystemColorMode: true,
  initialColorMode: "light",
  colors: {
    primary: {
      50: "#cce4ff",
      100: "#99c9ff",
      200: "#66adff",
      300: "#3392ff",
      400: "#1b7aff",
      500: "#0560ff",
      600: "#044ecd",
      700: "#033b9a",
      800: "#022867",
      900: "#011534",
    },
  },
});

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <HStack flex={1} justifyContent={"center"}>
            <VStack flex={1} maxWidth={768}>
              <Navigation />
            </VStack>
          </HStack>
        </QueryClientProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
