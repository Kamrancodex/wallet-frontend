import React from "react";

const InputField = ({
  type,
  placeholder,
  label,
  className,
  readOnly,
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="mb-2 font-semibold text-gray-700">{label}</label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        className={`bg-gray-100 p-2 rounded-md text-black ${
          error ? "border-red-500" : ""
        }`} // Add text-black class
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default InputField;
