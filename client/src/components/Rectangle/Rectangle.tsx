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
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  onOpen: () => void;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  isDragging: boolean;
  onMouseMove: (e: MouseEvent) => void;
}

export default function Rectangle({
  w,
  setIsEnter,
  setCurrentId,
  onOpen,
  setLink,
}: // setIsDragging,
// isDragging,
// onMouseMove,
IAppProps) {
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
    // if (document.getElementById("draggableButton")) {
    //   document.getElementById("draggableButton")!.onmousedown = dragMouseDown;
    // }
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e: MouseEvent) {
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
  // const mouseDownHandler = (
  //   e: React.MouseEvent<Element, MouseEvent>,
  //   id: number,
  //   win: IWindows
  // ) => {
  //   let elem = document.getElementById(id.toString());

  //   let x = 0;
  //   let y = 0;

  //   let w = 0;
  //   let h = 0;

  //   if (win.start_x_l && win.start_y_l) {
  //     x = Number(win.start_x_l);
  //     y = Number(win.start_y_l);
  //   }
  //   if (elem) {
  //     const styles = window.getComputedStyle(elem);
  //     console.log(styles);
  //     w = parseInt(styles.width, 10);
  //     h = parseInt(styles.height, 10);

  //     document.addEventListener("mousemove", () =>
  //       mouseMoveHandler(e, elem, w, h, x, y)
  //     );

  //     document.addEventListener("mouseup", () =>
  //       mouseUpHandler(e, elem, w, h, x, y)
  //     );
  //   }
  // };

  // const mouseMoveHandler = (
  //   e: React.MouseEvent<Element, MouseEvent>,
  //   elem: any,
  //   w: number,
  //   h: number,
  //   x: number,
  //   y: number
  // ) => {
  //   let dx = e.clientX - x;
  //   let dy = e.clientY - y;
  //   console.log(dx, dy);
  //   if (elem) {
  //     elem.style.width = `${w + dx}px`;
  //     elem.style.height = `${h + dy}px`;
  //   }
  // };

  // const mouseUpHandler = (
  //   e: React.MouseEvent<Element, MouseEvent>,
  //   elem: any,
  //   w: number,
  //   h: number,
  //   x: number,
  //   y: number
  // ) => {
  //   document.addEventListener("mousemove", () =>
  //     mouseMoveHandler(e, elem, w, h, x, y)
  //   );
  //   document.addEventListener("mouseup", () =>
  //     mouseUpHandler(e, elem, w, h, x, y)
  //   );
  // };

  return (
    <Flex
      onMouseOver={() => setIsEnter(true)}
      className="draggable resizer"
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
      {/* Drag-a se klikom na cijeli Flex, ali cilj je da se ta funkcionalnost prebaci na ovaj botun */}
      <Button id="draggableButton">
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
