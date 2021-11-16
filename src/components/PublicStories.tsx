import { useContext, useState } from "react";
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
  const [scroll, setScroll] = useState(true);
  const yourStory = (story: StoryModel): boolean => {
    return story.uid === user?.uid;
  };

  return (
    <div
      className={`PublicStories ${user ? "user" : ""}${
        !scroll ? " hide-scroll" : ""
      }`}
    >
      <nav id="start"></nav>
      {!user && <PublicHeader />}
      {user && (
        <Link to="/" className="back-link">
          back to your stories
        </Link>
      )}
      <h1 className={`title ${user ? "" : "padding"}`}>public stories:</h1>

      {publicStories.map((item, i) => (
        <SingleStory
          key={i}
          story={item}
          yours={yourStory(item)}
          setScroll={setScroll}
        />
      ))}
      <div className="bottom-links">
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
    </div>
  );
};

export default PublicStories;
