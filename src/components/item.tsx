import React from 'react';

interface ItemProps {
  id: string;
  color: string;
  label: string;
}

const Item: React.FC<ItemProps> = ({ id, color, label }) => {
  return (
    <div
      className={`w-full h-full p-2 flex items-center justify-center text-white text-2xl cursor-pointer select-none ${color} rounded-[20px]`}
      data-swapy-item={id}
    >
      <div>{label}</div>
    </div>
  );
};

export default Item;