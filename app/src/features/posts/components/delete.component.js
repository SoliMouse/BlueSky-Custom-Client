import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Icon, Text, HStack, Pressable } from "native-base";
import { useMutatePost } from "../../../api/useMutatePost";

export const Delete = ({ post }) => {
  const mutatePost = useMutatePost();

  return (
    <HStack alignItems="center" space="2xs">
      <Pressable
        onPress={() => {
          mutatePost.delete.mutate({ postUri: post?.uri });
        }}
      >
        <Icon size="2xs" name="trash" as={Ionicons} />
      </Pressable>
    </HStack>
  );
};
