import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    arrayUnion,
    doc,
} from "firebase/firestore";
import { db } from "./config";

export const addRecord = async (post) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), { post });
        console.log("Post added: ", docRef.id);
        return docRef;
    } catch (e) {
        console.error("Error adding post: ", e);
    }
};

export const getPosts = async () => {
    const result = [];
    const query = await getDocs(collection(db, "posts"));
    query.forEach((doc) => {
        const obj = doc.data();
        result.unshift({ id: doc.id, ...obj.post });
    });

    return result;
};

export const updateRecord = async (post, comment) => {
    try {
        await updateDoc(doc(db, "posts", post), {
            "post.comments": arrayUnion({ ...comment }),
        });
        console.log("Comment added ");
    } catch (e) {
        console.error("Error adding comment: ", e);
    }
};
