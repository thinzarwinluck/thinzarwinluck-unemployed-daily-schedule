import { clockData, myDailyActivity } from "@/mock/clock";
import {
  ArrowBigDown,
  ArrowUp,
  ChevronDownIcon,
  ChevronUpCircle,
  ChevronUpIcon,
  PlayIcon,
  Star,
  StarIcon,
  StarOff,
  StarOffIcon,
  Stars,
} from "lucide-react";
import Image from "next/image";

const CENTER = 50;
const RADIUS = 53;

const DrawNumber = ({ label, angle }: { label: string; angle: number }) => {
  const rad = (angle * Math.PI) / 180;

  const x = CENTER + RADIUS * Math.sin(rad);
  const y = CENTER - RADIUS * Math.cos(rad);

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

const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angle: number,
) => {
  const rad = ((angle - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
};

const createArcPath = (
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `
    M ${cx} ${cy}
    L ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
    Z
  `;
};

const ActivitySectors = () => {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      {myDailyActivity.map((activity) => {
        const startAngle = activity.start * 15;
        const endAngle = activity.end * 15;

        return (
          <path
            key={activity.title + activity.start}
            d={createArcPath(
              50,
              50,
              50, // sector radius
              startAngle,
              endAngle,
            )}
            fill={activity.color}
            opacity={0.25}
            stroke="white"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
};

const DrawHourHand = ({ angle }: { angle: number }) => {
  return (
    <div
      className="absolute bg-zinc-500 text-zinc-500"
      style={{
        width: "6px",
        height: "40%",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -100%) rotate(${angle}deg)`,
        transformOrigin: "bottom center",
      }}
    ></div>
  );
};

const ACTIVITY_RADIUS = 37;

const DrawActivity = ({
  title,
  start,
  end,
  color,
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

  const x = CENTER + ACTIVITY_RADIUS * Math.sin(rad);
  const y = CENTER - ACTIVITY_RADIUS * Math.cos(rad);

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

const ClockBorder = () => {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      {clockData.map((item) => {
        const rad = (item.angle * Math.PI) / 180;

        const isMajor = Number(item.label) % 6 === 0;

        const outerRadius = 49;
        const innerRadius = isMajor ? 43 : 46;

        const x1 = 50 + innerRadius * Math.sin(rad);
        const y1 = 50 - innerRadius * Math.cos(rad);

        const x2 = 50 + outerRadius * Math.sin(rad);
        const y2 = 50 - outerRadius * Math.cos(rad);

        return (
          <line
            key={item.label}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="black"
            strokeWidth={isMajor ? 0.8 : 0.4}
          />
        );
      })}
    </svg>
  );
};
const ClockLayoutComponent = () => {
  const data: Array<{ label: string; angle: number }> = clockData;

  //calculate current time
  const now = new Date();
  const hours = now.getHours() % 24;
  const minutes = now.getMinutes();

  const hourAngle = (hours + minutes / 60) * 15; // 360/24 = 15
  return (
    <section className="border rounded-full size-[85vh] relative ">
      <ActivitySectors />
      <ClockBorder />
      {data.map((hour) => (
        <DrawNumber key={hour.label} label={hour.label} angle={hour.angle} />
      ))}

      {/* hands */}
      <DrawHourHand angle={hourAngle} />

      {/* center dot */}
      <Star className="absolute rounded-full size-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fill-zinc-500 text-zinc-500" />

      {/* wanna add daily activity */}
      {myDailyActivity.map((activity) => (
        <DrawActivity key={activity.title + activity.start} {...activity} />
      ))}
    </section>
  );
};

export default ClockLayoutComponent;
