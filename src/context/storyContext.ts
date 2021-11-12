import { createContext } from "react";
import StoryModel from "../models/StoryModel";

interface StoryContextModel {
    userStories: StoryModel[];
    flipReverseFav: (id: string) => void;
    flipPrivacy: (id: string) => void;
    removeStory: (id: string) => void;
    getUserStories: () => void;
    //   getTheirStories: () => void;
}

const defaultValues: StoryContextModel = {
    userStories: [],
    flipReverseFav: () => { },
    flipPrivacy: () => { },
    removeStory: () => { },
    getUserStories: () => { },
    //   getTheirStories: () => {},
};

const StoryContext = createContext(defaultValues);

export default StoryContext;
