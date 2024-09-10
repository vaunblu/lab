import * as React from "react";

export function useMousePosition() {
  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0,
  });

  const updateMousePosition = (ev: MouseEvent) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
}
