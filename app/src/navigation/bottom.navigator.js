import React from "react";
import { Box, Icon, Image, Spinner, Text, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NotificationListScreen } from "../features/notifications/screens/notification-list.screen";
import { ProfileNavigator } from "./profile.navigator";
import { AuthContext } from "../services/auth.context";
import { useProfile } from "../api/useProfile";
import { PostNavigator } from "./post.navigator";
import { useCountUnreadNotifications } from "../api/useCountUnreadNotifications";

const BottomTab = createBottomTabNavigator();

export const BottomNavigator = () => {
  const { agent } = React.useContext(AuthContext);
  const profile = useProfile(agent?.session?.handle);
  const countUnreadNotifications = useCountUnreadNotifications();

  return (
    <BottomTab.Navigator
      initialRouteName="ProfileNavigator"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
        },
      }}
    >
      <BottomTab.Screen
        name="PostNavigator"
        component={PostNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Icon as={Ionicons} name="home" color={color} size={size * 0.95} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => {
            if (profile?.isLoading) {
              return <Spinner size={size} />;
            } else {
              return (
                <Image
                  size={size}
                  alt="Profile"
                  borderRadius="full"
                  source={{
                    uri: profile?.data?.avatar,
                  }}
                />
              );
            }
          },
        }}
      />

      <BottomTab.Screen
        name="NotificationList"
        component={NotificationListScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <VStack>
              {countUnreadNotifications?.data > 0 && (
                <Box
                  px={1}
                  top={0}
                  right={0}
                  bg="red.600"
                  borderRadius={"full"}
                  position={"absolute"}
                >
                  <Text color="lightText" fontSize={"2xs"}>
                    {countUnreadNotifications?.data}
                  </Text>
                </Box>
              )}

              <Icon
                as={Ionicons}
                size={size * 0.9}
                name="notifications"
                color={countUnreadNotifications?.data > 0 ? "red.500" : color}
              />
            </VStack>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
