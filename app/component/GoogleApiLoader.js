function Pulse({ className }) {
  return <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />;
}

export default function GoogleApiLoader() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ── Sidebar skeleton (desktop only) ── */}
      <div className="lg:flex hidden flex-col w-[250px] min-h-screen bg-white border-r border-gray-100 fixed p-[20px] gap-y-[20px]">
        {/* Logo */}
        <div className="flex items-center gap-x-[10px] mb-[20px]">
          <Pulse className="h-[36px] w-[36px] rounded-full" />
          <Pulse className="h-[16px] w-[80px]" />
        </div>
        {/* Nav items */}
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex items-center gap-x-[12px]">
            <Pulse className="h-[20px] w-[20px] rounded-md" />
            <Pulse className="h-[14px] w-[110px]" />
          </div>
        ))}
      </div>

      {/* ── Main area ── */}
      <div className="lg:pl-[250px] flex-1 flex flex-col">
        {/* Top nav skeleton */}
        <div className="bg-white h-[64px] w-full flex items-center justify-between px-[24px] border-b border-gray-100">
          <Pulse className="h-[16px] w-[160px]" />
          <div className="flex items-center gap-x-[16px]">
            <Pulse className="h-[36px] w-[36px] rounded-full" />
            <Pulse className="h-[36px] w-[36px] rounded-full" />
            <Pulse className="h-[36px] w-[100px] rounded-lg" />
          </div>
        </div>

        {/* Content area */}
        <div className="p-[24px] grid gap-y-[20px]">
          {/* Stat cards */}
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-[20px]">
            {[...Array(4)].map((_, i) => (
              <Pulse key={i} className="h-[151px] rounded-lg" />
            ))}
          </div>

          {/* Chart + panel row */}
          <div className="grid lg:grid-cols-5 gap-[20px]">
            <Pulse className="lg:col-span-3 h-[280px] rounded-lg" />
            <Pulse className="lg:col-span-2 h-[280px] rounded-lg" />
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg p-[20px] grid gap-y-[14px]">
            <Pulse className="h-[14px] w-[140px]" />
            {[...Array(5)].map((_, i) => (
              <Pulse key={i} className="h-[40px] w-full rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
