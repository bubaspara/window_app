/* eslint-disable no-loop-func */
import * as React from "react";
import { Flex, Button, Box, Spacer, calc } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAlt } from "@fortawesome/free-solid-svg-icons";

import { deleteWindow } from "../../services/window/deletewindow.service";
import { IWindows } from "../../interfaces/Interfaces";

import "./Rectangle.css";

export interface IAppProps {
  w: IWindows;
  setCurrentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  onOpen: () => void;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  onMouseMove: (e: MouseEvent) => void;
}

export default function Rectangle({
  w,
  setCurrentId,
  onOpen,
  setLink,
  onMouseMove,
}: IAppProps) {
  // Drag function
  function dragElement(e: any, id: number) {
    const elmnt = document.getElementById(id.toString());
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    let dragBtns = document.getElementsByClassName("draggableButton");
    for (let i = 0; i < dragBtns.length; i++) {
      dragBtns[i].addEventListener("mousedown", () => dragMouseDown(e));
    }

    // document.getElementById("draggableButton")!.onmousedown = dragMouseDown;

    function dragMouseDown(e: any) {
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      return false;
    }

    function elementDrag(e: any) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      if (elmnt) {
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // Global

  let MARGINS = 4;
  let onRightEdge: any, onBottomEdge: any, onLeftEdge: any, onTopEdge: any;

  // Resize function

  const initResize = (e: any, id: number, w: IWindows, direction: string) => {
    const clickedX = e.clientX;
    const clickedY = e.clientY;

    // Mogu preko eventa
    const element = document.getElementById(id.toString());

    const onMouseMove = (e: any) => {
      Resize(e, element, clickedX, clickedY, direction);
    };
    const onMouseUp = (e: any) => {
      stopResize(e, element, clickedX, clickedY, direction);
    };

    const stopResize = (
      e: any,
      element: any,
      clickedX: number,
      clickedY: number,
      direction: string
    ) => {
      e.preventDefault();
      e.stopPropagation();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const Resize = (
      e: any,
      element: any,
      clickedX: number,
      clickedY: number,
      direction: string
    ) => {
      const b = element.getBoundingClientRect();
      const minSize = 50;
      let x = e.clientX - b.left;
      let y = e.clientY - b.top;
      // onTopEdge = y < MARGINS;
      // onLeftEdge = x < MARGINS;
      // onRightEdge = x >= b.width - MARGINS;
      // onBottomEdge = y >= b.height - MARGINS;

      // let isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;

      // Istu referencu za f-ju
      if (direction === "right") {
        element.style.width = Math.max(x, minSize) + "px";
      }
      if (direction === "bottom") {
        element.style.height = Math.max(y, minSize) + "px";
      }
      if (direction === "left") {
        let newWidth = b.left - e.clientX + b.width;
        if (newWidth > minSize) {
          element.style.width = newWidth + "px";
          element.style.left = e.clientX + "px";
        }
      }
      if (direction === "top") {
        let newHeight = b.top - e.clientY + b.height;
        if (newHeight > minSize) {
          element.style.height = newHeight + "px";
          element.style.top = e.clientY + "px";
        }
      }
    };
  };

  return (
    <Flex
      className="draggable"
      direction="column"
      align="center"
      justify="center"
      id={`${w.id}`}
      key={w.id}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
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

      <Button
        className="draggableButton"
        onMouseDown={(e) => dragElement(e, w.id)}
      >
        <FontAwesomeIcon icon={faArrowsAlt}></FontAwesomeIcon>
      </Button>
      <Box className="resizers" onMouseDown={(e) => e.stopPropagation()}>
        <Box
          className="resizer top"
          onMouseDown={(e) => {
            initResize(e, w.id, w, "top");
            e.preventDefault();
            e.stopPropagation();
          }}
        ></Box>
        <Box
          className="resizer right"
          onMouseDown={(e) => {
            initResize(e, w.id, w, "right");
            e.preventDefault();
            e.stopPropagation();
          }}
        ></Box>
        <Box
          className="resizer bottom"
          onMouseDown={(e) => {
            initResize(e, w.id, w, "bottom");
            e.preventDefault();
            e.stopPropagation();
          }}
        ></Box>
        <Box
          className="resizer left"
          onMouseDown={(e) => {
            initResize(e, w.id, w, "left");
            e.preventDefault();
            e.stopPropagation();
          }}
        ></Box>
      </Box>
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
      </Box>
    </Flex>
  );
}
