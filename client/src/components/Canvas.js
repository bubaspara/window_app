import React from "react";

export default function Canvas() {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [startX, setStartX] = React.useState(0);
  const [startY, setStartY] = React.useState(0);
  const [endX, setEndX] = React.useState(0);
  const [endY, setEndY] = React.useState(0);
  const [windows, setWindows] = React.useState([]);
  const [initalClick, setInitialClick] = React.useState(false);

  const onMouseMove = (e) => {
    setX(e.clientX);
    setY(e.clientY);
  };

  React.useEffect(() => {
    setStartX(0);
    setStartY(0);
    setEndX(0);
    setEndY(0);
  }, []);

  return (
    <div
      id="root_container"
      style={{ height: "100vh", position: "relative" }}
      onMouseDown={(e) => {
        setStartX(e.clientX);
        setStartY(e.clientY);
      }}
      onMouseUp={(e) => {
        setEndX(e.clientX);
        setEndY(e.clientY);

        if (startX <= endX && startY <= endY) {
          setWindows([
            ...windows,
            {
              x: startX,
              y: startY,
              width: -startX + e.clientX,
              height: -startY + e.clientY,
            },
          ]);
        } else if (startX >= endX && startY <= endY) {
          setWindows([
            ...windows,
            {
              x: e.clientX,
              y: startY,
              width: startX - e.clientX,
              height: -startY + e.clientY,
            },
          ]);
        } else if (startX > endX && startY > endY) {
          setWindows([
            ...windows,
            {
              x: e.clientX,
              y: e.clientY,
              width: startX - e.clientX,
              height: startY - e.clientY,
            },
          ]);
        } else if (startX < endX && startY > endY) {
          setWindows([
            ...windows,
            {
              x: startX,
              y: e.clientY,
              width: -startX + e.clientX,
              height: startY - e.clientY,
            },
          ]);
        }

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
        windows.map((w) => (
          <div
            style={{
              position: "absolute",
              top: `${w.y}px`,
              left: `${w.x}px`,
              width: `${w.width}px`,
              height: `${w.height}px`,
              border: `1px solid black`,
            }}
          ></div>
        ))}
    </div>
  );
}
