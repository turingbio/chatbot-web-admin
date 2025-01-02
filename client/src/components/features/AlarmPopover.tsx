
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

import { useCounselorAlarms } from '@/hooks/useCounselor';
import { Alarm } from '@/types/alarm';

/**
 * Header의 알람 아이콘 클릭시 popover
 * query 함수를 통해 alarm 데이터 fetching, caching
 */
const AlarmPopover = ({ trigger }: { trigger: React.ReactNode }) => {
  const { data: alarms } = useCounselorAlarms();

  if (!alarms) return;

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className='w-80 space-y-2'>
        <ScrollArea className='h-[500px] rounded-md overflow-y-auto '>
          <p className='mb-2 text-lg p-3 font-semibold leading-none'>알림</p>
          <div className='*:p-4 *:border mb-4 space-y-2'>
            {alarms.map((alarm: Alarm) => (
              <div key={alarm.id} className='rounded-md text-sm'>
                <p className='text-sm text-gray-400'>{new Date(alarm.createdAt).toLocaleString('ko-KR')}</p>
                <p className='text-base font-semibold my-1'>{alarm.title}</p>
                <p className='text-sm'>{alarm.detail}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export default AlarmPopover