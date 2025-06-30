import { useEffect, useState } from "react";
import { Position } from "@xyflow/react";

export default function useHandlePosition() {
  // ✅ Set initial screen check immediately when the component loads
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // ✅ Listen to screen size changes
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ✅ Return positions based on device type
  return {
    sourcePosition: isMobile ? Position.Bottom : Position.Right,
    targetPosition: isMobile ? Position.Top : Position.Left,
  };
}
