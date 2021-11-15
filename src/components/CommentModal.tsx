import { useContext, useState } from "react";
import AuthContext from "../context/authContext";
import StoryContext from "../context/storyContext";
import CommentModel from "../models/CommentModel";
import CommentForm from "./CommentForm";
import "./CommentModal.css";

interface Props {
  setCommentModal: (show: boolean) => void;
  id: string;
}

const CommentModal = ({ setCommentModal, id }: Props) => {
  const { user } = useContext(AuthContext);
  const { allStories } = useContext(StoryContext);
  const [showForm, setShowForm] = useState(false);
  const { addComment } = useContext(StoryContext);
  const story = allStories.find((story) => story._id === id!);
  // const [list, setCommentList] = useState(story!.comments!);

  const commentHandler = (comment: CommentModel, id: string) => {
    addComment(comment, id);
  };

  return (
    <div className="CommentModal">
      <div className="modal">
        <i
          className="fas fa-times-circle"
          onClick={() => {
            setCommentModal(false);
          }}
        ></i>
        <ul className="comment-list">
          {story?.comments!.length ? (
            story.comments.map((comment, i) => (
              <li key={i} className="comment-item">
                <p className="comment">{`"${comment.comment}"`}</p>
                <p className="author-date">from: {comment.cm_author}</p>
                <p className="author-date">{comment.date}</p>
              </li>
            ))
          ) : (
            <li>no comments yet</li>
          )}
        </ul>
        {user ? (
          !showForm ? (
            <button className="modal-btn" onClick={() => setShowForm(true)}>
              add comment
            </button>
          ) : (
            <CommentForm
              setShowForm={setShowForm}
              id={id}
              addComment={commentHandler}
            />
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CommentModal;
