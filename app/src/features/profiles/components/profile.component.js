import React from "react";
import {
  Divider,
  FlatList,
  HStack,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { Post } from "../../posts/components/post.component";
import { ProfileHeader } from "../components/profile-header.component";

export const Profile = ({
  navigation,
  profile,
  feed,
  onEndReached,
  isMe = false,
}) => {
  const [tab, setTab] = React.useState("posts");
  return (
    <VStack flex={1}>
      {!feed?.isLoading && (
        <FlatList
          onEndReached={onEndReached}
          renderItem={({ item }) => (
            <Post item={item} navigation={navigation} />
          )}
          data={feed?.filter((item) =>
            tab == "replies" ? item?.reply : !item?.reply
          )}
          ListHeaderComponent={
            <VStack space={"md"}>
              <ProfileHeader
                isMe={isMe}
                profile={profile}
                navigation={navigation}
              />
              <HStack px={3} space={"md"}>
                <Pressable onPress={() => setTab("posts")}>
                  <Text fontSize={"sm"} fontWeight={"bold"}>
                    Posts
                  </Text>
                  {tab == "posts" && <Divider />}
                </Pressable>
                <Pressable onPress={() => setTab("replies")}>
                  <Text fontWeight={"medium"}>Replies</Text>
                  {tab == "replies" && <Divider />}
                </Pressable>
              </HStack>
            </VStack>
          }
          showsHorizontalScrollIndicator={false}
        />
      )}
    </VStack>
  );
};
