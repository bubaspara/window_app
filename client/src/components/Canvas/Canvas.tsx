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
} from "@chakra-ui/react";
import "./Canvas.css";

import { IWindows } from "../../interfaces/Interfaces";
import { getWindows } from "../../services/window/getwindows.service";
import { createwindow } from "../../services/window/createwindow.service";

import { useParams } from "react-router-dom";
import Rectangle from "../Rectangle/Rectangle";

export default function Canvas() {
  const ref = React.useRef(null) as any;

  // Window
  const [startX, setStartX] = React.useState<number | undefined>();
  const [startY, setStartY] = React.useState<number | undefined>();
  const [endX, setEndX] = React.useState<number | undefined>();
  const [endY, setEndY] = React.useState<number | undefined>();
  const [windows, setWindows] = React.useState<IWindows[]>([]);
  const [currentWindowIndex, setCurrentWindowIndex] = React.useState<
    number | undefined
  >();

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [link, setLink] = React.useState("");

  let { feedId } = useParams() as any;

  const [currentId, setCurrentId] = React.useState<number>();

  //**Window logic**

  const onMouseMove = (e: MouseEvent) => {
    if (currentWindowIndex != null) {
      const a = document.getElementById(currentWindowIndex.toString());
      if (startX !== e.clientX && startY !== e.clientY) {
        if (a) {
          if (startX && startY) {
            a.style.top = startY + "px";
            a.style.left = startX + "px";
            a.style.height = Math.abs(e.clientY - startY) + "px";
            a.style.width = Math.abs(e.clientX - startX) + "px";
          }
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
        <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
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
          if (endX && endY && startX && startY) {
            if (e.clientY - startY > 50 || e.clientX - startX > 50) {
              setWindows((windows) => {
                const newWindows = [...windows];
                if (currentWindowIndex !== undefined && startX && startY) {
                  if (!newWindows[currentWindowIndex]) {
                    newWindows.push({
                      id: Math.floor(Math.random() * (101 - 1)),
                      start_x_l: undefined,
                      start_y_l: undefined,
                      height_l: undefined,
                      width_l: undefined,
                      endX: undefined,
                      endY: undefined,
                    });
                    newWindows[currentWindowIndex] = {
                      id: newWindows.length,
                      start_x_l: Math.min(startX, e.clientX),
                      start_y_l: Math.min(startY, e.clientY),
                      height_l: Math.abs(e.clientY - startY),
                      width_l: Math.abs(e.clientX - startX),
                      endX: e.clientX,
                      endY: e.clientY,
                    };
                  }
                }
                return newWindows;
              });
            }
          }
          window.removeEventListener("mousemove", onMouseMove);
          cleanupListener();
        }}
      >
        {windows.map((w, idx) => (
          <Rectangle
            key={idx}
            w={w}
            onOpen={onOpen}
            setCurrentId={setCurrentId}
            setLink={setLink}
            onMouseMove={onMouseMove}
          />
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
