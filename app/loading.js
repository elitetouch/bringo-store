function Pulse({ className }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/10 ${className}`}
    />
  );
}

export default function Loading() {
  return (
    <div className="grid lg:grid-cols-10 min-h-screen">
      {/* ── Left panel ── */}
      <div className="bg-[#0E4940] lg:col-span-6 min-h-screen lg:grid lg:items-center">
        <div className="w-11/12 lg:w-10/12 m-auto text-white">
          {/* Mobile logo row */}
          <div className="flex items-center gap-x-[10px] lg:hidden mt-[25px] mb-[40px]">
            <Pulse className="h-[32px] w-[32px] rounded-full" />
            <Pulse className="h-[18px] w-[60px]" />
          </div>

          {/* Heading */}
          <div className="lg:w-7/12 grid gap-y-[12px]">
            <Pulse className="h-[32px] w-[260px]" />
          </div>

          {/* Body text lines */}
          <div className="lg:w-8/12 lg:mt-[15px] mt-[24px] grid gap-y-[10px]">
            <Pulse className="h-[14px] w-full" />
            <Pulse className="h-[14px] w-full" />
            <Pulse className="h-[14px] w-10/12" />
            <Pulse className="h-[14px] w-8/12" />
            {/* Learn More button */}
            <div className="lg:mt-[20px] mt-[24px]">
              <Pulse className="h-[42px] w-[130px] rounded-full" />
            </div>
          </div>

          {/* Mobile login form skeleton */}
          <div className="lg:hidden mt-[66px] pb-[40px]">
            <div className="bg-[#0E4940] rounded-lg border border-white/10 w-full pb-[20px]">
              <div className="w-10/12 m-auto pt-[20px] grid gap-y-[6px]">
                <Pulse className="h-[14px] w-10/12" />
              </div>
              <div className="w-10/12 m-auto mt-[40px] grid gap-y-[15px]">
                <Pulse className="h-[54px] w-full rounded-xl" />
                <Pulse className="h-[54px] w-full rounded-xl" />
                <div className="flex items-center justify-between mt-[10px]">
                  <Pulse className="h-[14px] w-[100px]" />
                  <Pulse className="h-[14px] w-[110px]" />
                </div>
              </div>
              <div className="w-10/12 m-auto mt-[20px]">
                <Pulse className="h-[48px] w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel (desktop only) ── */}
      <div className="bg-[#0E4940] col-span-4 min-h-screen hidden lg:grid items-center">
        <div className="w-9/12 m-auto">
          {/* Logo */}
          <div className="flex items-center gap-x-[10px]">
            <Pulse className="h-[34px] w-[34px] rounded-full" />
            <Pulse className="h-[18px] w-[60px]" />
          </div>

          {/* Welcome text */}
          <div className="mt-[40px] grid gap-y-[10px]">
            <Pulse className="h-[22px] w-[120px]" />
            <Pulse className="h-[22px] w-[160px]" />
          </div>

          {/* Subtitle */}
          <div className="mt-[20px] grid gap-y-[8px]">
            <Pulse className="h-[14px] w-full" />
            <Pulse className="h-[14px] w-10/12" />
          </div>

          {/* Inputs */}
          <div className="mt-[40px] w-11/12 grid gap-y-[15px]">
            <Pulse className="h-[60px] w-full rounded-xl" />
            <Pulse className="h-[60px] w-full rounded-xl" />
            <div className="flex items-center justify-between mt-[10px]">
              <Pulse className="h-[14px] w-[110px]" />
              <Pulse className="h-[14px] w-[120px]" />
            </div>
          </div>

          {/* Login button */}
          <div className="mt-[15px]">
            <Pulse className="h-[50px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
