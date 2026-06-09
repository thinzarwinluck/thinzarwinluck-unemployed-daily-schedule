export const DrawHands = ({
  angle,
  handType,
}: {
  angle: number;
  handType: "hour" | "second";
}) => {
  return (
    <div
      className="absolute bg-zinc-500 text-zinc-500"
      style={{
        width: handType === "hour" ? "4px" : "2px",
        height: handType === "hour" ? "40%" : "45%",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -100%) rotate(${angle}deg)`,
        transformOrigin: "bottom center",
        zIndex: handType === "second" ? 1000 : 0,
      }}
    ></div>
  );
};
