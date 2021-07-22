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
    console.log(elmnt);
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    // DODAVANJE FUNKCIONALNOSTI DRAGGANJA NA SVAKI BOTUN
    let dragBtns = document.getElementsByClassName("draggableButton");
    for (let i = 0; i < dragBtns.length; i++) {
      dragBtns[i].addEventListener("mousedown", () => dragMouseDown(e));
    }
    console.log(dragBtns);

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

  // Resize function

  const initResize = (e: any, id: number, w: IWindows, direction: string) => {
    const start_x = Number(w.start_x_l);
    const start_y = Number(w.start_y_l);

    const element = document.getElementById(id.toString());
    if (start_x && start_y) {
      window.addEventListener(
        "mousemove",
        () => Resize(e, element, start_x, start_y, direction),
        false
      );
      window.addEventListener(
        "mouseup",
        () => stopResize(e, element, start_x, start_y, direction),
        false
      );
    }
    const Resize = (
      e: any,
      element: any,
      start_x: number,
      start_y: number,
      direction: string
    ) => {
      const orgHeight = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue("height")
          .replace("px", "")
      );
      const orgWidth = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue("height")
          .replace("px", "")
      );

      const orgTop = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue("top")
          .replace("px", "")
      );

      const orgLeft = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue("left")
          .replace("px", "")
      );
      // Popraviti
      if (direction === "top") {
        if (e.clientY > start_y) {
          element.style.top = orgTop - (e.clientY - start_y) + "px";
          element.style.height = orgHeight + (e.clientY - start_y) + "px";
        } else if (e.clientY < start_y) {
          element.style.top = orgTop + (e.clientY - start_y) + "px";
          element.style.height = orgHeight - (e.clientY - start_y) + "px";
        }
      } else if (direction === "bottom") {
        if (e.clientY > start_y) {
          element.style.height = orgHeight - (e.clientY - start_y) + "px";
        } else if (e.clientY < start_y) {
          element.style.height = orgHeight + (e.clientY - start_y) + "px";
        }
      } else if (direction === "left") {
        if (e.clientX > start_x) {
          element.style.left = orgLeft + (e.clientX - start_x) + "px";
          element.style.width = orgWidth - (e.clientX - start_x) + "px";
        } else if (e.clientX < start_x) {
          element.style.left = orgLeft - (e.clientX - start_x) + "px";
          element.style.width = orgWidth + (e.clientX - start_x) + "px";
        }
      } else if (direction === "right") {
        if (e.clientX > start_x) {
          element.style.width = orgWidth - (e.clientX - start_x) + "px";
        } else if (e.clientX < start_x) {
          element.style.width = orgWidth + (e.clientX - start_x) + "px";
        }
      }
    };

    const stopResize = (
      e: any,
      element: any,
      start_x: number,
      start_y: number,
      direction: string
    ) => {
      e.preventDefault();
      e.stopPropagation();
      window.removeEventListener("mousemove", () =>
        Resize(e, element, start_x, start_y, direction)
      );
      window.removeEventListener("mouseup", () =>
        stopResize(e, element, start_x, start_y, direction)
      );
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
      <Box className="resizers">
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
