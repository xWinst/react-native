import { addRecord, getPosts, updateRecord } from "../../firebase/firestore";
import { setPosts } from "./postsReducer";
import { upload } from "../../firebase/storage";

export const addPost =
    ({ title, image, location, id }) =>
    async (dispath, getState) => {
        const imageURL = await upload(
            image,
            `posts/${id}`,
            `${Date.now()}.jpg`
        );
        const docRef = await addRecord({
            title,
            image: imageURL,
            location,
            user: id,
            comments: [],
        });

        dispath(getAll());
    };

export const getAll = () => async (dispath, getState) => {
    const data = await getPosts();
    dispath(setPosts(data));
};

export const addComments =
    ({ postId, user, comment }) =>
    async (dispath, getState) => {
        await updateRecord(`${postId}`, {
            user,
            comment,
        });
        dispath(getAll());
    };
