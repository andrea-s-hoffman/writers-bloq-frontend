import CommentModel from "./CommentModel";
import UpvoteModel from "./UpvoteModel";

export default interface StoryModel {
    _id?: string;
    uid?: string;
    author?: string;
    title: string;
    date: string;
    dateNum: number;
    story: string;
    favorite: boolean;
    upvotes: UpvoteModel;
    comments?: CommentModel[];
    public: boolean;
    displayName?: string;
}