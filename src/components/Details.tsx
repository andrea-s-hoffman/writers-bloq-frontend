import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StoryContext from "../context/storyContext";
import StoryModel from "../models/StoryModel";
import "./Details.css";

interface RouteParams {
  id: string;
}

const Details = () => {
  const { id } = useParams<RouteParams>();
  const [story, setStory] = useState<StoryModel>();
  const { userStories } = useContext(StoryContext);
  const { flipReverseFav, removeStory, flipPrivacy } = useContext(StoryContext);
  useEffect(() => {
    const storyDetail = userStories.find((story) => story._id === id);
    setStory(storyDetail);
  }, [id, userStories]);
  return (
    <div className="Details">
      <Link to="/" className="back-link">
        back to all stories
      </Link>
      <div className="stats">
        <p>{story?.date}</p>
        <div className="public-fav">
          <div
            className="lock-w-text"
            onClick={() => {
              flipPrivacy(story!._id!);
            }}
          >
            <i
              className={`fas${story?.public ? " fa-lock-open" : " fa-lock"}`}
            ></i>
            <p>{story?.public ? "public" : "private"}</p>
          </div>
          <i
            className={`${story?.favorite ? "fas" : "far"} fa-heart`}
            onClick={() => {
              flipReverseFav(story!._id!);
            }}
          ></i>
        </div>
      </div>
      {story?.public && <p className="author">by: {story?.author}</p>}
      <h1 className="title">{story?.title}</h1>
      <p className="story">{story?.story}</p>
      <Link to="/">
        <p className="delete" onClick={() => removeStory(story!._id!)}>
          delete
        </p>
      </Link>
    </div>
  );
};

export default Details;
