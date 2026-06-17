import { CLOCK_CONST } from "@/constants/clock";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  const middleHour = (start + end) / 2;

  const angle = middleHour * 15; // 24h clock

  const rad = (angle * Math.PI) / 180;

  const x = CLOCK_CONST.CENTER + ACTIVITY_RADIUS * Math.sin(rad);
  const y = CLOCK_CONST.CENTER - ACTIVITY_RADIUS * Math.cos(rad);

  return (
    <div
      className={`absolute font-semibold ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} transition-all duration-500 flex flex-col items-center gap-1`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 overflow-hidden rounded-xl shadow-md">
        <Image
          src={`/activity/pixel-panda.svg`}
          alt={`${title} — pixel panda`}
          width={48}
          height={48}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="text-black mt-1 text-center text-[10px] sm:text-xs md:text-sm hidden sm:block">{title}</p>
    </div>
  );
};

export default DrawActivity;
