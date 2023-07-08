import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../services/auth.context";

export const useProfile = (handle) => {
  const { agent } = useContext(AuthContext);
  return useQuery(["profile", handle], async () => {
    const profile = (
      await agent.getProfile({
        actor: handle,
      })
    )?.data;
    profile.followers = (
      await agent.getFollowers({
        actor: handle,
        limit: 50,
      })
    )?.data?.followers;
    profile.follows = (
      await agent.getFollows({
        actor: handle,
        limit: 50,
      })
    )?.data?.follows;
    return profile;
  });
};
