import { CLOCK_CONST } from "../constants/clock";

const DrawNumber = ({ label, angle }: { label: string; angle: number }) => {
  const rad = (angle * Math.PI) / 180;

  const x = CLOCK_CONST.CENTER + CLOCK_CONST.RADIUS * Math.sin(rad);
  const y = CLOCK_CONST.CENTER - CLOCK_CONST.RADIUS * Math.cos(rad);

  return (
    <p
      className="absolute origin-center text-black"
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
