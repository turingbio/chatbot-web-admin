import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useCounselor, useUpdateSettings } from '@/hooks';
import { CounselorSettings, DaySchedule } from '@/types';

/**
 * 카운슬러 프로필 카드
 * useCounselor 쿼리 함수로 data mutation & caching
 * 환자 매칭 동의 여부 / 주간 채팅 가능 날짜, 시간 / 알림 여부 설정
*/
const SettingsCard = () => {
  const { data: counselor } = useCounselor()
  const { mutate: updateSettings } = useUpdateSettings();

  const weekdays = ['월', '화', '수', '목', '금', '토', '일'] as const;
  const timeOptions = Array.from({ length: 24 }, (_, i) =>
    `${String(i).padStart(2, '0')}:00`
  );

  if (!counselor) return null;

  // TODO: 로직 함수 분리하기
  // 일반 설정 변경 핸들러
  const handleSettingChange = (key: keyof CounselorSettings, value: boolean) => {
    if (!counselor.settings) return;

    updateSettings({
      ...counselor.settings,
      [key]: value
    });
  };

  // 시간 설정 변경 핸들러
  const handleHourChange = (
    day: keyof CounselorSettings['availableHours'],
    field: keyof DaySchedule,
    value: string | boolean
  ) => {
    if (!counselor.settings) return;

    updateSettings({
      ...counselor.settings,
      availableHours: {
        ...counselor.settings.availableHours,
        [day]: {
          ...counselor.settings.availableHours[day],
          [field]: value
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-2xl font-bold uppercase'>
          Settings
        </CardTitle>
      </CardHeader>

      <CardContent className='my-4 space-y-6'>
        <div className='flex items-center justify-between'>
          <Label className='text-sm'>환자 매칭 동의</Label>
          <Switch
            checked={counselor.settings.matchingEnabled}
            onCheckedChange={(checked) => handleSettingChange('matchingEnabled', checked)}
          />
        </div>

        <div className='space-y-3'>
          <Label className='text-sm'>채팅 가능 시간</Label>
          {weekdays.map(day => (
            <div key={day} className='grid grid-cols-[1fr_2fr_2fr] gap-4 items-center'>
              <div className="flex gap-6">
                <Switch
                  checked={counselor.settings.availableHours[day].active}
                  onCheckedChange={(checked) => handleHourChange(day, 'active', checked)}
                />
                <span className='font-medium text-xs text-muted-foreground'>{day}</span>
              </div>
              <Select
                value={counselor.settings.availableHours[day].start}
                onValueChange={(value) => handleHourChange(day, 'start', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='시작 시간' />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={counselor.settings.availableHours[day].end}
                onValueChange={(value) => handleHourChange(day, 'end', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='종료 시간' />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

        </div>

        <div className='space-y-4 flex items-center justify-between'>
          <Label className='text-sm'>알림 설정</Label>
          <Switch
            checked={counselor.settings.notificationsEnabled}
            onCheckedChange={(checked) => handleSettingChange('notificationsEnabled', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsCard;