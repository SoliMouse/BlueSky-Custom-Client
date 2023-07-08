import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../services/auth.context";

export const usePostThread = (postUri) => {
  const { agent } = useContext(AuthContext);
  return useQuery(
    ["post-thread", postUri],
    async () =>
      (
        await agent.getPostThread({
          uri: postUri,
        })
      )?.data?.thread
  );
};
