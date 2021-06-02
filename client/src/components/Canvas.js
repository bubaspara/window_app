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
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

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

  let { feedId } = useParams();

  const thrEndX = useThrottle(endX, 200);
  const thrEndY = useThrottle(endY, 200);

  const [currentId, setCurrentId] = React.useState();

  //**Window logic**

  const getWindows = async () => {
    await fetch("http://localhost:3001/window/windows", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({ feedId: `${feedId}` }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then((results) => setWindows(results))
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  const onMouseMove = (e) => {
    setEndX(e.clientX);
    setEndY(e.clientY);

    // let tempWindows = [...windows];
    // checkIfTouching(tempWindows[currentWindowIndex]);
    // touches(tempWindows[currentWindowIndex]);
  };

  // Overlapping logic
  const checkIfTouching = (a) => {
    let tempArray = [...windows];
    console.log(a);
    tempArray.forEach((window) => {
      // no horizontal overlap
      if (a.start_x_l >= window.endX || window.start_x_l >= a.endX)
        return false;

      // no vertical overlap
      if (a.start_y_l >= window.endY || window.start_y_l >= a.endX)
        return false;
      return true;
    });
  };

  function touches(a) {
    let tempArray = [...windows];
    tempArray.forEach((window) => {
      // has horizontal gap
      if (a.start_x_l > window.endX || window.start_x_l > a.endX) return false;

      // has vertical gap
      if (a.start_y_l > window.endY || window.start_y_l > a.endX) return false;
      return true;
    });
  }

  // Reset
  const cleanupListener = () => {
    setStartX(undefined);
    setStartY(undefined);
    setEndX(undefined);
    setEndY(undefined);
  };

  // **Modal Logic**

  const handleSubmit = async (id, e) => {
    console.log(isURL(link));
    let tempArray = windows;
    let tempItem = tempArray.filter((el) => el.id === id);
    tempItem[0].feedId = feedId;

    if (link !== "") {
      if (isURL(link)) tempItem[0].type = 1;
      else tempItem[0].type = 0;
      tempItem[0].content = link;
    }

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

  function isURL(str) {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  React.useEffect(() => {
    // Creating a new window
    if (endX !== undefined && endY !== undefined) {
      if (endX && endY) {
        setWindows((windows) => {
          const newWindows = [...windows];
          // If there are no elements in the array at that index, add one (in case it breaks)
          if (!newWindows[currentWindowIndex]) newWindows.push({});
          newWindows[currentWindowIndex] = {
            id: newWindows.length,
            start_x_l: Math.min(startX, thrEndX),
            start_y_l: Math.min(startY, thrEndY),
            height_l: Math.abs(thrEndY - startY),
            width_l: Math.abs(thrEndX - startX),
          };
          return newWindows;
        });
      }
    }
  }, [endX, endY, thrEndX, thrEndY, startY, startX, currentWindowIndex]);

  React.useEffect(() => {
    // If clicked - addEventListener, on unmount remove the listener
    if (startX && startY) window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [startX, startY]);

  React.useEffect(() => {
    console.log("here");
    getWindows();
  }, []);

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
      {windows.map((w) => (
        <Flex
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
          {w.content ? <Box>{w.content}</Box> : ""}
          <Spacer />
          <Button
            onClick={() => {
              setCurrentId(w.id);
              onOpen();
            }}
          >
            Add
          </Button>
        </Flex>
      ))}
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
            <Button colorScheme="green" onClick={() => handleSubmit(currentId)}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
