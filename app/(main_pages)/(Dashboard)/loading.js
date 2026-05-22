function Pulse({ className }) {
  return (
    <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
  );
}

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-100 pb-[50px]">
      {/* ── Header ── */}
      <div className="w-11/12 m-auto lg:flex grid gap-y-[20px] justify-between items-center pt-[20px] lg:pt-[30px]">
        <div className="grid gap-y-[10px]">
          <Pulse className="h-[28px] w-[220px]" />
          <Pulse className="h-[16px] w-[280px]" />
          <Pulse className="h-[14px] w-[200px]" />
        </div>
        <div className="flex items-center gap-x-[20px]">
          <Pulse className="h-[40px] w-[130px] rounded-[8px]" />
          <Pulse className="h-[40px] w-[120px] rounded-[8px]" />
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="w-11/12 m-auto lg:mt-[40px] mt-[20px] grid lg:grid-cols-4 grid-cols-2 gap-y-[20px] gap-x-[20px]">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`h-[151px] rounded-lg shadow-sm p-[14px] flex flex-col justify-between ${
              i === 0 ? "bg-[#007460]/20" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <Pulse className="h-[14px] w-[90px]" />
              <Pulse className="h-[24px] w-[24px] rounded-full" />
            </div>
            <div className="flex items-center justify-between mt-[30px]">
              <Pulse className="h-[28px] w-[100px]" />
              <Pulse className="h-[14px] w-[40px]" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Chart + selling products panel ── */}
      <div className="w-11/12 m-auto mt-[40px] grid lg:grid-cols-5 gap-x-[20px] gap-y-[20px]">
        {/* Chart */}
        <div className="lg:col-span-3 bg-white rounded-lg p-[20px]">
          <Pulse className="h-[16px] w-[140px] mb-[20px]" />
          <Pulse className="h-[220px] w-full rounded-lg" />
        </div>

        {/* Top selling products */}
        <div className="lg:col-span-2 bg-white rounded-lg pt-[20px] pb-[20px]">
          <div className="flex items-center justify-between pb-[10px] w-11/12 m-auto border-b border-gray-200">
            <Pulse className="h-[16px] w-[150px]" />
            <Pulse className="h-[24px] w-[24px] rounded-full" />
          </div>
          <div className="grid gap-y-[20px] w-11/12 m-auto pt-[20px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-x-[20px] w-full">
                <Pulse className="h-[44px] w-[44px] rounded-lg shrink-0" />
                <div className="w-full grid gap-y-[8px]">
                  <div className="flex items-center justify-between">
                    <Pulse className="h-[13px] w-[100px]" />
                    <Pulse className="h-[13px] w-[60px]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Pulse className="h-[12px] w-[70px]" />
                    <Pulse className="h-[12px] w-[60px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Orders table ── */}
      <div className="w-11/12 m-auto mt-[20px] bg-white rounded-lg pt-[16px] pb-[20px]">
        <div className="flex items-center justify-between w-11/12 m-auto pb-[16px] border-b border-gray-100">
          <Pulse className="h-[16px] w-[120px]" />
          <Pulse className="h-[36px] w-[160px] rounded-lg" />
        </div>
        {/* Table header */}
        <div className="grid grid-cols-5 gap-x-[16px] px-[16px] mt-[12px]">
          {[...Array(5)].map((_, i) => (
            <Pulse key={i} className="h-[12px]" />
          ))}
        </div>
        {/* Table rows */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-x-[16px] px-[16px] mt-[16px] items-center"
          >
            <Pulse className="h-[14px]" />
            <Pulse className="h-[14px]" />
            <Pulse className="h-[14px]" />
            <Pulse className="h-[14px] w-[60px]" />
            <Pulse className="h-[26px] w-[70px] rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
