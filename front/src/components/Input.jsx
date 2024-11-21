import React from "react";

export default function Input({
  value,
  onChange,
  placeholder = "",
  type = "text",
  error = "",
  required = false,
  className = "",
}) {
  return (
    <div className={`mb-6 ${className}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`bg-input rounded-[10px]  py-[10px] px-4 w-full focus:border-[1px] focus:border-input focus:outline-none focus:bg-white ${
          error && "border-[1px] border-error  bg-white"
        } `}
      />
      {error && <p className="text-error text-body-extra-small">{error}</p>}
    </div>
  );
}
