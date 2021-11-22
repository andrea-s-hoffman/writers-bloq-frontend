import { signInWithGoogle } from "../firebaseConfig";
import WBLogo from "../images/wb-logo.png";
import "./PublicHeader.css";

const PublicHeader = () => {
  return (
    <header className="PublicHeader">
      {" "}
      <img src={WBLogo} alt="logo" className="logo" />
      <button className="log-in" onClick={signInWithGoogle}>
        log in
      </button>
    </header>
  );
};

export default PublicHeader;
