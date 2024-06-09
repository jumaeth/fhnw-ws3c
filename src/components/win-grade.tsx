import { Icons } from "./icons";
import Button from "./button";
import { useWinGrade } from "@/hooks/win-grade-provider";

export function WinGrade() {

    const { winGrade, setWinGrade } = useWinGrade();

    return (
        <div className="flex items-center">
            {winGrade <= 1 && <Button icon={<Icons.down color="#d1d5db" className="w-5 h-5 " />} disabled />}
            {winGrade > 1 && <Button
                onClick={() => setWinGrade(false)}
                icon={<Icons.down color="#b91c1c" className="w-5 h-5" />}
            />}

            <div className="rounded-full w-fit flex items-center justify-center">
                <label className="text-5xl font-bold mr-4 border-b-4 border-black">{winGrade}</label>
                <label className="text-3xl font-bold ml-1 ">Gewinnt</label>
            </div>
            {winGrade < 6 && <Button
                onClick={() => setWinGrade(true)}
                icon={<Icons.up color="#15803d" className="w-5 h-5 " />}
            />}
            {winGrade >= 6 && <Button icon={<Icons.up color="#d1d5db" className="w-5 h-5 " />} disabled />}
        </div>
    )
}