import { ReactNode, useContext, useEffect, useState } from "react";
import StoryModel from "../models/StoryModel";
import {
  deleteStory,
  getEveryStory,
  getPublicStories,
  getYourStories,
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

  const getUserStories = () => {
    getYourStories(user!.uid).then((data) => {
      const newestFirst = data.reverse();
      setUserStories(newestFirst);
    });
  };

  const flipReverseFav = async (id: string): Promise<void> => {
    await updateFavorite(id);
    getUserStories();
  };

  const flipPrivacy = async (id: string): Promise<void> => {
    await updatePrivacy(id);
    getUserStories();
  };

  const removeStory = async (id: string): Promise<void> => {
    await deleteStory(id);
    getUserStories();
  };

  useEffect(() => {
    if (user) {
      getYourStories(user!.uid).then((data) => {
        const newestFirst = data.reverse();
        setUserStories(newestFirst);
      });
    }
    getPublicStories().then((data) => {
      setPublicStories(data);
    });
    getEveryStory().then((data) => setAllStories(data));
  }, [user]);

  return (
    <StoryContext.Provider
      value={{
        userStories,
        publicStories,
        allStories,
        flipReverseFav,
        removeStory,
        getUserStories,
        flipPrivacy,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export default StoryContextProvider;
