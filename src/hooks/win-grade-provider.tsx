import { createContext, useContext, useState } from 'react';

const WinGradeContext = createContext({
    winGrade: 4,
    setWinGrade: (_up: boolean) => { }
});

export function useWinGrade() {
    return useContext(WinGradeContext);
}

export function WinGradeProvider({ children }: { children: React.ReactNode }) {
    const [winGrade, setWinGrade] = useState(parseFloat(localStorage.getItem("winGrade") || "4"));

    const updateWinGrade = (up: boolean) => {
        const newGrade = winGrade + (up ? 1 : -1);
        setWinGrade(newGrade);
        localStorage.setItem("winGrade", newGrade.toString());
    }

    const value = {
        winGrade,
        setWinGrade: (up: boolean) => updateWinGrade(up)
    };

    return (
        <WinGradeContext.Provider value={value}>
            {children}
        </WinGradeContext.Provider>
    );
}