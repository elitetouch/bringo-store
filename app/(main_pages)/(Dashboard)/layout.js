import Dashboard_Deskwrap from "@/app/component/app_wraps/Dashboard_Deskwrap";
export default function DashboardLayout({ children }) {
  return (
   <div>
    <Dashboard_Deskwrap>
        {children}

    </Dashboard_Deskwrap>
      </div>
  );
}
