import { Icons } from "./icons";

export function Footer() {

    const average = parseFloat(localStorage.getItem("average") || "0");
    const getColor = average < 4 ? average < 3.75 ? "text-red-500" : "text-orange-500" : "text-green-500";

    if (location.pathname === "/") {
        return <CoreFooter><p className="text-gray-500">4 Gewinnt © {new Date().getFullYear().toString()}</p></CoreFooter>
    }

    return (
        <CoreFooter>
            {(average > 0) && <><Icons.average className="h-4 w-4" /><p className={`ml-2 text-2xl ${getColor}`}>{average.toFixed(2)}</p></>}
            {(average === 0) && (<p className="text-gray-500">Kein Durchschnitt verfügbar</p>)}
        </CoreFooter>
    )
}

export function setAverage(average: number) {
    localStorage.setItem("average", average.toString());
}

function CoreFooter({ children }: { children: any }) {
    return (
        <footer className="w-full rounded-t-3xl shadow-[rgba(0,0,15,0.5)_0px_0px_8px_0px] bg-white text-center p-4">
            <div className="flex justify-center items-center h-12">
                {children}
            </div>
        </footer>
    )
}