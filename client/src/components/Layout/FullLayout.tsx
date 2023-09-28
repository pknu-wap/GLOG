import { useRecoilValue } from 'recoil';
import { isSidebarOpenState, userThemeState } from '@/recoil/atom';
import Sidebar from '../Sidebar/Sidebar';
import { usePathname } from 'next/navigation';

type Children = {
  children: React.ReactNode;
};

export default function FullLayout({ children }: Children) {
  const userTheme = useRecoilValue(userThemeState);
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);
  const pathname = usePathname();

  return (
    <div
      style={{
        width: '100%',
        height: 'auto',
        minHeight: '100vh',
        padding:
          isSidebarOpen && pathname !== '/write' ? '124px 24px 24px 324px' : '124px 24px 0px 20px',
        backgroundColor: userTheme === 'dark' ? 'black' : 'white',
      }}>
      {pathname !== '/write' && <Sidebar />}
      {children}
    </div>
  );
}
