import React from "react";
import "../../../styles/selector.css";
import { translateText } from "../../../services/translation.service";

interface IProps {
  colors: (string | { name: string })[];
  onColorSelect: (color: string) => void;
}

var GOLD = "https://htmlcolorcodes.com/assets/images/colors/gold-color-solid-background-1920x1080.png";
var SILVER = "https://htmlcolorcodes.com/assets/images/colors/silver-color-solid-background-1920x1080.png";
var ROSEGOLD = "https://htmlcolorcodes.com/assets/images/colors/rose-gold-color-solid-background-1920x1080.png";
var WHITE = "https://www.color-name.com/color-image?c=FCFBF4&desktop";
var BLACK = "https://htmlcolorcodes.com/assets/images/colors/black-color-solid-background-1920x1080.png";
var RED = "https://htmlcolorcodes.com/assets/images/colors/blood-red-color-solid-background-1920x1080.png";
var BLUETIFFANY = "https://miro.medium.com/v2/resize:fit:1200/1*2aBDS1l1PpHDoPX29S7FzA.jpeg";
var MILITARY = "https://static.vecteezy.com/system/resources/previews/006/174/696/original/military-army-black-brown-cream-and-green-color-camouflage-seamless-pattern-free-vector.jpg";
var DARKBLUE = "https://wallpaperaccess.com/full/2517069.jpg";

export const ColorSelector = (props: IProps) => {
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    props.onColorSelect(color);
  };

  const getColorString = (color: string | { name: string }) => {
    return typeof color === 'string' ? color : color.name;
  };

  const getImageUrl = (color: string) => {
    switch (color) {
      case "silver|A": return SILVER;
      case "gold|A": return GOLD;
      case "rosegold|A": return ROSEGOLD;
      case "white|A": return WHITE;
      case "black|A": return BLACK;
      case "bluetiffany|A": return BLUETIFFANY;
      case "red|A": return RED;
      case "military|A": return MILITARY;
      case "rose|A": return ROSEGOLD;
      case "darkblue|A": return DARKBLUE;
      default: return "";
    }
  };

  const renderColorOption = (color: string) => {
    const imageUrl = getImageUrl(color);
    return (
      <div
        key={color}
        className={`rowStyle align-items-center color-parent ${selectedColor === color ? "selected-item" : ""}`}
        onClick={() => handleColorSelect(color)}
      >
        <img src={imageUrl} alt={color} className="color-image m-1" />
        <span>{translateText(color)}</span>
      </div>
    );
  };

  const renderColorOptions = () => {
    return props.colors.map(colorItem => {
      const colorString = getColorString(colorItem); // Extracting string from color
      return renderColorOption(colorString);
    });
  };

  return <div className="selector-container">{renderColorOptions()}</div>;
};