import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import StoryContext from "../context/storyContext";
import StoryModel from "../models/StoryModel";
import FilteredStories from "./FilteredStories";
import FilterForm from "./FilterForm";
import "./StoryList.css";

const StoryList = () => {
  const { userStories } = useContext(StoryContext);
  const [filter, setFilter] = useState("");

  const filterStoryList = (): StoryModel[] => {
    if (filter === "favorite") {
      return userStories.filter((story) => story.favorite);
    } else if (filter === "public") {
      return userStories.filter((story) => story.public);
    } else if (filter === "private") {
      return userStories.filter((story) => !story.public);
    } else if (filter === "old") {
      return [...userStories.slice().reverse()];
    } else {
      return userStories;
    }
  };

  return (
    <div className="StoryList">
      <div className="title-select" id="top">
        <h1 className="title">Your Stories:</h1>
        <Link to="/story-builder">
          <button className="make-story-btn">write a new story</button>
        </Link>
        <FilterForm setFilter={setFilter} />
      </div>

      <FilteredStories stories={filterStoryList()} />
      {/* <Link to="/public-stories" className="public-link">
        View Public Stories
      </Link> */}
      <a href="#top" style={{ paddingTop: "20px", fontWeight: 700 }}>
        back to top
      </a>
    </div>
  );
};

export default StoryList;
