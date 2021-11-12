import axios from 'axios'
import StoryModel from '../models/StoryModel';

const baseURL = process.env.REACT_APP_API_URL

export const getYourStories = async (uid: string): Promise<StoryModel[]> => {
    const response = await axios.get(`${baseURL}/${encodeURIComponent(uid)}`);
    return response.data;
}

export const postNewStory = async (story: StoryModel): Promise<void> => {
    const response = await axios.post(baseURL!, story);
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