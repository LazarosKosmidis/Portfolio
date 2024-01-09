import React, { useRef } from "react";
import { useStateContext } from "../globalContext/StateContext.js";
import { IconButton, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
const Menu = () => {
    const planeRef = useRef();
    const { isLetterClicked, setIsLetterClicked } = useStateContext();
    const { isLetterVisible, setIsLetterVisible } = useStateContext();
    const { isCameraMoving, setIsCameraMoving } = useStateContext();

    return (
        <>
            {isLetterClicked && (<Box sx={{ border: "1px solid white" }}>
                < IconButton
                    size={"large"}
                    sx={{
                        position: "fixed",
                        top: "5%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        opacity: 1, // Set opacity to 1 for visibility
                        borderRadius: 0,
                        background: "white",
                        color: "black",
                        minWidth: "fit-content",
                        zIndex: 3,
                        "&:hover": { backgroundColor: "white" },
                        marginRight: "65px",
                    }}
                    onClick={() => {
                        setIsLetterClicked(false)
                        setIsLetterVisible(true)
                        setIsCameraMoving(true)
                    }}
                >

                    <ClearIcon sx={{ fontSize: "30px" }} />
                </IconButton >

            </Box>)}
        </>

    );
};

export default Menu;


