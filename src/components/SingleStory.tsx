import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import StoryContext from "../context/storyContext";
import StoryModel from "../models/StoryModel";
import CommentModal from "./CommentModal";
import "./SingleStory.css";

interface Props {
  story: StoryModel;
  yours: boolean;
}

const SingleStory = ({ story, yours }: Props) => {
  const {
    flipReverseFav,
    removeStory,
    flipPrivacy,
    upvoteStory,
    downvoteStory,
  } = useContext(StoryContext);
  const initialLikes: number = story.upvotes;
  const [likes, setLikes] = useState(story.upvotes);
  const [commentModal, setCommentModal] = useState(false);
  const commentMessage: string =
    story.comments?.length === 1
      ? "1 comment"
      : `${story.comments?.length} comments`;

  const highlight = story.story.substring(0, 300).split(" ");
  highlight.pop();

  const like = () => {
    if (likes < initialLikes + 1) {
      upvoteStory(story._id!);
      setLikes((prev) => prev + 1);
    }
  };

  const unLike = () => {
    if (likes > initialLikes - 1) {
      downvoteStory(story._id!);
      setLikes((prev) => prev - 1);
    }
  };

  return (
    <div className="SingleStory">
      {commentModal && (
        <CommentModal setCommentModal={setCommentModal} id={story!._id!} />
      )}

      <div className="title-fav">
        <Link to={`/story/${story._id}`} className="title-name">
          <h2 className="story-title">{story.title}</h2>
          {!yours && <p className="display-name">{`by: ${story.author}`}</p>}
        </Link>
        {yours && (
          <div className="fav" onClick={() => flipReverseFav(story._id!)}>
            <i className={`${story.favorite ? "fas" : "far"} fa-heart`}></i>
          </div>
        )}
      </div>
      <Link to={`/story/${story._id}`}>
        <p className="highlight">{`${highlight.join(" ")}...`}</p>
      </Link>
      <div className="stats">
        <p className="date">{story.date}</p>
        {yours ? (
          <div className="stats-actions">
            <p
              className="public-private"
              onClick={() => flipPrivacy(story._id!)}
            >
              {story.public ? "make private" : "make public"}
            </p>
            <p className="delete" onClick={() => removeStory(story._id!)}>
              delete
            </p>
          </div>
        ) : (
          <div className="socials">
            <p className="likes">
              <i
                className={`fas fa-caret-square-down ${
                  likes < initialLikes ? "down" : ""
                }`}
                onClick={unLike}
              ></i>
              <span
                className={`likes-num ${
                  likes > initialLikes
                    ? "up"
                    : likes < initialLikes
                    ? "down"
                    : ""
                }`}
              >
                {likes}
              </span>
              <i
                className={`fas fa-caret-square-up ${
                  likes > initialLikes ? "up" : ""
                }`}
                onClick={like}
              ></i>
            </p>
            <p className="comments" onClick={() => setCommentModal(true)}>
              {commentMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleStory;
