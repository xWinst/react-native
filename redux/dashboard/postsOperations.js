import { collection, onSnapshot } from "firebase/firestore";
import { addRecord, getPosts, updateRecord } from "../../firebase/firestore";
import { setPosts } from "./postsReducer";
import { setError } from "../auth/authReducer";
import { upload } from "../../firebase/storage";
import { db } from "../../firebase/config";

export const addPost =
    ({ title, image, location, id }) =>
    async (dispatch, getState) => {
        try {
            const index = getState().posts.posts.length;
            const imageURL = await upload(
                image,
                `posts/${id}`,
                `${Date.now()}.jpg`
            );
            const docRef = await addRecord({
                title,
                index,
                image: imageURL,
                location,
                user: id,
                comments: [],
            });
        } catch (error) {
            dispatch(setError(["Ошибка создания поста:", error.message]));
        }
    };

export const addComments =
    ({ postId, user, comment }) =>
    async (dispatch, getState) => {
        try {
            await updateRecord(`${postId}`, {
                user,
                comment,
            });
        } catch (error) {
            dispatch(
                setError(["Ошибка добавления комментария:", error.message])
            );
        }
    };

export const subscribePosts = () => async (dispatch, getState) => {
    const unsub = onSnapshot(collection(db, "posts"), (doc) => {
        const result = [];
        doc.docs.forEach((doc) => {
            const obj = doc.data();
            result.push({ id: doc.id, ...obj.post });
        });
        result.sort((a, b) => b.index - a.index);
        dispatch(setPosts(result));
    });
};
