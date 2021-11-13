import { createContext } from "react";
import StoryModel from "../models/StoryModel";

interface StoryContextModel {
    userStories: StoryModel[];
    publicStories: StoryModel[];
    allStories: StoryModel[];
    flipReverseFav: (id: string) => void;
    flipPrivacy: (id: string) => void;
    removeStory: (id: string) => void;
    getUserStories: () => void;
}

const defaultValues: StoryContextModel = {
    userStories: [],
    publicStories: [],
    allStories: [],
    flipReverseFav: () => { },
    flipPrivacy: () => { },
    removeStory: () => { },
    getUserStories: () => { },
};

const StoryContext = createContext(defaultValues);

export default StoryContext;
