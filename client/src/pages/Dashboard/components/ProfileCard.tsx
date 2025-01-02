import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

import { useCounselor } from '@/hooks';

/**
 * 카운슬러 프로필 카드
 * useCounselor 쿼리 함수로 data fetching & caching
 */
const ProfileCard = () => {
  const { data: counselor } = useCounselor();

  if (!counselor) return null;

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-2xl font-bold uppercase'>
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-xs text-muted-foreground'>
          위둘에 등록된 상담사님의 정보입니다.
        </p>
        <div className='grid grid-cols-4 gap-4 p-3 my-4'>
          <Avatar className='w-24 h-24' >
            <AvatarImage src={counselor.profileImage} alt='@shadcn' />
            <AvatarFallback>fallback</AvatarFallback>
          </Avatar>
          <div className='col-span-3 space-y-1'>
            <div className='grid grid-cols-6'>
              <label htmlFor='name' className='text-sm'>이름</label>
              <p id='name' className='col-span-5' >{counselor.name}</p>
            </div>
            <div className='grid grid-cols-6'>
              <label htmlFor='email' className='text-sm'>이메일</label>
              <p id='email' className='col-span-5' >{counselor.email}</p>
            </div>
            <div className='grid grid-cols-6'>
              <label htmlFor='center' className='text-sm'>센터</label>
              <p id='center' className='col-span-5' >{counselor.center}</p>
            </div>
            <div className='grid grid-cols-6'>
              <label htmlFor='call' className='text-sm'>전화</label>
              <p id='call' className='col-span-5' >{counselor.call}</p>
            </div>
          </div>
        </div>

        <div className='p-3'>
          <div className='grid grid-cols-4'>
            <label htmlFor='specialties' className='pt-2 text-sm'>특화 분야</label>
            <div className='col-span-3' >
              <ul id='specialties' className='flex space-x-1'>
                {counselor.specialties.map((ele) => (
                  <li key={ele} className='px-3 py-2 text-sm bg-slate-300 rounded-[30px]'>{ele}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className='grid grid-cols-4 items-center space-y-2'>
            <label htmlFor='career' className='pt-2 text-sm'>경력</label>
            <ul id='career' className='col-span-3 gap-x-1'>
              {counselor.career.map((ele) => (
                <li key={ele.label} className='flex justify-between' >
                  <p>{ele.label}</p>
                  <p className='text-sm text-gray-400'>{ele.date}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className='grid grid-cols-4 space-y-2'>
            <label htmlFor='education' className='pt-2 text-sm'>학력</label>
            <ul id='education' className='col-span-3 gap-x-1'>
              {counselor.education.map((ele) => (
                <li key={ele.label} className='flex justify-between' >
                  <p>{ele.label}</p>
                  <p className='text-sm text-gray-400'>{ele.date}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className='grid grid-cols-4 space-y-2'>
            <label htmlFor='certificate' className='pt-2 text-sm'>자격증</label>
            <ul id='certificate' className='col-span-3 gap-x-1'>
              {counselor.certificate.map((ele) => (
                <li key={ele.label} className='flex justify-between' >
                  <p>{ele.label}</p>
                  <p className='text-sm text-gray-400'>{ele.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card >
  )
}

export default ProfileCard
