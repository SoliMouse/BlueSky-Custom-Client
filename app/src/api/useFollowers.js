import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../services/auth.context";

export const useFollowers = (handle) => {
  const { agent } = useContext(AuthContext);
  return useQuery(["followers", handle], () =>
    agent.getFollowers({
      actor: handle,
    })
  );
};
