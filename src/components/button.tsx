import React from "react";

const ButtonUI = ({
  title,
  className,
  disabled,
  ...props
}: {
  title: string;
  className?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={disabled}
      className={`w-full font-mono text-xs tracking-widest uppercase py-3 px-4 transition-all  font-bold border cursor-pointer bg-blue-500  text-white border-blue-600 ${
        disabled
          ? " cursor-not-allowed opacity-50 "
          : "hover:bg-blue-600 active:scale-95"
      } ${className ?? ""}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default ButtonUI;
