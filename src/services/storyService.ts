import axios from 'axios'
import CommentModel from '../models/CommentModel';
import StoryModel from '../models/StoryModel';

const baseURL = process.env.REACT_APP_API_URL

export const getEveryStory = async (): Promise<StoryModel[]> => {
    const response = await axios.get(`${baseURL}/`)
    return response.data;
}

export const postNewStory = async (story: StoryModel): Promise<void> => {
    const response = await axios.post(`${baseURL!}/`, story);
    return response.data;
}

export const postComment = async (comment: CommentModel, id: string): Promise<void> => {
    const response = await axios.post(`${baseURL}/comment/${id}`, comment)
    return response.data;
}

export const updateFavorite = async (id: string): Promise<void> => {
    await axios.put(`${baseURL}/fav/${encodeURIComponent(id)}`)

}
export const updatePrivacy = async (id: string): Promise<void> => {
    await axios.put(`${baseURL}/privacy/${encodeURIComponent(id)}`)

}

export const deleteStory = async (id: string): Promise<void> => {
    await axios.delete(`${baseURL}/${encodeURIComponent(id)}`)
}

export const likeStory = async (id: string, user: string): Promise<void> => {
    console.log(user);
    await axios.post(`${baseURL}/upvotes/plus-up/${encodeURIComponent(id)}`, { user })
}
export const minusLikeStory = async (id: string, user: string): Promise<void> => {
    console.log(user);
    await axios.post(`${baseURL}/upvotes/minus-up/${encodeURIComponent(id)}`, { user })
}
export const unLikeStory = async (id: string, user: string): Promise<void> => {
    await axios.post(`${baseURL}/upvotes/plus-down/${encodeURIComponent(id)}`, { user })
}
export const minusUnLikeStory = async (id: string, user: string): Promise<void> => {
    await axios.post(`${baseURL}/upvotes/minus-down/${encodeURIComponent(id)}`, { user })
}