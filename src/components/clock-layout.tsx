"use client";
import { clockData, myDailyActivity } from "@/mock/clock";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import DrawNumber from "./draw-number";
import ActivitySectors from "./activity-sector";
import DrawActivity from "./draw-activity";
import { DrawHands } from "./draw-hands";

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
  const seconds = now.getSeconds();

  const [hourAngle, setHourAngle] = useState((hours + minutes / 60) * 15);
  const [secondAngle, setSecondAngle] = useState(seconds * 6);

  useEffect(() => {
    let frameId: number;

    const updateClock = () => {
      const now = new Date();

      const hours = now.getHours() % 24;

      const minutes = now.getMinutes();

      const seconds = now.getSeconds();

      const ms = now.getMilliseconds();

      setHourAngle((hours + minutes / 60 + seconds / 3600) * 15);

      setSecondAngle((seconds + ms / 1000) * 6);

      frameId = requestAnimationFrame(updateClock);
    };

    updateClock();

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="border rounded-full size-[85vh] relative ">
      <ActivitySectors />
      <ClockBorder />
      {data.map((hour) => (
        <DrawNumber key={hour.label} label={hour.label} angle={hour.angle} />
      ))}

      {/* hands */}
      <DrawHands angle={hourAngle} handType="hour" />
      <DrawHands angle={secondAngle} handType="second" />
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
