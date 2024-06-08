import { Icons } from "./icons";
import Button from "./button";
import { useWinGrade } from "@/hooks/win-grade-provider";

export function WinGrade() {

    const { winGrade, setWinGrade } = useWinGrade();

    return (
        <div className="flex items-center">
            <Button
                onClick={() => setWinGrade(false)}
                icon={<Icons.down color="#b91c1c" className="w-5 h-5" />}
            />

            <div className="rounded-full w-fit flex items-center justify-center">
                <label className="text-5xl font-bold mr-4 border-b-4 border-black">{winGrade}</label>
                <label className="text-3xl font-bold ml-1 ">Gewinnt</label>
            </div>
            <Button
                onClick={() => setWinGrade(true)}
                icon={<Icons.up color="#15803d" className="w-5 h-5 " />}
            />
        </div>
    )
}