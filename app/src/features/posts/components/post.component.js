import * as React from "react";
import { DateTime } from "luxon";
import { Ionicons } from "@expo/vector-icons";
import {
  Icon,
  Text,
  Image,
  VStack,
  HStack,
  Avatar,
  Pressable,
} from "native-base";
import { Like } from "./like.component";
import { Repost } from "./repost.component";
import { Delete } from "./delete.component";
import { AuthContext } from "../../../services/auth.context";
export const Post = ({ item, navigation }) => {
  const post = item?.post || item;
  const author = post?.author;
  const image = post?.embed?.images?.[0];
  const { agent } = React.useContext(AuthContext);
  const isAuthor = agent?.session?.handle === author?.handle;

  return (
    <Pressable
      p={5}
      borderRadius={"lg"}
      _hover={{
        bg: "gray.50",
      }}
      onPress={() => {
        navigation.navigate("PostNavigator", {
          screen: "PostDetail",
          params: {
            postUri: post?.uri,
          },
        });
      }}
    >
      <HStack space={"xs"}>
        <Pressable
          onPress={() => {
            navigation.navigate("ProfileNavigator", {
              screen: "ProfileDetail",
              params: {
                handle: author?.handle,
              },
            });
          }}
        >
          <Avatar size={"md"} source={{ uri: author?.avatar }} />
        </Pressable>
        <VStack flex={1}>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <HStack space={"xs"} alignItems={"center"}>
              <Text fontWeight={"bold"}>{author?.displayName}</Text>
              <Text fontSize={"xs"} color="primary.900">
                @{author?.handle}
              </Text>
              <Text fontSize={"2xs"} color={"gray.400"}>
                {DateTime.fromISO(post?.record?.createdAt).toRelative()}
              </Text>
            </HStack>
            {isAuthor && <Delete post={post} />}
          </HStack>
          <VStack space={"sm"}>
            <Text>{post?.record?.text}</Text>
            {image?.fullsize && (
              <Image
                size="2xl"
                borderRadius={"lg"}
                resizeMode={"contain"}
                source={{ uri: image?.fullsize }}
                alt={image?.alt ? image.alt : "The image alt is sadly missing."}
              />
            )}
            <HStack justifyContent={"space-between"}>
              <HStack alignItems="center" space="2xs">
                <Icon
                  size="sm"
                  as={Ionicons}
                  name="chatbubble"
                  color={"gray.300"}
                />
                <Text fontSize="xs" fontWeight={"bold"} color={"gray.300"}>
                  {post?.replyCount}
                </Text>
              </HStack>
              <Repost post={post} />
              <Like post={post} />
            </HStack>
          </VStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};
