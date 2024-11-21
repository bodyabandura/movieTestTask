import React from "react";

export default function CheckBox({ label, className }) {
  return (
    <label
      className={`flex items-center cursor-pointer space-x-2 mb-6 ${className}`}
    >
      <input type="checkbox" className="hidden peer" />
      <span className="w-[18px] h-[17px] rounded-[5px] bg-input transition-colors duration-200  peer-checked:bg-primary"></span>
      <p className="text-white text-body-small">{label}</p>
    </label>
  );
}
