import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import StoryContext from "../context/storyContext";
import StoryModel from "../models/StoryModel";
import PublicHeader from "./PublicHeader";
import "./PublicStories.css";
import SingleStory from "./SingleStory";

const PublicStories = () => {
  const { publicStories } = useContext(StoryContext);
  const { user } = useContext(AuthContext);
  const yourStory = (story: StoryModel): boolean => {
    return story.uid === user?.uid;
  };

  return (
    <div className={`PublicStories ${user ? " user" : ""}`} id="public">
      {!user && <PublicHeader />}
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
        <Link to="/#top" className="public-link">
          View Your Stories
        </Link>
      )}
      {publicStories.length >= 4 && (
        <a href="#top" style={{ paddingTop: "20px", fontWeight: 700 }}>
          back to top
        </a>
      )}
    </div>
  );
};

export default PublicStories;
