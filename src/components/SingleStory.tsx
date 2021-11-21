import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import StoryContext from "../context/storyContext";
import StoryModel from "../models/StoryModel";
import CommentModal from "./CommentModal";
import "./SingleStory.css";

interface Props {
  story: StoryModel;
  yours: boolean;
  setScroll: (b: boolean) => void;
}

const SingleStory = ({ story, yours, setScroll }: Props) => {
  const {
    flipReverseFav,
    removeStory,
    flipPrivacy,
    upvoteStory,
    downvoteStory,
    pullUpvoteStory,
    pullDownvoteStory,
  } = useContext(StoryContext);
  const { user } = useContext(AuthContext);
  const [commentModal, setCommentModal] = useState(false);
  const userHasLiked: boolean = story.upvotes.up.some(
    (like) => like === user?.uid!
  );
  const userHasDisliked: boolean = story.upvotes.down.some(
    (like) => like === user?.uid!
  );
  const commentMessage: string =
    story.comments?.length === 1
      ? "1 comment"
      : `${story.comments?.length} comments`;

  const highlight = story.story.substring(0, 300).split(" ");
  highlight.pop();

  const like = () => {
    if (
      !story.upvotes.up.some((like) => like === user?.uid!) &&
      !story.upvotes.down.some((like) => like === user?.uid!)
    ) {
      upvoteStory(story._id!, user?.uid!);
    } else if (
      !story.upvotes.up.some((like) => like === user?.uid!) &&
      story.upvotes.down.some((like) => like === user?.uid!)
    ) {
      pullDownvoteStory(story._id!, user?.uid!);
    }
  };

  const unLike = () => {
    if (
      !story.upvotes.up.some((like) => like === user?.uid!) &&
      !story.upvotes.down.some((like) => like === user?.uid!)
    ) {
      downvoteStory(story._id!, user?.uid!);
    } else if (
      story.upvotes.up.some((like) => like === user?.uid!) &&
      !story.upvotes.down.some((like) => like === user?.uid!)
    ) {
      pullUpvoteStory(story._id!, user?.uid!);
    }
  };

  const openModal = () => {
    setScroll(false);
    setCommentModal(true);
  };

  return (
    <div className="SingleStory">
      {commentModal && (
        <CommentModal
          setCommentModal={setCommentModal}
          id={story!._id!}
          setScroll={setScroll}
        />
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
            {user && !yours && (
              <p className="likes">
                <i
                  className={`fas fa-caret-square-down ${
                    userHasDisliked ? "down" : ""
                  }`}
                  onClick={unLike}
                ></i>
                <span className="likes-num">
                  {story?.upvotes.up.length - story?.upvotes.down.length}
                </span>
                <i
                  className={`fas fa-caret-square-up ${
                    userHasLiked ? "up" : ""
                  }`}
                  onClick={like}
                ></i>
              </p>
            )}
            <p className="comments" onClick={openModal}>
              {commentMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleStory;
