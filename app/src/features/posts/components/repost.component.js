import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Icon, Text, HStack, Pressable } from "native-base";
import { useMutatePost } from "../../../api/useMutatePost";

export const Repost = ({ post }) => {
  const mutatePost = useMutatePost();
  const isReposted =
    (post?.viewer?.repost?.length > 0 || mutatePost?.repost?.isSuccess) &&
    !mutatePost?.deleteRepost?.isSuccess;
  const color = isReposted ? "green.500" : "gray.300";

  return (
    <HStack alignItems="center" space="2xs">
      <Pressable
        onPress={() => {
          if (isReposted) {
            mutatePost.deleteRepost.mutate({ repostUri: post?.viewer?.repost });
          } else {
            mutatePost.repost.mutate({ uri: post?.uri, cid: post?.cid });
          }
        }}
      >
        <Icon size="sm" name="repeat" as={Ionicons} color={color} />
      </Pressable>
      <Text color={color} fontSize="xs" fontWeight={"bold"}>
        {post?.repostCount +
          mutatePost?.repost?.isSuccess -
          mutatePost?.deleteRepost?.isSuccess}
      </Text>
    </HStack>
  );
};
