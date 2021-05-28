import React from "react";
import { useThrottle } from "../hooks/useThrottle";
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
} from "@chakra-ui/react";

export default function Canvas() {
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

  const thrEndX = useThrottle(endX, 200);
  const thrEndY = useThrottle(endY, 200);

  //Window logic

  const onMouseMove = (e) => {
    // Border logic
    setEndX(e.clientX);
    setEndY(e.clientY);
  };

  // Overlapping logic
  const checkIfTouching = (a, b) => {
    // no horizontal overlap
    if (a.left >= b.endX || b.left >= a.endX) return false;

    // no vertical overlap
    if (a.top >= b.endY || b.top >= a.endX) return false;

    return true;
  };

  function touches(a, b) {
    // has horizontal gap
    if (a.left > b.endX || b.left > a.endX) return false;

    // has vertical gap
    if (a.top > b.endY || b.top > a.endY) return false;

    return true;
  }

  // Reset
  const cleanupListener = () => {
    setStartX(undefined);
    setStartY(undefined);
    setEndX(undefined);
    setEndY(undefined);
  };

  // Link logic

  const handleSubmit = async (window) => {
    let tempArray = windows;
    let tempItem = tempArray.filter((el) => el.top === window.top);
    console.log(tempItem);
    await fetch("http://localhost:3001/window/createwindow", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(tempItem),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
        } else {
          onClose();
        }
      })
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    // Creating new window
    if (endX !== undefined && endY !== undefined) {
      if (endX && endY) {
        setWindows((windows) => {
          const newWindows = [...windows];
          // If there are no elements in the array at that index, add one (in case it would break)
          if (!newWindows[currentWindowIndex]) newWindows.push({});
          newWindows[currentWindowIndex] = {
            top: Math.min(startY, thrEndY),
            left: Math.min(startX, thrEndX),
            width: Math.abs(thrEndX - startX),
            height: Math.abs(thrEndY - startY),
          };
          return newWindows;
        });
      }
    }
  }, [endX, endY, thrEndX, thrEndY, startY, startX, currentWindowIndex]);

  React.useEffect(() => {
    // If clicked - addEventListener, else removeEventListener
    if (startX && startY) window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [startX, startY]);

  return (
    <div
      id="container"
      style={{ height: "100vh", position: "relative" }}
      onMouseDown={(e) => {
        setStartX(e.clientX);
        setStartY(e.clientY);
        setCurrentWindowIndex(windows.length);
      }}
      onMouseUp={() => {
        cleanupListener();
        setCurrentWindowIndex(undefined);
      }}
    >
      {windows.map((w, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${w.top}px`,
            left: `${w.left}px`,
            width: `${w.width}px`,
            height: `${w.height}px`,
            border: `1.5px solid black`,
            borderRadius: "5%",
            textAlign: "center",
          }}
        >
          <Button onClick={onOpen}>Add</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add a link</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input placeholder="Link" />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  colorScheme="green"
                  onClick={() => handleSubmit(w, index)}
                >
                  Add
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      ))}
    </div>
  );
}
