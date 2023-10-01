import { useRecoilValue } from 'recoil';
import { userThemeState } from '@/recoil/atom';

type Children = {
  children: React.ReactNode;
};

export default function FullLayout({ children }: Children) {
  const userTheme = useRecoilValue(userThemeState);

  return (
    <div
      style={{
        width: '100%',
        height: 'auto',
        minHeight: '100vh',
        padding: '124px 24px 0px 20px',
        backgroundColor: userTheme === 'dark' ? 'black' : 'white',
      }}>
      {children}
    </div>
  );
}
