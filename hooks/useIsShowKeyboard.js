import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

const useIsShowBoard = () => {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setIsShowKeyboard(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setIsShowKeyboard(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return isShowKeyboard;
};

export default useIsShowBoard;
