import { myDailyActivity } from "@/mock/clock";

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

export default ActivitySectors;
