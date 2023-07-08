import React from "react";
import { HStack } from "native-base";
import { useProfile } from "../../../api/useProfile";
import { Profile } from "../components/profile.component";
import { useAuthorFeed } from "../../../api/useAuthorFeed";
import { AuthContext } from "../../../services/auth.context";

export const ProfileHomeScreen = ({ navigation }) => {
  const { agent } = React.useContext(AuthContext);
  const profile = useProfile(agent?.session?.handle);
  const feed = useAuthorFeed(agent?.session?.handle);

  const feedData = feed.data?.pages.flatMap((page) => page?.feed);

  return (
    <HStack flex={1} bg="white" justifyContent={"center"}>
      {!profile?.isLoading && (
        <Profile
          isMe={true}
          feed={feedData}
          navigation={navigation}
          profile={profile?.data}
          onEndReached={() => feed.fetchNextPage()}
        />
      )}
    </HStack>
  );
};
