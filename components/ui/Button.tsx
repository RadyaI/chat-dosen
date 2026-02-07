interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "whatsapp";
  icon?: React.ReactNode;
}

export function Button({ children, variant = "primary", icon, className, ...props }: ButtonProps) {
  const baseStyles = "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    outline: "bg-transparent border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#128C7E] shadow-[0_0_15px_rgba(37,211,102,0.4)]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className || ""}`} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}