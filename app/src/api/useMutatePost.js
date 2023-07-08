import React from "react";
import { RichText } from "@atproto/api";
import { useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../services/auth.context";

export const useMutatePost = () => {
  const queryClient = useQueryClient();
  const { agent } = React.useContext(AuthContext);

  return {
    create: useMutation(
      ({ text }) => {
        const rt = new RichText({ text });
        const record = {
          text: rt.text,
          facets: rt.facets,
          $type: "app.bsky.feed.post",
          createdAt: new Date().toISOString(),
        };
        return agent.post(record);
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries(["profile"]);
        },
      }
    ),
    delete: useMutation(
      ({ postUri }) => {
        return agent.deletePost(postUri);
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries(["profile"]);
        },
      }
    ),
    like: useMutation(({ uri, cid }) => {
      return agent.like(uri, cid);
    }),
    deleteLike: useMutation(({ likeUri }) => {
      return agent.deleteLike(likeUri);
    }),
    repost: useMutation(({ uri, cid }) => {
      return agent.repost(uri, cid);
    }),
    deleteRepost: useMutation(({ repostUri }) => {
      return agent.deleteRepost(repostUri);
    }),
  };
};
