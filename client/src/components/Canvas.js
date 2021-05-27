import React from "react";

export default function Canvas() {
  const [startX, setStartX] = React.useState(0);
  const [startY, setStartY] = React.useState(0);
  const [endX, setEndX] = React.useState(0);
  const [endY, setEndY] = React.useState(0);
  const [windows, setWindows] = React.useState([]);

  const containerRef = React.useRef(null);

  const onMouseMove = (e) => {
    // Border logic
  };

  React.useEffect(() => {
    // Creating new window
    if (endX && endY) {
      setWindows([
        ...windows,
        {
          top: Math.min(startY, endY),
          left: Math.min(startX, endX),
          width: Math.abs(endX - startX),
          height: Math.abs(endY - startY),
        },
      ]);
    }
  }, [endX, endY]);

  React.useEffect(() => {
    if (startX && startY) {
      // If clicked - addEventListener, else removeEventListener
      document.addEventListener("mousemove", onMouseMove);
    }
    return document.removeEventListener("mousemove", onMouseMove);
  }, [windows]);

  return (
    <div
      id="container"
      style={{ height: "100vh", position: "relative" }}
      onMouseDown={(e) => {
        setStartX(e.clientX);
        setStartY(e.clientY);
      }}
      onMouseUp={(e) => {
        setEndX(e.clientX);
        setEndY(e.clientY);
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
          }}
        ></div>
      ))}
    </div>
  );
}
