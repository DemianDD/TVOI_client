import React from "react";
import "../../../styles/selector.css";

interface IProps {
  sizes: (string | { value: string })[]; // Updated to accept an array of strings or objects
  onSizeSelect: (size: string) => void;
}

export const SizeSelector = (props: IProps) => {
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    props.onSizeSelect(size);
  };

  const renderSizeOption = (size: string) => {
    return (
      <div
        key={size}
        className={`selector-item ${selectedSize === size ? "selected-item" : ""}`}
        onClick={() => handleSizeSelect(size)}
      >
        {size}
      </div>
    );
  };

  const renderSizeOptions = () => {
    return props.sizes.map(size => {
      const sizeString = typeof size === 'string' ? size : size.value; // Extracting string from object if needed
      return renderSizeOption(sizeString);
    });
  };

  return <div className="selector-container">{renderSizeOptions()}</div>;
};
