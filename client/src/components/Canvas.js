import React from "react";
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { useContainerDimensions } from "../hooks/useContainerDimensions";

export default function Canvas() {
  const ref = React.useRef(null);
  const { width, height } = useContainerDimensions(ref);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [startX, setStartX] = React.useState(0);
  const [startY, setStartY] = React.useState(0);
  const [endX, setEndX] = React.useState(0);
  const [endY, setEndY] = React.useState(0);
  const [windows, setWindows] = React.useState([]);
  const [initalClick, setInitialClick] = React.useState(false);

  const onMouseMove = (e) => {
    setX(e.screenX);
    setY(e.screenY);
  };

  React.useEffect(() => {
    console.log(
      `UseEffect X: ${startX}, Y: ${startY}, eX: ${endX}, eY: ${endY}, Width: ${Math.abs(
        -startX + endX
      )}, Height: ${Math.abs(-startY + endY)}`
    );
  }, [startX, startY]);

  return (
    <div
      ref={ref}
      id="root_container"
      style={{ height: "100vh" }}
      onMouseDown={(e) => {
        setStartX(e.screenX);
        setStartY(e.screenY);
      }}
      onMouseUp={(e) => {
        setEndX(e.screenX);
        setEndY(e.screenY);

        setWindows([
          ...windows,
          {
            x: startY,
            y: startX,
            width: Math.abs(-startX + endX),
            height: Math.abs(-startY + endY),
          },
        ]);

        console.log(
          `X: ${startX}, Y: ${startY}, eX: ${endX}, eY: ${endY}, Width: ${Math.abs(
            -startX + endX
          )}, Height: ${Math.abs(-startY + endY)}`
        );

        setInitialClick(true);
      }}
      onMouseMove={onMouseMove}
    >
      {initalClick &&
        windows.map((window) => (
          <div
            style={{
              position: "absolute",
              top: `${window.y}px`,
              left: `${window.x}px`,
              width: `${window.width}px`,
              height: `${window.height}px`,
              border: `1px solid black`,
            }}
          ></div>
        ))}
    </div>
  );
}
