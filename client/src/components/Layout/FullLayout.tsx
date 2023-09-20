import { useRecoilValue } from 'recoil';
import { isSidebarOpenState, userThemeState } from '@/recoil/atom';
import Sidebar from '../Sidebar/Sidebar';

type Children = {
  children: React.ReactNode;
};

export default function FullLayout({ children }: Children) {
  const userTheme = useRecoilValue(userThemeState);
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);

  return (
    <div
      style={{
        width: '100%',
        height: 'auto',
        minHeight: '100vh',
        padding: isSidebarOpen ? '124px 324px' : '124px 24px',
        backgroundColor: userTheme === 'dark' ? 'black' : 'white',
      }}>
      <Sidebar />
      {children}
    </div>
  );
}
