import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../context/authContext";
import StoryContext from "../context/storyContext";
import StoryModel from "../models/StoryModel";
import CommentModal from "./CommentModal";
import "./Details.css";
import PublicHeader from "./PublicHeader";

interface RouteParams {
  id: string;
}

const Details = () => {
  const { id } = useParams<RouteParams>();
  const [story, setStory] = useState<StoryModel>();
  const { allStories } = useContext(StoryContext);
  const { user } = useContext(AuthContext);
  const yours = story?.uid === user?.uid;
  const [commentModal, setCommentModal] = useState(false);
  const { flipReverseFav, removeStory, flipPrivacy } = useContext(StoryContext);
  useEffect(() => {
    const storyDetail = allStories.find((story) => story._id === id);
    setStory(storyDetail);
  }, [id, allStories]);
  return (
    <div className="Details">
      {!user && <PublicHeader />}
      {story ? (
        <>
          {commentModal && (
            <CommentModal
              setCommentModal={setCommentModal}
              id={story!._id!}
              setScroll={() => {}}
            />
          )}
          <p className="back-link">
            back to:{" "}
            {user && (
              <>
                <span>
                  <Link to="/#top">your stories</Link>
                </span>{" "}
                /{" "}
              </>
            )}
            <span>
              <Link to="/public#top">public stories</Link>
            </span>
          </p>
          <div className="stats">
            <p>{story.date}</p>
            {yours && (
              <div className="public-fav">
                <div
                  className="lock-w-text"
                  onClick={() => {
                    flipPrivacy(story!._id!);
                  }}
                >
                  <i
                    className={`fas${
                      story.public ? " fa-lock-open" : " fa-lock"
                    }`}
                  ></i>
                  <p>{story.public ? "public" : "private"}</p>
                </div>
                <i
                  className={`${story.favorite ? "fas" : "far"} fa-heart`}
                  onClick={() => {
                    flipReverseFav(story!._id!);
                  }}
                ></i>
              </div>
            )}
          </div>
          <div className="author-socials">
            {story.public && <p className="author">by: {story.author}</p>}
            <div className="socials">
              <p>{`${
                story.upvotes === 1 ? "1 like" : story.upvotes + " likes"
              }`}</p>
              <p
                onClick={() => setCommentModal(true)}
                style={{ cursor: "pointer" }}
              >{`${
                story.comments?.length === 1
                  ? "1 comment"
                  : story.comments?.length + " comments"
              }`}</p>
            </div>
          </div>
          <div className="flex-story">
            <div>
              <h1 className="title">{story.title}</h1>
              <p className="story">{story.story}</p>
            </div>
          </div>
          {yours && (
            <Link to="/">
              <p className="delete" onClick={() => removeStory(story!._id!)}>
                delete
              </p>
            </Link>
          )}
        </>
      ) : (
        <div>
          <p>Story not found</p>
          <Link to="/" className="four-oh-four">
            go home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Details;
