import { FormEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRandomText } from "../services/deepAIService";
import spinnerGif from "../images/spinner.gif";
import "./StoryForm.css";
import { postNewStory } from "../services/storyService";
import StoryContext from "../context/storyContext";
import AuthContext from "../context/authContext";
import { dateFunc } from "../functions/dateFunc";
// import UserInput from "./UserInput";

const StoryForm = () => {
  const { user } = useContext(AuthContext);
  const { getAndSetAllThreeStates } = useContext(StoryContext);
  const [userSentence, setUserSentence] = useState<string>("");
  const [story, setStory] = useState<string>("");
  const [clear, setClear] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState("enter a title");
  const [title, setTitle] = useState<string>("");
  const [undoOne, setUndoOne] = useState<string>("");
  const [publishErrorMsg, setPublishErrorMsg] = useState<string>("");
  const [publicSelected, setPublicSelected] = useState<boolean>(false);
  const [authorSelect, setAuthor] = useState<string>();

  const addToStory = async (e: FormEvent) => {
    e.preventDefault();
    if (userSentence) {
      setLoading(true);
      let aiText = await getRandomText(userSentence);
      await setUndoOne(aiText);
      setStory([story, " ", aiText].join("").trim());
      await setUserSentence("");
      setClear(false);
      setLoading(false);
    } else {
      setErrorMsg(true);
    }
  };

  const placeholderBlur = () => {
    if (title === "") {
      setPlaceholder("enter a title");
    }
  };

  const reset = () => {
    setStory("");
    setClear(true);
    setUndoOne("");
  };

  const undo = () => {
    if (undoOne) {
      let undidStory = story.replace(undoOne, "");
      if (undidStory === "") {
        setClear(true);
        setStory(undidStory);
        setUndoOne("");
      } else {
        setStory(undidStory);
        setUndoOne("");
      }
      if (story === undidStory) {
        alert("cannot undo edited text");
      }
    }
  };

  const publishStory = async () => {
    const { fullDate, numberDate } = dateFunc();
    const newStory = {
      uid: user!.uid,
      title: title,
      date: fullDate,
      dateNum: numberDate,
      favorite: false,
      story: story,
      upvotes: 0,
      public: publicSelected,
      author: authorSelect ?? "",
      displayName: user?.displayName ?? "user didn't have display name",
      comments: [],
    };
    await postNewStory(newStory);
    await getAndSetAllThreeStates();
  };

  const addTitleMsg = () => {
    if (title && !story) {
      setPublishErrorMsg("Please add something to your story!");
    } else if (!title && story) {
      setPublishErrorMsg("Please add a title!");
    } else {
      setPublishErrorMsg("Words are required, please & thanks :-)");
    }
  };

  const titleChangeHandler = (e: string) => {
    setTitle(e);
    setPublishErrorMsg("");
  };

  const storyChangeHandler = (e: string) => {
    setStory(e);
    setPublishErrorMsg("");
    setClear(true);
  };

  const storyBlurClearHandler = () => {
    if (story) {
      setClear(false);
    }
  };

  const authorAnonSwitch = () => {
    if (authorSelect === user?.displayName) {
      setAuthor("Anonymous");
    }
    if (authorSelect === "Anonymous" && user?.displayName) {
      setAuthor(user!.displayName);
    }
  };

  useEffect(() => {
    if (user?.displayName) {
      setAuthor(user!.displayName);
    } else {
      setAuthor("Anonymous");
    }
  }, [user]);

  return (
    <div className="StoryForm">
      {loading && (
        <div className="spinner-bg">
          <img className="spinner" src={spinnerGif} alt="loading"></img>
        </div>
      )}
      <div className={`${story || clear ? "flex-row" : ""}`}>
        <Link to="/" className="back-link">
          back to your stories
        </Link>
        <h1 className={`title ${story || clear ? "sm-title" : "bg-title"}`}>
          Story Builder
        </h1>
      </div>
      <div>
        {!story && !clear && (
          <div className="flex-col">
            <form onSubmit={addToStory} className="story-form">
              <label htmlFor="firstSentence" className="label">
                Write a sentence or phrase:
              </label>
              <div className="flex-row">
                <input
                  type="text"
                  name="firstSentence"
                  id="firstSentence"
                  onFocus={() => setErrorMsg(false)}
                  onChange={(e) => {
                    setUserSentence(e.target.value);
                  }}
                  value={userSentence}
                  placeholder={errorMsg ? "please enter something!" : ""}
                  className={`${errorMsg ? "error-msg" : ""}`}
                />
                <button className="submit-btn">submit</button>
              </div>
            </form>
            <p className="instructions">
              {`Enter something and let the AI text generator finish your thoughts. Go back and forth and add as much as you'd like! Undo it's text, clear, or edit until you have a fun story to post :-)`}
            </p>
          </div>
        )}
        {clear || story ? (
          <div className="story-build-container">
            <input
              type="text"
              name="title"
              id="title"
              className={`${publishErrorMsg ? "enter-title " : ""}title-input`}
              placeholder={placeholder}
              onFocus={() => setPlaceholder("")}
              onChange={(e) => {
                titleChangeHandler(e.target.value);
              }}
              onBlur={placeholderBlur}
            />
            <div className="story-container-container">
              <label htmlFor="story" className="story-label">
                ◄ edit and add to your story ◄
              </label>
              <p
                className={`story-reset${clear ? " nada" : ""}`}
                onClick={reset}
              >
                clear {"  "}
                <i className="fas fa-trash"></i>
              </p>
              <p
                className={`story-undo${!undoOne ? " nada" : ""}`}
                onClick={undo}
              >
                undo {"  "}
                <i className="fas fa-undo-alt"></i>
              </p>
              <textarea
                className="story-container"
                name="story"
                id="story"
                rows={15}
                onChange={(e) => {
                  storyChangeHandler(e.target.value);
                }}
                onBlur={storyBlurClearHandler}
                value={story}
              ></textarea>
            </div>
            <form onSubmit={addToStory} className="story-form second-form">
              <label htmlFor="firstSentence" className="label">
                Add more:
              </label>
              <div className="flex-row">
                <input
                  type="text"
                  name="firstSentence"
                  id="firstSentence"
                  onFocus={() => setErrorMsg(false)}
                  onChange={(e) => {
                    setUserSentence(e.target.value);
                  }}
                  value={userSentence}
                  placeholder={errorMsg ? "please enter something!" : ""}
                  className={`${errorMsg ? "error-msg" : ""}`}
                />
                <button className="submit-btn">submit</button>
              </div>
            </form>
            {/* <UserInput add={addToStory} /> */}
            <div className="publish-container">
              {publishErrorMsg && (
                <div className="publish-error-msg">{publishErrorMsg}</div>
              )}
              <div className="toggle-container">
                <div
                  className="toggle-button"
                  onClick={() => setPublicSelected((prev) => !prev)}
                >
                  <div
                    className={`dialog-button ${
                      publicSelected ? "" : "disabled"
                    }`}
                  ></div>
                </div>
                <p className="privacy-selection">
                  {publicSelected ? "public" : "private"}
                </p>
              </div>
              {title && story ? (
                <Link to="/">
                  <button className="publish-button" onClick={publishStory}>
                    publish story
                  </button>
                </Link>
              ) : (
                <button className="publish-button" onClick={addTitleMsg}>
                  publish story
                </button>
              )}
            </div>
            {publicSelected && (
              <p style={{ marginTop: "10px" }} onClick={authorAnonSwitch}>
                as: {authorSelect}
              </p>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* <Dictionary /> */}
    </div>
  );
};

export default StoryForm;
