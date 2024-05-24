interface ButtonProps {
  onClick?: () => void,
  icon?: React.ReactNode,
  text?: string,
  submit?: boolean
  className?: string
}

export default function Button({onClick, icon, text, submit, className}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} text-grey-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center`}
      type={submit ? "submit" : "button"}
    >
      {icon}
      {text}
    </button>
  )
}