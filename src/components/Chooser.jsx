import { colorScheme } from "../constants/colorScheme";
import { useOutsideClick } from "../hooks/useOutsideClick";
import "./Chooser.css";

export const Chooser = ({
  position,
  addColor,
  onOutsideClick,
  deleteDayColors,
}) => {
  const ref = useOutsideClick(onOutsideClick);

  const colorClick = (colIndex) => {
    addColor(colIndex);
  };

  const colorBlock = (colIndex) => {
    return (
      <div
        className="chooser-item"
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
        <div>
          <i className="chooser-item bx bx-trash" onClick={deleteDayColors}></i>
        </div>
      </div>
    </div>
  );
};
