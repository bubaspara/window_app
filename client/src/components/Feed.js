import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Feed({ feed, id }) {
  const { name } = feed;
  return (
    <Link to={`/feed/${id}`}>
      <Flex width="full" align="center" justifyContent="center">
        <Box textAlign="center">{name}</Box>
      </Flex>
    </Link>
  );
}
