import { signInWithGoogle } from "../firebaseConfig";
import "./PublicHeader.css";

const PublicHeader = () => {
  return (
    <header className="PublicHeader">
      {" "}
      <div className="logo">logo</div>
      <button className="log-in" onClick={signInWithGoogle}>
        log in
      </button>
    </header>
  );
};

export default PublicHeader;
