import { StateContext } from "./StateContext";
import { useState } from "react";

function StateProvider(props) {
    const [isLetterClicked, setIsLetterClicked] = useState(false)
    const [isLetterVisible, setIsLetterVisible] = useState(true)
    const [isCameraMoving, setIsCameraMoving] = useState(true)
    return (
        <StateContext.Provider
            value={{
                isLetterClicked: isLetterClicked,
                setIsLetterClicked: setIsLetterClicked,
                isLetterVisible: isLetterVisible,
                setIsLetterVisible: setIsLetterVisible,
                isCameraMoving: isCameraMoving,
                setIsCameraMoving: setIsCameraMoving,
            }}

        >
            {props.children}
        </StateContext.Provider>
    )
}

export default StateProvider