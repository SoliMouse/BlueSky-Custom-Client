import React from "react";
import { FlatList, HStack } from "native-base";
// internal
import { useNotifications } from "../../../api/useNotifications";
import { Notification } from "../components/notification.component";
import { LoadingIndicator } from "../../../components/loading-indicator.component";

export const NotificationListScreen = ({ navigation }) => {
  const notifications = useNotifications();
  return (
    <HStack flex={1} bg="white" justifyContent={"center"}>
      {notifications?.isLoading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={notifications?.data}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Notification item={item} navigation={navigation} />
          )}
        />
      )}
    </HStack>
  );
};
