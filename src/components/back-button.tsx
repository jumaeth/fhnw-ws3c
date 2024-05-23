import {Icons} from "@/components/icons.tsx"

export default function BackButton({onClick}: { onClick: () => void }) {
  if (window.location.pathname === "/") {
    return <div/>;
  }
  return (
    <button
      onClick={onClick}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
    >
      <Icons.arrowLeft className="w-4 h-4 mr-2"/>
      Back
    </button>
  )
}