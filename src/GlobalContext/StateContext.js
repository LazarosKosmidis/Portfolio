import { createContext, useContext } from "react";

export const StateContext = createContext({
    isLetterClicked: false,
    isLetterVisible: true,
    isCameraMoving: true,
});

export const useStateContext = () => useContext(StateContext);