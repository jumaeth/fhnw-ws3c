export default function Footer() {
  return (
    <div className="flex justify-center items-center bg-white h-12 shadow-md">
      <p className="text-gray-500">© {new Date().getFullYear().toString()}</p>
    </div>
  )
}