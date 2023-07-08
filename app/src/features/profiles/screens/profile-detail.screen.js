import React from "react";
import { HStack, VStack } from "native-base";
import { useProfile } from "../../../api/useProfile";
import { Profile } from "../components/profile.component";
import { useAuthorFeed } from "../../../api/useAuthorFeed";
import { LoadingIndicator } from "../../../components/loading-indicator.component";

export const ProfileDetailScreen = ({ route, navigation }) => {
  const { handle } = route.params;
  const profile = useProfile(handle);
  const feed = useAuthorFeed(handle);

  const feedData = feed.data?.pages.flatMap((page) => page?.feed);

  return (
    <HStack flex={1} bg="white" justifyContent={"center"}>
      <VStack flex={1}>
        {profile?.isLoading ? (
          <LoadingIndicator />
        ) : (
          <Profile
            feed={feedData}
            navigation={navigation}
            profile={profile?.data}
            onEndReached={() => feed.fetchNextPage()}
          />
        )}
      </VStack>
    </HStack>
  );
};
