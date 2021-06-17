import * as React from "react";
import { Flex, Button, Box, Spacer } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";

import { deleteWindow } from "../services/window/deletewindow.service";
import { IWindows } from "../interfaces/Interfaces";

export interface IAppProps {
  w: IWindows;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  onOpen: () => void;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Rectangle({
  w,
  setIsEnter,
  setCurrentId,
  onOpen,
  setLink,
  setIsDragging,
}: IAppProps) {
  const [size, setSize] = React.useState<any>({
    x: w.start_x_l,
    y: w.start_y_l,
  });
  const ref = React.useRef<any>();

  const handler = React.useCallback(() => {
    console.log(size);
    const onMouseMove = (e: MouseEvent) => {
      setSize((currentSize: any) => ({
        x: currentSize.x + e.movementX,
        y: currentSize.y + e.movementY,
      }));
      console.log(size);
    };
    const onMouseUp = (e: MouseEvent) => {
      console.log("UP");
      ref.current.removeEventListener("mousemove", onMouseMove);
      ref.current.removeEventListener("mouseup", onMouseUp);
    };
    ref.current.addEventListener("mousemove", onMouseMove);
    ref.current.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <Draggable handle="#handle">
      <Flex
        onMouseOver={() => setIsEnter(true)}
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
        {w.type === 1 ? <img src={w.content} alt="img" /> : w.content}
        <Button id="handle" onClick={() => setIsDragging(true)}>
          <FontAwesomeIcon icon={faArrowsAlt}></FontAwesomeIcon>
        </Button>
        <Spacer />
        <Box>
          <Button
            onClick={() => {
              setCurrentId(w.id);
              onOpen();
              if (w.content) {
                setLink(w.content);
              }
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
          <Button ref={ref} onMouseDown={handler}>
            +
          </Button>
        </Box>
      </Flex>
    </Draggable>
  );
}
