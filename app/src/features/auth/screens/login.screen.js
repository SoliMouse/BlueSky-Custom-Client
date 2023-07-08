import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { VStack, Stack, Text, Button, Input, Image, Icon } from "native-base";
import { AuthContext } from "../../../services/auth.context";

export const LoginScreen = () => {
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Stack
      flex={1}
      bg="white"
      alignItems="center"
      justifyContent="center"
      direction={["column", "column", "row"]}
    >
      <VStack
        flex={1}
        safeAreaTop
        space={"xs"}
        p={[3, 3, 5]}
        width={"100%"}
        bg={"gray.100"}
        borderRadius={"lg"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image
          size={"2xl"}
          repeat={true}
          resizeMode="contain"
          alt="GIF animation of blocks being connected to each other"
          source={require("../../../../assets/bluesky/blocks.gif")}
        />
        <Text
          color={"#0560ff"}
          fontWeight={"bold"}
          fontSize={["2xl", "2xl", "3xl"]}
        >
          Bluesky
        </Text>
        <Text fontSize={["sm", "sm", "md"]}>Decentralized Social Network</Text>
      </VStack>
      <VStack
        p={3}
        flex={1}
        safeAreaBottom
        space={"lg"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Input
          size={"xl"}
          value={email}
          maxWidth={300}
          variant={"filled"}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          size={"xl"}
          maxWidth={300}
          type="password"
          value={password}
          variant={"filled"}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          size="lg"
          variant={"ghost"}
          borderRadius={"lg"}
          onPress={async () => await login(email, password)}
          _text={{
            fontSize: "xl",
            fontWeight: "bold",
          }}
          rightIcon={
            <Icon name="arrow-forward-circle" as={Ionicons} size="lg" />
          }
        >
          Continue
        </Button>
      </VStack>
    </Stack>
  );
};
