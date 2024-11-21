import React from "react";

const Button = ({ text, onClick, variant = "primary", className = "" }) => {
  const baseClasses =
    "p-[15px] rounded-[10px] text-body-regular text-white focus:outline-none transition duration-300 w-full";

  const variants = {
    primary: "bg-primary hover:bg-green-400 px-7 py-4",
    secondary: "border border-white hover:bg-gray-700 py-4",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className} `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
