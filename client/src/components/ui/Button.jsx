import React from "react";

export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}) => {
  const base =
    "px-6 py-2 rounded-full font-semibold transition-all duration-300 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-yellow-400 text-black hover:bg-yellow-300 shadow",
    secondary:
      "bg-gray-800 text-white hover:bg-gray-700 shadow",
    danger:
      "bg-red-500 text-white hover:bg-red-600 shadow",
    outline:
      "border border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-black",
    link:
      "text-yellow-600 hover:text-yellow-500 underline bg-transparent px-0 py-0 shadow-none",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
