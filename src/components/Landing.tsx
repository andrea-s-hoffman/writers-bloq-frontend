import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import StoryList from "./StoryList";
import { signInWithGoogle } from "../firebaseConfig";
import AuthContext from "../context/authContext";
import WBLogo from "../images/wb-logo.png";

const Landing = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="Landing">
      {!user ? (
        <div className="landing-guest">
          <img className="logo" src={WBLogo} alt="logo" />
          <p className="description">
            {`Howdy!!! Write your next madlibs here with an AI text generator.
            Please log in tytyty`}
          </p>
          <button onClick={signInWithGoogle} className="log-in-btn">
            log in
          </button>
          <Link className="link" to="/public#top">
            or continue as guest
          </Link>
        </div>
      ) : (
        <StoryList />
      )}
    </div>
  );
};

export default Landing;
