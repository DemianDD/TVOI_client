import React from "react";
import "../../../styles/selector.css";
import { translateText } from "../../../services/translation.service";

interface IProps {
  colors: IColor[];
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

  const renderColorOption = (color: string, imageUrl: string) => {
    return (
      <div
        key={color}
        className={`rowStyle align-items-center color-parent ${selectedColor === color ? "selected-item" : ""}`}
        onClick={() => handleColorSelect(color)}
      >
        <img src={imageUrl} alt={color} className="color-image m-1" />
        <span>{color}</span>
      </div>
    );
  };

  const renderColorOptions = () => {
    return props.colors.map((color) => {
      let imageUrl = "";
      if (color.name === translateText("silver|A")) {
        imageUrl = SILVER;
      } else if (color.name === translateText("gold|A")) {
        imageUrl = GOLD;
      } else if (color.name === translateText("rosegold|A")) {
        imageUrl = ROSEGOLD;
      } else if (color.name === translateText("white|A")) {
        imageUrl = WHITE;
      } else if (color.name === translateText("black|A")) {
        imageUrl = BLACK;
      } else if (color.name === translateText("bluetiffany|A")) {
        imageUrl = BLUETIFFANY;
      } else if (color.name === translateText("red|A")) {
        imageUrl = RED;
      } else if (color.name === translateText("military|A")) {
        imageUrl = MILITARY;
      } else if (color.name === translateText("rose|A")) {
        imageUrl = ROSEGOLD;
      } else if (color.name === translateText("darkblue|A")) {
        imageUrl = DARKBLUE;
      }

      return renderColorOption(color.name, imageUrl);
    });
  };

  return <div className="selector-container">{renderColorOptions()}</div>;
};