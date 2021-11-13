import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import StoryContext from "../context/storyContext";
import { signInWithGoogle } from "../firebaseConfig";
import StoryModel from "../models/StoryModel";
import "./PublicStories.css";
import SingleStory from "./SingleStory";

const PublicStories = () => {
  const { publicStories } = useContext(StoryContext);
  const { user } = useContext(AuthContext);
  const yourStory = (story: StoryModel): boolean => {
    return story.uid === user?.uid;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={`PublicStories ${user ? " user" : ""}`}>
      {!user && (
        <header className="header">
          <div className="logo">logo</div>
          <button className="log-in" onClick={signInWithGoogle}>
            log in
          </button>
        </header>
      )}
      {user && (
        <Link to="/" className="back-link">
          back to your stories
        </Link>
      )}
      <h1 className={`title ${user ? "" : "padding"}`}>public stories:</h1>

      {publicStories.map((item, i) => (
        <SingleStory key={i} story={item} yours={yourStory(item)} />
      ))}
      {user && (
        <Link to="/" className="public-link">
          View Your Stories
        </Link>
      )}
      <a href="#top" style={{ paddingTop: "20px", fontWeight: 700 }}>
        back to top
      </a>
    </div>
  );
};

export default PublicStories;
