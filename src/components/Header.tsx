// import { useContext } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { signOut } from "../firebaseConfig";
import WBLogo from "../images/wb-logo.png";
import "./Header.css";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="Header">
      <div>
        {user?.photoURL ? (
          <Link to="/">
            <div className="user-photo-star">
              <svg
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 90 112.5"
                xmlSpace="preserve"
                className="star-path-left"
              >
                <path d="M26.2,76.9c-0.6,0-1.2-0.2-1.7-0.6c-1.1-0.8-1.5-2.2-1-3.5l8.7-20.6L13,40.7c-1.2-0.7-1.7-2.1-1.3-3.4  c0.4-1.3,1.7-2.1,3-2l22.3,1.9l5.1-21.8c0.3-1.4,1.5-2.3,2.9-2.3c0,0,0,0,0,0c1.4,0,2.5,0.9,2.9,2.3l5.1,21.8l22.3-1.9  c1.4-0.1,2.6,0.7,3,2c0.4,1.3-0.1,2.7-1.3,3.4L57.8,52.2l8.7,20.6c0.5,1.3,0.1,2.7-1,3.5c-1.1,0.8-2.6,0.8-3.6-0.2L45,61.5  L28.1,76.2C27.5,76.7,26.8,76.9,26.2,76.9z M14.5,37.2c-0.6,0-0.8,0.5-0.9,0.6C13.6,38,13.5,38.6,14,39l20.6,12.5l-9.4,22.2  c-0.3,0.6,0.2,1,0.3,1.1c0.1,0.1,0.6,0.4,1.2,0L45,58.9l18.2,15.8c0.5,0.5,1,0.2,1.2,0c0.1-0.1,0.6-0.5,0.3-1.1l-9.4-22.2L76,39  c0.6-0.4,0.5-0.9,0.4-1.1s-0.3-0.7-1-0.6l-24,2.1l-5.5-23.5c-0.2-0.7-0.7-0.7-0.9-0.7l0,0c-0.2,0-0.8,0.1-0.9,0.7l-5.5,23.5l-24-2.1  C14.6,37.2,14.5,37.2,14.5,37.2z" />
              </svg>
              <img src={user?.photoURL} alt="user" className="user-photo" />
            </div>
          </Link>
        ) : (
          <img src={WBLogo} alt="logo" className="logo" />
        )}
      </div>
      <div className="sign-in-out-star">
        <svg
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 90 112.5"
          xmlSpace="preserve"
          className="star-path-right"
        >
          <path d="M26.2,76.9c-0.6,0-1.2-0.2-1.7-0.6c-1.1-0.8-1.5-2.2-1-3.5l8.7-20.6L13,40.7c-1.2-0.7-1.7-2.1-1.3-3.4  c0.4-1.3,1.7-2.1,3-2l22.3,1.9l5.1-21.8c0.3-1.4,1.5-2.3,2.9-2.3c0,0,0,0,0,0c1.4,0,2.5,0.9,2.9,2.3l5.1,21.8l22.3-1.9  c1.4-0.1,2.6,0.7,3,2c0.4,1.3-0.1,2.7-1.3,3.4L57.8,52.2l8.7,20.6c0.5,1.3,0.1,2.7-1,3.5c-1.1,0.8-2.6,0.8-3.6-0.2L45,61.5  L28.1,76.2C27.5,76.7,26.8,76.9,26.2,76.9z M14.5,37.2c-0.6,0-0.8,0.5-0.9,0.6C13.6,38,13.5,38.6,14,39l20.6,12.5l-9.4,22.2  c-0.3,0.6,0.2,1,0.3,1.1c0.1,0.1,0.6,0.4,1.2,0L45,58.9l18.2,15.8c0.5,0.5,1,0.2,1.2,0c0.1-0.1,0.6-0.5,0.3-1.1l-9.4-22.2L76,39  c0.6-0.4,0.5-0.9,0.4-1.1s-0.3-0.7-1-0.6l-24,2.1l-5.5-23.5c-0.2-0.7-0.7-0.7-0.9-0.7l0,0c-0.2,0-0.8,0.1-0.9,0.7l-5.5,23.5l-24-2.1  C14.6,37.2,14.5,37.2,14.5,37.2z" />
        </svg>
        <Link to="/">
          <button className="user-log-button" onClick={signOut}>
            Sign out
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
