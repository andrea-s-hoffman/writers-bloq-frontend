import { ReactNode, useContext, useEffect, useState } from "react";
import CommentModel from "../models/CommentModel";
import StoryModel from "../models/StoryModel";
import {
  deleteStory,
  getEveryStory,
  likeStory,
  postComment,
  unLikeStory,
  updateFavorite,
  updatePrivacy,
} from "../services/storyService";
import AuthContext from "./authContext";
import StoryContext from "./storyContext";

interface Props {
  children: ReactNode;
}

const StoryContextProvider = ({ children }: Props) => {
  const { user } = useContext(AuthContext);
  const [userStories, setUserStories] = useState<StoryModel[]>([]);
  const [publicStories, setPublicStories] = useState<StoryModel[]>([]);
  const [allStories, setAllStories] = useState<StoryModel[]>([]);

  const getAndSetAllThreeStates = () => {
    if (user) {
      getEveryStory().then((data) => {
        const newestFirst = data
          .filter((item) => item.uid === user.uid)
          .reverse();
        setUserStories(newestFirst);
      });
    }
    getEveryStory().then((data) => {
      setPublicStories(data.filter((item) => item.public).reverse());
    });
    getEveryStory().then((data) => setAllStories(data.reverse()));
  };

  const flipReverseFav = async (id: string): Promise<void> => {
    await updateFavorite(id);
    getAndSetAllThreeStates();
  };

  const flipPrivacy = async (id: string): Promise<void> => {
    await updatePrivacy(id);
    getAndSetAllThreeStates();
  };

  const removeStory = async (id: string): Promise<void> => {
    await deleteStory(id);
    getAndSetAllThreeStates();
  };

  const upvoteStory = async (id: string): Promise<void> => {
    await likeStory(id);
    getAndSetAllThreeStates();
  };
  const downvoteStory = async (id: string): Promise<void> => {
    await unLikeStory(id);
    getAndSetAllThreeStates();
  };
  const addComment = async (
    comment: CommentModel,
    id: string
  ): Promise<void> => {
    await postComment(comment, id);
    getAndSetAllThreeStates();
  };

  useEffect(() => {
    if (user) {
      getEveryStory().then((data) => {
        const newestFirst = data
          .filter((item) => item.uid === user.uid)
          .reverse();
        setUserStories(newestFirst);
      });
    }
    getEveryStory().then((data) => {
      setPublicStories(data.filter((item) => item.public).reverse());
    });
    getEveryStory().then((data) => setAllStories(data.reverse()));
  }, [user]);

  return (
    <StoryContext.Provider
      value={{
        userStories,
        publicStories,
        allStories,
        flipReverseFav,
        removeStory,
        getAndSetAllThreeStates,
        flipPrivacy,
        upvoteStory,
        downvoteStory,
        addComment,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export default StoryContextProvider;
