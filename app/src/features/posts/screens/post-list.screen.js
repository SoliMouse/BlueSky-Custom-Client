import * as React from "react";
import { FlatList, HStack, Spinner } from "native-base";
import { useTimeline } from "../../../api/useTimeline";
import { Post } from "../components/post.component";

export const PostListScreen = ({ navigation }) => {
  const feed = useTimeline();
  const feedData = feed.data?.pages
    .flatMap((page) => page?.feed)
    .filter((item) => !item?.reason?.$type?.includes("Repost") && !item?.reply);

  return (
    <HStack flex={1} bg="white" justifyContent={"center"}>
      <FlatList
        data={feedData}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => feed.fetchNextPage()}
        ListFooterComponent={feed.isFetchingNextPage && <Spinner />}
        renderItem={({ item }) => <Post item={item} navigation={navigation} />}
      />
    </HStack>
  );
};
