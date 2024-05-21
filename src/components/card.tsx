interface Props {
  left: string;
  addonRight?: string;
  right: string;
}

export default function Card({left, addonRight, right}: Props) {
  return (
    <div className="w-64 flex flex-row justify-between gap-4 bg-white dark:bg-zinc-800 shadow-lg rounded-lg p-4">
      <p className="">{left}</p>
      <div className="flex gap-6">
        {addonRight && <p className="italic">{addonRight}</p>}
        <p className="font-bold">{right}</p>
      </div>
    </div>
  )
}