import CommentModel from "./CommentModel";

export default interface StoryModel {
    _id?: string;
    uid?: string;
    author?: string;
    title: string;
    date: string;
    dateNum: number;
    story: string;
    favorite: boolean;
    upvotes: number;
    comments?: CommentModel[];
    public: boolean;
    displayName?: string;
}