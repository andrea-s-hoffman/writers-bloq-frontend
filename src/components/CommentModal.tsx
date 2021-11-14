import { useContext, useState } from "react";
import AuthContext from "../context/authContext";
import StoryContext from "../context/storyContext";
import CommentModel from "../models/CommentModel";
import CommentForm from "./CommentForm";
import "./CommentModal.css";

interface Props {
  comments: CommentModel[];
  setCommentModal: (show: boolean) => void;
  setCommentArray: () => void;
  id: string;
}

const CommentModal = ({
  comments,
  setCommentModal,
  id,
  setCommentArray,
}: Props) => {
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const { addComment } = useContext(StoryContext);

  const commentHandler = (comment: CommentModel, id: string) => {
    setCommentArray();
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
          {comments.length ? (
            comments.map((comment, i) => (
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
