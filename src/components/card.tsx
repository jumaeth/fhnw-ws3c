interface Props {
  left: string;
  addonRight?: string;
  right?: any;
  className?: string;
}

export default function Card({left, addonRight, right, className}: Props) {
  return (
    <div className={`${className} w-64 flex flex-row justify-between text-gray-500 gap-4 bg-white shadow-lg rounded-lg p-4`}>
      <p className="text-gray-500">{left}</p>
      <div className="flex gap-6">
        {addonRight && <p className="italic">{addonRight}</p>}
        <div className="flex justify-center items-center">
          {right}
        </div>
      </div>
    </div>
  )
}