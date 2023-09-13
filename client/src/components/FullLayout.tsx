import { useRecoilValue } from 'recoil';
import classes from './FullLayout.module.css';
import { userThemeState } from '@/recoil/atom';
import { getCurrentThemeClass } from '@/constant/common';

type Children = {
  children: React.ReactNode;
};

export default function FullLayout({ children }: Children) {
  const userTheme = useRecoilValue(userThemeState);

  return (
    <div
      className={`${getCurrentThemeClass(
        userTheme,
        classes.content_card_background_light,
        classes.content_card_background_dark,
      )} ${classes.content_card}`}>
      {children}
    </div>
  );
}
