import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StoryContext from "../context/storyContext";
import StoryModel from "../models/StoryModel";
import FilterForm from "./FilterForm";
import SingleStory from "./SingleStory";
import "./StoryList.css";

const StoryList = () => {
  const { userStories } = useContext(StoryContext);
  const [filteredStories, setFilteredStories] = useState<StoryModel[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter === "favorite") {
      setFilteredStories([...userStories.filter((story) => story.favorite)]);
    } else if (filter === "public") {
      setFilteredStories([...userStories.filter((story) => story.public)]);
    } else if (filter === "private") {
      setFilteredStories([...userStories.filter((story) => !story.public)]);
    } else if (filter === "old") {
      setFilteredStories([...userStories.slice().reverse()]);
    } else {
      setFilteredStories(userStories);
    }
  }, [filter, userStories]);

  return (
    <div className="StoryList">
      <div className="title-select">
        <h1 className="title">Your Stories:</h1>
        <Link to="/story-builder#top">
          <button className="make-story-btn">write a new story</button>
        </Link>
        <FilterForm setFilter={setFilter} />
      </div>
      {filteredStories.map((item, i) => (
        <SingleStory key={i} story={item} yours={true} setScroll={() => {}} />
      ))}
      <Link to="/public#top" className="public-link">
        View Public Stories
      </Link>
      {filteredStories ? (
        <>
          {filteredStories.length >= 4 && (
            <a href="#top" style={{ paddingTop: "20px", fontWeight: 700 }}>
              back to top
            </a>
          )}
        </>
      ) : (
        <p>No stories yet... get one started!</p>
      )}
    </div>
  );
};

export default StoryList;
