import React from "react";
import { Flex, Box, Spacer, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Feed({ feed, id }) {
  const deleteFeed = async (id) => {
    await fetch(`http://localhost:3001/feed/delete/${id}`, {
      method: "DELETE",
    });
  };

  const { name } = feed;
  return (
    <Flex align="center" margin="10px" width="full" justify="center">
      <Box marginLeft="20px">
        <Link to={`/feed/${id}`}>{name}</Link>
      </Box>
      <Spacer />
      <Box marginRight="20px">
        <Button onClick={() => deleteFeed(id)}>
          <DeleteIcon />
        </Button>
      </Box>
    </Flex>
  );
}
