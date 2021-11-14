import { createContext } from "react";
import CommentModel from "../models/CommentModel";
import StoryModel from "../models/StoryModel";

interface StoryContextModel {
    userStories: StoryModel[];
    publicStories: StoryModel[];
    allStories: StoryModel[];
    flipReverseFav: (id: string) => void;
    flipPrivacy: (id: string) => void;
    removeStory: (id: string) => void;
    getAndSetAllThreeStates: () => void;
    upvoteStory: (id: string) => void;
    downvoteStory: (id: string) => void;
    addComment: (comment: CommentModel, id: string) => void;
}

const defaultValues: StoryContextModel = {
    userStories: [],
    publicStories: [],
    allStories: [],
    flipReverseFav: () => { },
    flipPrivacy: () => { },
    removeStory: () => { },
    getAndSetAllThreeStates: () => { },
    upvoteStory: () => { },
    downvoteStory: () => { },
    addComment: () => { },
};

const StoryContext = createContext(defaultValues);

export default StoryContext;
