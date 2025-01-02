import { ProfileCard, SettingsCard, TableCard } from "./components"

import { QueryStateHandler } from "@/components";
import { useCounselor } from "@/hooks";

/**
 * 메인 대시보드 페이지
 */
export default function Page() {
  const { isLoading, error } = useCounselor();

  return (
    <QueryStateHandler isLoading={isLoading}
      error={error} >
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <div className="lg:grid max-lg:space-y-4 gap-4 grid-cols-2">
            <ProfileCard />
            <SettingsCard />
            <div className="col-span-2">
              <TableCard />
            </div>
          </div>
        </div >
      </div >
    </QueryStateHandler>
  )
}
