import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export const upload = async (file, dir, fileName) => {
    const response = await fetch(file);
    const blob = await response.blob();
    const fileRef = ref(storage, `${dir}/${fileName}`);
    const bytes = await uploadBytes(fileRef, blob);
    const fileURL = await getDownloadURL(fileRef);

    return fileURL;
};
