import React from "react";
import { Platform } from "react-native";
import * as Linking from "expo-linking";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// internal
import { BottomNavigator } from "./bottom.navigator";
import { AuthContext } from "../services/auth.context";
import { LoginScreen } from "../features/auth/screens/login.screen";
import { LoadingIndicator } from "../components/loading-indicator.component";
import { appRoutesConfig } from "./route.config";

const Stack = createStackNavigator();

export const Navigation = () => {
  const { isAuthenticated, isLoading } = React.useContext(AuthContext);
  if (isLoading) return <LoadingIndicator />;
  else
    return (
      <NavigationContainer
        documentTitle={{
          enabled: false,
          formatter: "blue",
        }}
        linking={
          Platform.OS === "web"
            ? {
                enabled: true,
                config: appRoutesConfig,
                prefixes: [Linking.createURL("/"), "https://soli.blue/"],
              }
            : undefined
        }
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { flex: 1 },
          }}
        >
          {isAuthenticated ? (
            <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          ) : (
            <Stack.Group>
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
};
