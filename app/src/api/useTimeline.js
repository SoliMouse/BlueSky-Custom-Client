import { useContext } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { AuthContext } from "../services/auth.context";

export const useTimeline = () => {
  const { agent } = useContext(AuthContext);
  return useInfiniteQuery(
    ["timeline"],
    async ({ pageParam }) => {
      const timeline = await agent.getTimeline(
        pageParam
          ? {
              limit: 50,
              cursor: pageParam,
            }
          : {
              limit: 50,
            }
      );

      return timeline?.data;
    },
    {
      getNextPageParam: (data) => data?.cursor,
    }
  );
};
