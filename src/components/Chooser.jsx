import { colorScheme } from "../constants/colorScheme";
import "./Chooser.css";

export const Chooser = ({ position, addColor, ref }) => {
  const colorClick = (colIndex) => {
    addColor(colIndex);
  };

  const colorBlock = (colIndex) => {
    return (
      <div
        className="color"
        onClick={() => colorClick(colIndex)}
        style={{ backgroundColor: colorScheme[colIndex] }}
      ></div>
    );
  };

  return (
    <div
      className="chooser"
      ref={ref}
      style={{ top: position.y, left: position.x }}
    >
      <div>
        <div>
          {colorBlock(0)}
          {colorBlock(1)}
          {colorBlock(2)}
        </div>
        <div>
          {colorBlock(3)}
          {colorBlock(4)}
          {colorBlock(5)}
        </div>
      </div>
    </div>
  );
};
