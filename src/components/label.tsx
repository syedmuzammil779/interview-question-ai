import React from "react";

const LabelUI = ({ id, title }: { id: string; title: string }) => {
  return (
    <label
      htmlFor={id}
      className="block text-sm font-medium tracking-[1px] uppercase text-gray-600 mb-2.5"
    >
      {title}
    </label>
  );
};

export default LabelUI;
