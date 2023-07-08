import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Icon,
  Text,
  Image,
  HStack,
  VStack,
  Avatar,
  IconButton,
} from "native-base";
import { AuthContext } from "../../../services/auth.context";
import { Followers } from "./followers.component";

export const ProfileHeader = ({ profile, isMe = false, navigation }) => {
  const { logout } = React.useContext(AuthContext);
  return (
    <>
      <Image
        height={150}
        width={"100%"}
        source={{
          uri: profile.banner,
        }}
      />
      <VStack ml={3} space={"xs"}>
        <HStack p={1} justifyContent={"space-between"}>
          <HStack space={"sm"}>
            <Avatar
              mt={-75}
              size={"2xl"}
              source={{
                uri: profile.avatar,
              }}
            />
            <VStack>
              <Text fontSize={"lg"} fontWeight={"black"}>
                {profile.displayName}
              </Text>
              <Text fontSize={"sm"}>@{profile.handle}</Text>
            </VStack>
          </HStack>

          {isMe && (
            <IconButton
              size={"sm"}
              onPress={() => logout()}
              icon={<Icon as={Ionicons} name="log-out" />}
            />
          )}
        </HStack>

        <Text fontSize={"sm"}>{profile.description}</Text>
        <HStack space={"sm"}>
          <HStack space="2xs">
            <Text fontWeight={"bold"}>{profile.followsCount}</Text>
            <Text>Following</Text>
          </HStack>
          <Followers profile={profile} navigation={navigation} />
          <HStack space="2xs">
            <Text fontWeight={"bold"}>{profile.postsCount}</Text>
            <Text>posts</Text>
          </HStack>
        </HStack>
      </VStack>
    </>
  );
};
