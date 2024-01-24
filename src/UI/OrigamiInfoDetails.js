import React, { useRef, useEffect } from "react";
import { Box } from "@mui/system";
import { useStateContext } from "../globalContext/StateContext.js";
import gsap from "gsap";
const OrigamiInfoDetails = ({ textInfo }) => {
    const { isLetterClicked, setIsLetterClicked } = useStateContext();
    const textRef = useRef();

    function setOpacity() {
        gsap.to(textRef.current, { opacity: 1, duration: 0.5 })

    };
    useEffect(() => {
        setOpacity()
    }, [isLetterClicked]);



    return (
        <>
            {isLetterClicked && (
                <Box sx={{
                    opacity: 0, // Set opacity to 1 for visibility
                    position: "fixed",
                    top: "50%",
                    left: "60%",
                    width: "25%",
                    height: "20%",
                    minWidth: "25%",
                    minHeight: "20%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 3,
                    // border: "1px solid white",
                    borderRadius: 0,
                    fontSize: "20px",
                    color: "white",
                    padding: "16px", // Add padding for better visibility
                }}
                    ref={textRef}>
                    {/* textInfo */}
                    Here we are cut off from the cities, the railway, the post office and all those little things that can be obtained or bought in the city... I cannot answer the telegram, although I have paid for it: there is no post office nearby.
                    <p />
                    L. Rivkin
                </Box>
            )}
        </>
    );
};

export default OrigamiInfoDetails;
