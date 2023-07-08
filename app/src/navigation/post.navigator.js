import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { PostListScreen } from "../features/posts/screens/post-list.screen";
import { PostDetailScreen } from "../features/posts/screens/post-detail.screen";

const Stack = createStackNavigator();

export const PostNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: true,
      headerShown: false,
    }}
  >
    <Stack.Screen name="PostList" component={PostListScreen} />
    <Stack.Screen name="PostDetail" component={PostDetailScreen} />
  </Stack.Navigator>
);
