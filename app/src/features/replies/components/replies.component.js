import { FlatList } from "native-base";
import { Reply } from "./reply.component";

export const Replies = ({ replies }) => {
  return (
    <FlatList
      data={replies}
      renderItem={Reply}
      showsHorizontalScrollIndicator={false}
    />
  );
};
