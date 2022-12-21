import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";
import { updateUser } from "./authReducer";
import { upload } from "../../firebase/storage";

export const register =
    ({ login, email, password, foto }) =>
    async (dispath, getState) => {
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const avatarURL =
                foto && (await upload(foto, "avatars", `${user.uid}.jpg`));

            await updateProfile(auth.currentUser, {
                displayName: login,
                photoURL: avatarURL,
            });

            dispath(
                updateUser({
                    id: user.uid,
                    name: user.displayName,
                    photo: user.photoURL,
                    email: user.email,
                })
            );
        } catch (error) {
            console.log("error.code: ", error.code);
            console.log("error.message: ", error.message);
        }
    };
export const login =
    ({ email, password }) =>
    async (dispath, getState) => {
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            dispath(
                updateUser({
                    id: user.uid,
                    name: user.displayName,
                    photo: user.photoURL,
                    email: user.email,
                })
            );
        } catch (error) {
            console.log("error.message: ", error.message);
        }
    };
export const logout = () => async (dispath, getState) => {
    await signOut(auth);
};

export const getUser = () => (dispath, getState) => {
    onAuthStateChanged(auth, (user) => {
        dispath(
            updateUser(
                user && {
                    id: user.uid,
                    name: user.displayName,
                    photo: user.photoURL,
                    email: user.email,
                }
            )
        );
    });
};
