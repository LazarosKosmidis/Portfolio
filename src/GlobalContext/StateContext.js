import { createContext, useContext } from "react";

export const StateContext = createContext({
    isLetterClicked: false,
    isLetterVisible: true,
    isCameraMoving: true,
    isNonClickable: false,
    origamiIndex: null,
});

export const useStateContext = () => useContext(StateContext);