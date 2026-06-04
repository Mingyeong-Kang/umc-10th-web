import { THEME, useTheme } from '../context/ThemeProvider';
import clsx from 'clsx';

export default function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    const isLightMode = theme == THEME.LIGHT;

  return (
    <button 
      onClick = {toggleTheme}
      className={clsx('px-4 py-2 mb-4 rounded-md transition-all flex justify-end', {
        'bg-[rgb(39,39,43)] text-white': !isLightMode, //다크 모드인 경우
        'bg-white text-black': isLightMode //라이트 모드 인경우
      })}
    >
      {isLightMode ? '🌙 다크모드' : '🌞 라이트모드'}
    </button>
  )
}
