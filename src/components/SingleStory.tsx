import { useContext } from "react";
import { Link } from "react-router-dom";
import StoryContext from "../context/storyContext";
import StoryModel from "../models/StoryModel";
import "./SingleStory.css";

interface Props {
  story: StoryModel;
}

const SingleStory = ({ story }: Props) => {
  const { flipReverseFav, removeStory, flipPrivacy } = useContext(StoryContext);

  const highlight = story.story.substring(0, 300).split(" ");
  highlight.pop();

  return (
    <div className="SingleStory">
      <div className="title-fav">
        <Link to={`/story/${story._id}`}>
          <h2 className="story-title">{story.title}</h2>
        </Link>
        <div className="fav" onClick={() => flipReverseFav(story._id!)}>
          <i className={`${story.favorite ? "fas" : "far"} fa-heart`}></i>
        </div>
      </div>
      <Link to={`/story/${story._id}`}>
        <p className="highlight">{`${highlight.join(" ")}...`}</p>
      </Link>
      <div className="stats">
        <p className="date">{story.date}</p>
        <div className="stats-actions">
          <p className="public-private" onClick={() => flipPrivacy(story._id!)}>
            {story.public ? "make private" : "make public"}
          </p>
          <p className="delete" onClick={() => removeStory(story._id!)}>
            delete
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleStory;
