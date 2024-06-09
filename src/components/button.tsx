interface ButtonProps {
  onClick?: () => void,
  icon?: React.ReactNode,
  text?: string,
  submit?: boolean
  className?: string,
  disabled?: boolean
}

export default function Button({ onClick, icon, text, submit, className, disabled }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-grey-500 ${disabled ? " text-gray-300 hover:bg-transparent" : ""} hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ${className} `}
      type={submit ? "submit" : "button"}
    >
      {icon}
      {text}
    </button>
  )
}