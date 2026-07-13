import { StateContext } from "./StateContext";
import { useState } from "react";

function StateProvider(props) {
    const [isLetterClicked, setIsLetterClicked] = useState(false)
    const [isLetterVisible, setIsLetterVisible] = useState(true)
    const [isCameraMoving, setIsCameraMoving] = useState(true)
    const [isNonClickable, setIsNonClickable] = useState(false)
    const [origamiIndex, setOrigamiIndex] = useState(null)
    return (
        <StateContext.Provider
            value={{
                isLetterClicked: isLetterClicked,
                setIsLetterClicked: setIsLetterClicked,
                isLetterVisible: isLetterVisible,
                setIsLetterVisible: setIsLetterVisible,
                isCameraMoving: isCameraMoving,
                setIsCameraMoving: setIsCameraMoving,
                isNonClickable: isNonClickable,
                setIsNonClickable: setIsNonClickable,
                origamiIndex: origamiIndex,
                setOrigamiIndex: setOrigamiIndex,
            }}

        >
            {props.children}
        </StateContext.Provider>
    )
}

export default StateProvider