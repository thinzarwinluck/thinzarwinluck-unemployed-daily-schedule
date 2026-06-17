export const DrawHands = ({
  angle,
  handType,
}: {
  angle: number;
  handType: "hour" | "second";
}) => {
  const isHour = handType === "hour";

  return (
    <div
      className={`absolute clock-hand ${isHour ? 'hour rounded-[2px]' : 'second rounded-[1px]'} transition-transform ${isHour ? 'duration-500 ease-out' : 'duration-150 linear'} will-change-transform`}
      style={{
        width: isHour ? "4px" : "2px",
        height: isHour ? "40%" : "45%",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -100%) rotate(${angle}deg)`,
        transformOrigin: "bottom center",
        zIndex: handType === "second" ? 1000 : 0,
      }}
    />
  );
};
