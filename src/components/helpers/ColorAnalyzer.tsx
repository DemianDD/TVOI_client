import React, { useRef, useState, useEffect } from "react";

interface ColorAnalyzerProps {
  imagePath: string;
  buttonText: string;
}

const ColorAnalyzer: React.FC<ColorAnalyzerProps> = ({ imagePath, buttonText }) => {
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const imgElement = document.createElement("img");
    imgElement.src = imagePath;

    imgElement.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;

        ctx.drawImage(imgElement, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let totalRed = 0;
        let totalGreen = 0;
        let totalBlue = 0;

        for (let i = 0; i < data.length; i += 4) {
          totalRed += data[i];
          totalGreen += data[i + 1];
          totalBlue += data[i + 2];
        }

        const avgRed = Math.floor(totalRed / (data.length / 4));
        const avgGreen = Math.floor(totalGreen / (data.length / 4));
        const avgBlue = Math.floor(totalBlue / (data.length / 4));

        const hexColor =
          "#" + componentToHex(avgRed) + componentToHex(avgGreen) + componentToHex(avgBlue);

        setBackgroundColor(hexColor);
      }
    };
  }, [imagePath]);

  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return (
    <div>
      <button
        className="btnHomeStyleWhite"
        ref={buttonRef}
        style={{ backgroundColor: backgroundColor || undefined }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ColorAnalyzer;