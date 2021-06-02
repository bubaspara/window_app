import React from "react";
import FeedList from "../components/FeedList";
import Navbar from "../components/Navbar";

import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex direction="column" width="full">
      <Navbar />
      <FeedList />
    </Flex>
  );
}
