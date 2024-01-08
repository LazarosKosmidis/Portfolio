import { StateContext } from "./StateContext";
import { useState } from "react";

function StateProvider(props) {
    const [isLetterClicked, setIsLetterClicked] = useState(false)
    const [isLetterVisible, setIsLetterVisible] = useState(true)
    const [isCameraMoving, setIsCameraMoving] = useState(true)
    const [isNonClickable, setINonClickable] = useState(false)
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
                setINonClickable: setINonClickable,
            }}

        >
            {props.children}
        </StateContext.Provider>
    )
}

export default StateProvider