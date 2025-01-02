import { Link } from 'react-router';

import { AlarmPopover } from '@/components';
import { useAuthStore } from '@/stores/useAuthStore';
import { cn } from '@/lib/utils/cn';

/**
 * 인증 여부(isAuthenticated)에 따라 Header ui 변경
 * 인증 여부는 zustand의 useAuthStore로 관리
 */
export default function Header() {
  const { isAuthenticated, counselor, logout } = useAuthStore();

  const buttonStyle = 'w-10 md:w-14 aspect-square bg-white rounded-full p-2.5 md:p-3.5 cursor-pointer hover:bg-gray-100'

  return (
    <header className="user-select-none h-16 md:h-20 px-4 md:px-6 py-2 md:py-4 flex justify-between items-center">
      <Title text='TB-CHAT' />
      {isAuthenticated && (
        <nav className="flex items-center gap-3 md:gap-5">
          <p className="hidden md:block text-base">
            안녕하세요, <span className="text-lg font-semibold">{counselor?.name}</span>님
          </p>
          <ul className="flex gap-2 md:gap-2.5 items-center">
            <li>
              <AlarmPopover trigger={
                <button className={cn(buttonStyle, 'relative')}>
                  <img src='/bell.png' alt='alert' />
                  <div className='absolute top-0 right-1 bg-[#FF3E24] w-3 h-3 rounded-full' />
                </button>
              } />
            </li>
            <li>
              <Link to='/analytics' className={cn(buttonStyle, 'block')}>
                <img src='/analytics.png' alt='analytics' />
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className={buttonStyle}
              >
                <img src='/logout.png' alt='logout' />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

const Title = ({ text }: { text: string }) => {
  return (
    <h1 className="text-xl md:text-2xl font-medium">
      <Link to='/' className="flex gap-2 md:gap-3 justify-center items-center font-bold comfortaa">
        <div className="w-6 md:w-8 h-6 md:h-8 border-4 md:border-[5px] border-current" />
        {text}
      </Link>
    </h1>
  );
};