import { FormEvent, useContext, useState } from "react";
import AuthContext from "../context/authContext";
import { dateFunc } from "../functions/dateFunc";
import CommentModel from "../models/CommentModel";
import "./CommentForm.css";

interface Props {
  setShowForm: (show: boolean) => void;
  id: string;
  addComment: (comment: CommentModel, id: string) => void;
}
const CommentForm = ({ setShowForm, id, addComment }: Props) => {
  const { user } = useContext(AuthContext);
  const [author, setAuthor] = useState<string>(user!.displayName!);
  const [comment, setComment] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    const newComment: CommentModel = {
      cm_author: author,
      cm_displayName: user!.displayName!,
      comment,
      date: dateFunc().fullDate,
    };
    if (comment && author) {
      addComment(newComment, id);
    }
  };
  return (
    <form className="CommentForm" onSubmit={submitHandler} action="post">
      <label htmlFor="author">name</label>
      <input
        type="text"
        name="author"
        id="author"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />
      <label htmlFor="comment">comment</label>
      <input
        type="text"
        name="comment"
        id="comment"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button>add</button>
    </form>
  );
};

export default CommentForm;
