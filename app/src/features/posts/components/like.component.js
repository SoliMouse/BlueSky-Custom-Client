import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Icon, Text, HStack, Pressable } from "native-base";
import { useMutatePost } from "../../../api/useMutatePost";

export const Like = ({ post }) => {
  const mutatePost = useMutatePost();
  const isLiked =
    (post?.viewer?.like?.length > 0 || mutatePost?.like?.isSuccess) &&
    !mutatePost?.deleteLike?.isSuccess;
  const color = isLiked ? "red.500" : "gray.300";

  return (
    <HStack alignItems="center" space="2xs">
      <Pressable
        onPress={() => {
          if (isLiked) {
            mutatePost.deleteLike.mutate({ likeUri: post?.viewer?.like });
          } else {
            mutatePost.like.mutate({ uri: post?.uri, cid: post?.cid });
          }
        }}
      >
        <Icon size="sm" name="heart" as={Ionicons} color={color} />
      </Pressable>
      <Text color={color} fontSize="xs" fontWeight={"bold"}>
        {post?.likeCount +
          mutatePost?.like?.isSuccess -
          mutatePost?.deleteLike?.isSuccess}
      </Text>
    </HStack>
  );
};
