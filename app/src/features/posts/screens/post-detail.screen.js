import React from "react";
import { Divider, FlatList, VStack } from "native-base";
import { usePostThread } from "../../../api/usePostThread";
import { Post } from "../components/post.component";
import { GoBack } from "../../../components/go-back.component";

export const PostDetailScreen = ({ route, navigation }) => {
  const { postUri } = route.params;
  const postThread = usePostThread(decodeURIComponent(postUri));
  const parent = postThread?.data?.parent?.post || postThread?.data?.post;
  const children = postThread?.data?.parent?.post
    ? [postThread?.data?.post]
    : postThread?.data?.replies;

  return (
    <VStack flex={1} bg="white">
      <GoBack navigation={navigation} />

      <FlatList
        data={children}
        onEndReachedThreshold={0.5}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Post item={item} navigation={navigation} />}
        ListHeaderComponent={
          <VStack>
            <Post item={parent} navigation={navigation} />
            <Divider bg={"gray.100"} />
          </VStack>
        }
      />
    </VStack>
  );
};
