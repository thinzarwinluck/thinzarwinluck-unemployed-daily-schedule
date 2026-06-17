import { CLOCK_CONST } from "../constants/clock";
import { useEffect, useState } from "react";

const DrawNumber = ({ label, angle }: { label: string; angle: number }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const rad = (angle * Math.PI) / 180;

  const x = CLOCK_CONST.CENTER + CLOCK_CONST.RADIUS * Math.sin(rad);
  const y = CLOCK_CONST.CENTER - CLOCK_CONST.RADIUS * Math.cos(rad);

  return (
    <p
      className={`absolute origin-center clock-number ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} transition-all duration-500`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span className="text-2xl font-bold">{label}</span>
    </p>
  );
};

export default DrawNumber;
