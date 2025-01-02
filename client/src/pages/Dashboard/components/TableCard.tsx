import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import InboundTable from "./InboundTable";

import { useCounselor } from "@/hooks";

/**
 * 인바운드 테이블 카드
 * useCounselor 쿼리 함수로 data fetching & caching
 * mutation은 세부 컴포넌트 내에서 동작
 */
const TableCard = () => {
  const { data: counselor } = useCounselor();

  if (!counselor) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold uppercase">
          Inbound
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground"> </p>
        <InboundTable />
      </CardContent>
    </Card>
  )
}

export default TableCard