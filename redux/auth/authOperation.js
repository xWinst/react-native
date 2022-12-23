import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";
import { updateUser, setError } from "./authReducer";
import { upload } from "../../firebase/storage";

export const register =
    ({ login, email, password, foto }) =>
    async (dispatch, getState) => {
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

            dispatch(
                updateUser({
                    id: user.uid,
                    name: user.displayName,
                    photo: user.photoURL,
                    email: user.email,
                })
            );
        } catch (error) {
            dispatch(setError(["Ошибка регистрации:", error.message]));
        }
    };
export const login =
    ({ email, password }) =>
    async (dispatch, getState) => {
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            dispatch(
                updateUser({
                    id: user.uid,
                    name: user.displayName,
                    photo: user.photoURL,
                    email: user.email,
                })
            );
        } catch (error) {
            dispatch(setError(["Ошибка входа:", error.message]));
        }
    };
export const logout = () => async (dispatch, getState) => {
    try {
        await signOut(auth);
    } catch (error) {
        dispatch(setError(["Ошибка выхода:", error.message]));
    }
};

export const getUser = () => (dispatch, getState) => {
    onAuthStateChanged(auth, (user) => {
        dispatch(
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

export const errorReset = () => (dispath, getState) => {
    dispath(setError(null));
};
