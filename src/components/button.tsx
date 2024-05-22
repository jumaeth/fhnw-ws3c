interface ButtonProps {
  onClick?: () => void,
  icon?: React.ReactNode,
  text?: string,
  submit?: boolean
}

export default function Button({onClick, icon, text, submit}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2"
      type={submit ? "submit" : "button"}
    >
      {icon}
      {text}
    </button>
  )
}