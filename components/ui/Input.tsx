interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      <label className="text-sm font-black uppercase tracking-wider ml-1 bg-black text-white px-2 py-0.5 w-fit -rotate-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-white border-4 border-black px-4 py-4 text-black font-bold placeholder:text-gray-400 focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-[4px] focus:translate-y-[4px] transition-all"
      />
    </div>
  );
}