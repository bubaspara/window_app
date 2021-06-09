import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import Draggable from "react-draggable";
import "./Canvas.css";

import { getWindows } from "../../services/window/getwindows.service";
import { deleteWindow } from "../../services/window/deletewindow.service";
import { createwindow } from "../../services/window/createwindow.service";

import { DeleteIcon } from "@chakra-ui/icons";
import { faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useParams } from "react-router-dom";

export default function Canvas() {
  const ref = React.useRef(null);

  // Window
  const [startX, setStartX] = React.useState();
  const [startY, setStartY] = React.useState();
  const [endX, setEndX] = React.useState();
  const [endY, setEndY] = React.useState();
  const [windows, setWindows] = React.useState([]);
  const [currentWindowIndex, setCurrentWindowIndex] = React.useState();

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [link, setLink] = React.useState("");

  let { feedId } = useParams();

  const [currentId, setCurrentId] = React.useState();

  //**Window logic**

  const onMouseMove = (e) => {
    // Sporo, ali ovako dok ne smislim novi nacin provjere
    setEndX(e.clientX);
    setEndY(e.clientY);
    if (currentWindowIndex != null) {
      const a = document.getElementById((currentWindowIndex + 1).toString());
      if (startX !== e.clientX && startY !== e.clientY) {
        if (a) {
          a.style.top = startY + "px";
          a.style.left = startX + "px";
          a.style.height = Math.abs(e.clientY - startY) + "px";
          a.style.width = Math.abs(e.clientX - startX) + "px";
        }
      }
    }
  };

  // Reset
  const cleanupListener = () => {
    setStartX(undefined);
    setStartY(undefined);
    setEndX(undefined);
    setEndY(undefined);
    setCurrentWindowIndex(undefined);
  };

  // **Modal Logic**

  React.useEffect(() => {
    // Creating a new window
    if (endX && endY) {
      if (endX !== startX && endY !== startY) {
        setWindows((windows) => {
          const newWindows = [...windows];
          // If there are no elements in the array at that index, add one (in case it breaks)
          if (!newWindows[currentWindowIndex]) newWindows.push({});
          newWindows[currentWindowIndex] = {
            id: newWindows.length,
            start_x_l: Math.min(startX, endX),
            start_y_l: Math.min(startY, endY),
            height_l: Math.abs(endY - startY),
            width_l: Math.abs(endX - startX),
            endX: endX,
            endY: endY,
          };
          return newWindows;
        });
      }
    }
  }, [endX, endY, startY, startX, currentWindowIndex]);

  React.useEffect(() => {
    // If clicked - addEventListener, on unmount remove the listener
    if (startX && startY) window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [startX, startY]);

  React.useEffect(() => {
    getWindows(feedId, setWindows);
  }, []);

  return (
    <>
      {windows.length === 0 ? (
        <h1 style={{ fontWeight: "bold", textAlign: " center" }}>
          Drag and Release to create a Window!
        </h1>
      ) : (
        ""
      )}
      <div
        id="container"
        ref={ref}
        style={{ height: "100vh", position: "relative" }}
        onMouseDown={(e) => {
          setStartX(e.clientX);
          setStartY(e.clientY);
          setEndX(e.clientX);
          setEndY(e.clientY);
          setCurrentWindowIndex(windows.length);
        }}
        onMouseUp={(e) => {
          setEndX(e.clientX);
          setEndY(e.clientY);
          cleanupListener();
        }}
      >
        {windows.map((w) => (
          <Draggable handle="#handle">
            <Flex
              draggable
              className="window"
              direction="column"
              align="center"
              justify="center"
              id={`${w.id}`}
              key={w.id}
              style={{
                position: "absolute",
                top: `${w.start_y_l}px`,
                left: `${w.start_x_l}px`,
                width: `${w.width_l}px`,
                height: `${w.height_l}px`,
                border: `1.5px solid black`,
                borderRadius: "5%",
                textAlign: "center",
              }}
            >
              {w.content ? (
                <Box width="inherit" fontSize="sm">
                  {w.content}
                </Box>
              ) : (
                ""
              )}
              <Button
                id="handle"
                onCLick={() =>
                  window.removeEventListener("mousemove", onMouseMove)
                }
              >
                <FontAwesomeIcon icon={faArrowsAlt}></FontAwesomeIcon>
              </Button>
              <Spacer />
              <Box>
                <Button
                  onClick={() => {
                    setCurrentId(w.id);
                    onOpen();
                    setLink(w.content);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  Add
                </Button>
                <Button onClick={() => deleteWindow(w.id)}>
                  <DeleteIcon />
                </Button>
              </Box>
            </Flex>
          </Draggable>
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Link/Text"
              onChange={(e) => setLink(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                createwindow(currentId, windows, feedId, link);
                onClose();
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
