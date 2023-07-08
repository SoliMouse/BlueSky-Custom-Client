import { VStack, Spinner } from "native-base";

export const LoadingIndicator = () => {
  return (
    <VStack flex={1} alignItems={"center"} justifyContent={"center"}>
      <Spinner size={"lg"} />
    </VStack>
  );
};
