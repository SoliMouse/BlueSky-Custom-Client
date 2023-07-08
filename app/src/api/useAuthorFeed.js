import { useContext } from "react";
import { useInfiniteQuery } from "react-query";
import { AuthContext } from "../services/auth.context";

export const useAuthorFeed = (handle) => {
  const { agent } = useContext(AuthContext);
  return useInfiniteQuery(
    ["feed", handle],
    async ({ pageParam }) => {
      const authorFeed = await agent.getAuthorFeed({
        actor: handle,
        limit: 50,
        cursor: pageParam,
      });

      return authorFeed?.data;
    },
    {
      getNextPageParam: (data) => data?.cursor,
    }
  );
};
