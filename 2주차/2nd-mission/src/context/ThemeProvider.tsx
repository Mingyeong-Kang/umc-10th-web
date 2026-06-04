/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type PropsWithChildren } from "react";

export enum THEME {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
}   

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
    theme: TTheme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({children}: PropsWithChildren) => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

    const toggleTheme = () => {
        //이전 테마를 받아서 이전 테마가 라이트 모드면 다크 모드로, 아니면 라이트 모드로 변경
        setTheme((prevTheme) => prevTheme === THEME.LIGHT? THEME.DARK : THEME.LIGHT);
    };

    return (
        <ThemeContext.Provider value={{ theme: theme, toggleTheme:toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if(!context){
        throw new Error ('useTheme must be used within a ThemeProvider');
    }

    return context;
};