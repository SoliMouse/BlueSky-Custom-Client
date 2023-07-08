import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../services/auth.context";

export const useCountUnreadNotifications = () => {
  const { agent } = useContext(AuthContext);
  return useQuery(
    ["count-unread-notifications"],
    async () => (await agent.countUnreadNotifications())?.data?.count
  );
};
