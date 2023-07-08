import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { ProfileHomeScreen } from "../features/profiles/screens/profile-home.screen";
import { ProfileDetailScreen } from "../features/profiles/screens/profile-detail.screen";
const Stack = createStackNavigator();

export const ProfileNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} />
    <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
  </Stack.Navigator>
);
