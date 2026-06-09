import { CLOCK_CONST } from "@/constants/clock";
import Image from "next/image";

const ACTIVITY_RADIUS = 37;

const DrawActivity = ({
  title,
  start,
  end,
  image,
}: {
  title: string;
  start: number;
  end: number;
  color: string;
  image: string;
}) => {
  const middleHour = (start + end) / 2;

  const angle = middleHour * 15; // 24h clock

  const rad = (angle * Math.PI) / 180;

  const x = CLOCK_CONST.CENTER + ACTIVITY_RADIUS * Math.sin(rad);
  const y = CLOCK_CONST.CENTER - ACTIVITY_RADIUS * Math.cos(rad);

  return (
    <div
      className="absolute text-xs font-semibold "
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Image
        src={`/activity/${image}`}
        alt={title}
        width={50}
        height={50}
        style={{
          left: `${x}%`,
          top: `${y}%`,
        }}
      />
      <p className="text-black">{title}</p>
    </div>
  );
};

export default DrawActivity;
