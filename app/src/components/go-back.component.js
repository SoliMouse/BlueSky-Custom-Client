import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, IconButton } from "native-base";

export const GoBack = () => {
  const navigation = useNavigation();
  return (
    <HStack p={1}>
      <IconButton
        p={1}
        borderRadius={"lg"}
        onPress={navigation.goBack}
        icon={<Icon name="arrow-back" size="md" as={Ionicons} />}
      />
    </HStack>
  );
};
