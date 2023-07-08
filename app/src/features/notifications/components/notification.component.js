import React from "react";
import { DateTime } from "luxon";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  Icon,
  VStack,
  HStack,
  Avatar,
  Divider,
  Pressable,
} from "native-base";

export const Notification = ({ item, navigation }) => {
  const reasonToIcon = {
    like: {
      name: "heart",
      color: "red.500",
    },
    follow: {
      name: "person-add",
      color: "blue.500",
    },
    quote: {
      name: "repost",
      color: "green.500",
    },
    reply: {
      name: "chatbubble",
      color: "blue.500",
    },
    repost: {
      name: "repeat",
      color: "green.500",
    },
  };

  return (
    <Pressable m={2} borderRadius={"lg"}>
      <VStack space={2}>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <HStack space="sm" alignItems={"center"}>
            <Icon
              size="md"
              as={Ionicons}
              name={reasonToIcon[item?.reason]?.name}
              color={reasonToIcon[item?.reason]?.color}
            />
            <Pressable
              onPress={() => {
                navigation.navigate("ProfileNavigator", {
                  screen: "ProfileDetail",
                  params: {
                    handle: item?.author?.handle,
                  },
                });
              }}
            >
              <HStack space={"2xs"} alignItems={"center"}>
                <Avatar
                  size="sm"
                  source={{
                    uri: item?.author?.avatar,
                  }}
                />
                <VStack>
                  <Text fontWeight={"black"} noOfLines={1}>
                    {item?.author?.displayName}
                  </Text>
                  <Text fontSize={"xs"} noOfLines={1}>
                    @{item?.author?.handle}
                  </Text>
                </VStack>
              </HStack>
            </Pressable>
          </HStack>

          <Text noOfLines={1} fontSize={"xs"} color="gray.400">
            {DateTime.fromISO(item?.record?.createdAt).toRelative()}
          </Text>
        </HStack>

        {item?.reason === "reply" && (
          <Pressable
            onPress={() => {
              navigation.navigate("PostNavigator", {
                screen: "PostDetail",
                params: {
                  postUri: item?.thread?.post?.uri,
                },
              });
            }}
          >
            <Text>{item?.thread?.replies[0]?.post?.record?.text}</Text>
          </Pressable>
        )}

        {["like", "repost", "reply"].includes(item?.reason) && (
          <VStack p={3} bg="gray.50" borderRadius={"lg"}>
            <HStack space={"xs"}>
              <Avatar
                size="sm"
                source={{ uri: item?.thread?.post?.author?.avatar }}
              />
              <Text>{item?.thread?.post?.record?.text}</Text>
            </HStack>
          </VStack>
        )}

        <Divider bg="gray.100" />
      </VStack>
    </Pressable>
  );
};
