import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../services/auth.context";

export const useNotifications = () => {
  const { agent } = useContext(AuthContext);

  return useQuery(["notifications"], async () => {
    const notifications = await agent.listNotifications({
      limit: 25,
    });

    // Fetch related post data for each notification
    const extendedNotifications = await Promise.all(
      notifications?.data?.notifications.map(async (notification) => {
        if (notification?.reasonSubject) {
          const post = await agent.getPostThread({
            uri: notification?.reasonSubject,
          });
          notification.thread = post?.data?.thread;
          return notification;
        } else {
          return notification;
        }
      })
    );

    return extendedNotifications;
  });
};
