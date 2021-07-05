/* eslint-disable no-loop-func */
import * as React from "react";
import { Flex, Button, Box, Spacer } from "@chakra-ui/react";
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
  React.useEffect(() => {
    let draggableElements = document.getElementsByClassName("draggable");
    for (var i = 0; i < draggableElements.length; i++) {
      dragElement(draggableElements[i]);
    }
  });
  // Drag function
  function dragElement(elmnt: any) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    // document.getElementById("draggableButton")!.onmousedown = dragMouseDown;
    // elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e: MouseEvent) {
      console.log(window.innerWidth, window.outerWidth);
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      return false;
    }

    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // Resize function
  // const initResize = (e: MouseEvent) => {
  //   window.addEventListener("mousemove", Resize, false);
  //   window.addEventListener("mouseup", stopResize, false);
  // };

  // const Resize = (e: MouseEvent) => {
  //   element.style.width = e.clientX - element.offsetLeft + "px";
  //   element.style.height = e.clientY - element.offsetTop + "px";
  // };

  // const stopResize = () => {
  //   window.removeEventListener("mousemove", Resize, false);
  //   window.removeEventListener("mouseup", stopResize, false);
  // };

  const makeResizableDiv = (id: number) => {
    const elem = document.getElementById(id.toString());
    const resizers = document.querySelectorAll(".resizer");
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;

    for (let i = 0; i < resizers.length; i++) {
      const currentResizer = resizers[i];
      currentResizer.addEventListener("mousedown", function (e: any) {
        e.preventDefault();
        if (elem) {
          original_width = parseFloat(
            getComputedStyle(elem, null)
              .getPropertyValue("width")
              .replace("px", "")
          );
          original_height = parseFloat(
            getComputedStyle(elem, null)
              .getPropertyValue("height")
              .replace("px", "")
          );
          original_x = elem.getBoundingClientRect().left;
          original_y = elem.getBoundingClientRect().top;
          original_mouse_x = e.pageX;
          original_mouse_y = e.pageY;
        }

        window.addEventListener("mousemove", () =>
          resize(e, currentResizer, elem)
        );
        window.addEventListener("mouseup", () =>
          stopResize(e, currentResizer, elem)
        );
      });
    }

    const resize = (e: any, currentResizer: Element, elem: any) => {
      if (currentResizer.classList.contains("right")) {
        const width = original_width + (e.pageX - original_mouse_x);
        console.log(width);
        if (width > minimum_size) {
          elem.style.width = width + "px";
        }
      } else if (currentResizer.classList.contains("left")) {
        const width = original_width - (e.pageX - original_mouse_x);
        if (width > minimum_size) {
          elem.style.width = width + "px";
          elem.style.left = original_x + (e.pageX - original_mouse_x) + "px";
        }
      } else if (currentResizer.classList.contains("top")) {
        const height = original_height - (e.pageY - original_mouse_y);
        if (height > minimum_size) {
          elem.style.height = height + "px";
          elem.style.top = original_y + (e.pageY - original_mouse_y) + "px";
        }
      } else if (currentResizer.classList.contains("bottom")) {
        const height = original_height + (e.pageY - original_mouse_y);
        if (height > minimum_size) {
          elem.style.height = height + "px";
        }
      }
    };

    const stopResize = (e: any, currentResizer: Element, elem: any) => {
      window.removeEventListener("mousemove", () =>
        resize(e, currentResizer, elem)
      );
      e.stopPropagation();
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
      {/* Drag-a se klikom na cijeli Flex, ali cilj je da se ta funkcionalnost prebaci na ovaj botun */}
      <Button id="draggableButton">
        <FontAwesomeIcon icon={faArrowsAlt}></FontAwesomeIcon>
      </Button>
      <Box className="resizers">
        <Box
          className="resizer top"
          onMouseDown={(e) => {
            makeResizableDiv(w.id);
          }}
        ></Box>
        <Box
          className="resizer right"
          onMouseDown={(e) => {
            makeResizableDiv(w.id);
          }}
        ></Box>
        <Box
          className="resizer bottom"
          onMouseDown={(e) => {
            makeResizableDiv(w.id);
          }}
        ></Box>
        <Box
          className="resizer left"
          onMouseDown={(e) => {
            makeResizableDiv(w.id);
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
        {/* <Button
          onMouseDown={(e: React.MouseEvent<Element, MouseEvent>) =>
            mouseDownHandler(e, w.id, w)
          }
        >
          X
        </Button> */}
      </Box>
    </Flex>
  );
}
