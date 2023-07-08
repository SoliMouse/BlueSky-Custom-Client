import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../services/auth.context";

export const useFollows = (handle) => {
  const { agent } = useContext(AuthContext);
  return useQuery(["follows", handle], () =>
    agent.getFollows({
      actor: handle,
    })
  );
};
