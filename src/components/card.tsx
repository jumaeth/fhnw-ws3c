import { useDeleteButton } from "@/hooks/delete-button-provider";
import Button from "./button";
import { Icons } from "./icons";
import { Link } from "react-router-dom";

interface Props {
    toDelete: () => void;
    children?: any;
    url?: string;
}

export function Card({ toDelete, children, url }: Props) {

    const { showDeleteButtons } = useDeleteButton();

    return (
        <div className={`flex gap-2`}>

            {url && <Link to={url}><CoreCard>{children}</CoreCard></Link>}
            {!url && <CoreCard>{children}</CoreCard>}

            {showDeleteButtons && (
                <Button
                    onClick={() => toDelete()}
                    icon={<Icons.trash color="#6b7280" className="w-4 h-4" />}
                />
            )}
        </div>
    )
}

function CoreCard({ children }: { children: any }) {
    return (
        <div className={`bg-white border-1 border border-gray-200 text-xl w-64  text-gray-500 gap-4 drop-shadow-md rounded-lg py-4 px-6`}>
            <div className="flex flex-row items-center justify-between w-full">
                {children}
            </div>
        </div>
    )
}