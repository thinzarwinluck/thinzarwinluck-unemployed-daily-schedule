import ClockLayoutComponent from "@/components/clock-layout";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between pb-10 pt-5">
      <h5 className="text-2xl font-bold text-center text-[#F472B6]">
        🐼 ThinZarWinLuck Unemployed Daily Schedule 🐼
      </h5>
      <ClockLayoutComponent />
    </div>
  );
}
