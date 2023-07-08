import React from "react";
import {
  Modal,
  FlatList,
  Text,
  HStack,
  Pressable,
  VStack,
  Avatar,
} from "native-base";

const Follower = ({ item, navigation, onClose }) => {
  return (
    <Pressable
      key={item?.handle}
      onPress={() => {
        onClose();
        navigation.navigate("ProfileNavigator", {
          screen: "ProfileDetail",
          params: {
            handle: item?.handle,
          },
        });
      }}
    >
      <HStack space={"xs"} m={3}>
        <Avatar
          size="sm"
          source={{
            uri: item?.avatar,
          }}
        />
        <VStack space={0}>
          <Text>{item?.displayName}</Text>
          <Text fontSize={"xs"}>{item?.handle}</Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export const Followers = ({ profile, navigation }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <HStack space="2xs">
        <Text fontWeight={"bold"}>{profile?.followersCount}</Text>
        <Pressable onPress={() => setIsOpen(true)}>
          <Text>Followers</Text>
        </Pressable>
      </HStack>
      <Modal
        showsHorizontalScrollIndicator={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Followers</Modal.Header>
          <Modal.Body showsHorizontalScrollIndicator={false}>
            <FlatList
              renderItem={({ item }) => (
                <Follower
                  item={item}
                  navigation={navigation}
                  onClose={() => setIsOpen(false)}
                />
              )}
              data={profile?.followers}
              showsHorizontalScrollIndicator={false}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
