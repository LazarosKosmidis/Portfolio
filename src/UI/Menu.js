import React from "react";
import { useStateContext } from "../GlobalContext/StateContext.js";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const Menu = () => {
    const {
        isLetterClicked,
        setIsLetterClicked,
        setIsLetterVisible,
        setIsCameraMoving,
    } = useStateContext();

    return (
        <>
            {isLetterClicked && (
                <IconButton
                    size="large"
                    sx={{
                        position: "fixed",
                        top: "5%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",

                        width: 58,
                        height: 58,

                        borderRadius: "50%",

                        background: "rgba(20,20,20,0.55)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.18)",

                        color: "white",
                        zIndex: 3,

                        transition: "all 0.25s ease",

                        "&:hover": {
                            background: "rgba(255,255,255,0.12)",
                            border: "1px solid rgba(255,179,71,0.6)",
                            color: "#ffb347",
                            transform: "translate(-50%, -50%) scale(1.08)",
                            boxShadow: "0 0 18px rgba(255,179,71,0.35)",
                        },
                    }}
                    onClick={() => {
                        setIsLetterClicked(false);
                        setIsLetterVisible(true);
                        setIsCameraMoving(true);
                    }}
                >
                    <ClearIcon sx={{ fontSize: 32 }} />
                </IconButton>
            )}
        </>
    );
};

export default Menu;