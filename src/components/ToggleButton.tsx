import "./ToggleButton.css";

interface Props {
  publicSelected: boolean;
  setPublicSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton = ({ publicSelected, setPublicSelected }: Props) => {
  return (
    <div className="ToggleButton">
      <div
        className="toggle-button"
        onClick={() => setPublicSelected((prev) => !prev)}
      >
        <div
          className={`dialog-button ${publicSelected ? "" : "disabled"}`}
        ></div>
      </div>
      <p className="privacy-selection">
        {publicSelected ? "public" : "private"}
      </p>
    </div>
  );
};

export default ToggleButton;
