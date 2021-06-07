import React from "react";
import {
  Flex,
  Box,
  Spacer,
  Button,
  Input,
  Alert,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Feed({ feed, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedValue, setUpdatedValue] = React.useState();
  const [error, setError] = React.useState("");

  const { name } = feed;

  const deleteFeed = async (id) => {
    await fetch(`http://localhost:3001/feed/delete/${id}`, {
      method: "DELETE",
    });
  };

  const updateFeed = (id, updatedValue) => {
    let data = {
      updatedValue: `${updatedValue}`,
    };
    if (updatedValue) {
      setError("");
      fetch(`http://localhost:3001/feed/update/${id}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(data),
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((res) => {
          console.log(res.json());
        })
        .catch((err) => console.error(err));
      onClose();
    } else {
      setError(`Can't be empty`);
    }
  };

  return (
    <>
      <Flex align="center" margin="10px" width="full" justify="center">
        <Box marginLeft="20px">
          <Link to={`/feed/${id}`}>{name}</Link>
        </Box>
        <Spacer />
        <Box marginRight="20px">
          <Button marginRight="10px" onClick={onOpen}>
            <EditIcon />
          </Button>
          <Button onClick={() => deleteFeed(id)}>
            <DeleteIcon />
          </Button>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit
            <br />
            {error ? <Alert status="error"> {error} </Alert> : ""}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="New Name..."
              onChange={(e) => {
                setUpdatedValue(e.target.value);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setError("");
                onClose();
              }}
            >
              Close
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                setError("");
                updateFeed(id, updatedValue);
              }}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
