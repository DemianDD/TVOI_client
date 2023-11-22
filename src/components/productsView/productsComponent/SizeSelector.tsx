import React from "react";
import "../../../styles/selector.css";

interface IProps {
  sizes: ISize[];
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

  const renderColorOptions = () => {
    return props.sizes.map((size) => {
      return renderSizeOption(size.value);
    });
  };

  return <div className="selector-container">{renderColorOptions()}</div>;
};