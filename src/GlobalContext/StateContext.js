import { createContext, useContext } from "react";

export const StateContext = createContext({
    isLetterClicked: false,
    isLetterVisible: true,
    isCameraMoving: true,
    isNonClickable: false,
});

export const useStateContext = () => useContext(StateContext);