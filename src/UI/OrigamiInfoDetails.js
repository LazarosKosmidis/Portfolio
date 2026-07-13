import React, { useRef, useEffect } from "react";
import { Box } from "@mui/system";
import { useStateContext } from "../GlobalContext/StateContext.js";
import gsap from "gsap";

const OrigamiInfoDetails = () => {
    const { isLetterClicked, origamiIndex } = useStateContext();
    const textRef = useRef();

    const pages = [
        {
            title: "LinkedIn",
            subtitle: "Professional Profile",

            description1:
                "Explore my LinkedIn profile to learn more about my professional experience, education, technical skills, and certifications.",

            description2:
                "Connect with me to follow my latest projects, career updates, and software engineering journey.",

            quote: "Let's connect and grow together.",


            button1: "🔗 Open LinkedIn",
            button2: null,
        },

        {
            title: "Resume",
            subtitle: "Software Engineer",

            description1:
                "This resume presents my education, technical skills, professional experience, and software engineering projects.",

            description2:
                "It offers an overview of the technologies I work with, the applications I've built, and my journey as a Computer Science graduate pursuing a career in software engineering.",

            quote: "Always learning. Always building.",

            skills: "React • Three.js • C# • Java • Python",

            button1: "📄 Open Resume",
            
        },

        {
            title: "GitHub",
            subtitle: "Projects & Source Code",

            description1:
                "Browse my GitHub repositories, where I share personal projects, university work, and software engineering experiments.",

            description2:
                "Most of my work focuses on React, Three.js, JavaScript, C#, Java, and interactive web applications built with modern technologies.",

            quote: "Code. Learn. Improve.",


            button1: "🌐 Visit GitHub",
            button2: null,
        },
    ];

    const page = pages[origamiIndex];

    const handlePrimaryAction = () => {
        switch (origamiIndex) {
            case 0:
                window.open(
                    "https://www.linkedin.com/in/lazaroskosmidis/",
                    "_blank"
                );
                break;

            case 1:
                window.open("/textures/LAZAROS_KOSMIDIS_CV.pdf", "_blank");
                break;

            case 2:
                window.open(
                    "https://github.com/LazarosKosmidis",
                    "_blank"
                );
                break;

            default:
                break;
        }
    };

    const handleDownloadResume = () => {
        const link = document.createElement("a");
        link.href = "/textures/LAZAROS_KOSMIDIS_CV.pdf";
        link.download = "LAZAROS_KOSMIDIS_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        if (isLetterClicked) {
            gsap.fromTo(
                textRef.current,
                { opacity: 0, x: 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                }
            );
        }
    }, [isLetterClicked, origamiIndex]);

    return (
        <>
            {isLetterClicked && (
                <Box
                    ref={textRef}
                    sx={{
                        opacity: 0,
                        position: "fixed",
                        top: "50%",
                        left: "63%",
                        transform: "translate(-50%, -50%)",
                        width: "30%",
                        minWidth: "420px",
                        color: "white",
                        zIndex: 3,
                        padding: "24px",
                    }}
                >
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "42px",
                            fontWeight: 600,
                        }}
                    >
                        {page.title}
                    </h1>

                    <h2
                        style={{
                            marginTop: "22px",
                            marginBottom: "6px",
                            fontSize: "28px",
                            fontWeight: 500,
                        }}
                    >
                        Lazaros Kosmidis
                    </h2>

                    <p
                        style={{
                            marginTop: 0,
                            color: "#cfcfcf",
                            fontSize: "20px",
                        }}
                    >
                        {page.subtitle}
                    </p>

                    <hr
                        style={{
                            border: "0.5px solid rgba(255,255,255,0.25)",
                            margin: "25px 0",
                        }}
                    />

                    <p
                        style={{
                            fontSize: "18px",
                            lineHeight: 1.8,
                            color: "#e8e8e8",
                        }}
                    >
                        {page.description1}
                        <br />
                        <br />
                        {page.description2}
                    </p>

                    <p
                        style={{
                            marginTop: "30px",
                            marginBottom: "10px",
                            fontSize: "18px",
                            fontStyle: "italic",
                            color: "#d6d6d6",
                        }}
                    >
                        {page.quote}
                    </p>

                    <p
                        style={{
                            margin: 0,
                            fontSize: "17px",
                            color: "#cfcfcf",
                            lineHeight: 1.8,
                        }}
                    >
                        {page.skills}
                    </p>

                    <Box
                        sx={{
                            marginTop: "35px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "18px",
                            fontSize: "25px",
                        }}
                    >
                        <Box
                            onClick={handlePrimaryAction}
                            sx={{
                                cursor: "pointer",
                                width: "fit-content",
                                transition: "0.2s",
                                userSelect: "none",
                                "&:hover": {
                                    color: "#ffb347",
                                    transform: "translateX(6px)",
                                },
                            }}
                        >
                            {page.button1}
                        </Box>

                        {page.button2 && (
                            <Box
                                onClick={handleDownloadResume}
                                sx={{
                                    cursor: "pointer",
                                    width: "fit-content",
                                    transition: "0.2s",
                                    userSelect: "none",
                                    "&:hover": {
                                        color: "#ffb347",
                                        transform: "translateX(6px)",
                                    },
                                }}
                            >
                                {page.button2}
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </>
    );
};

export default OrigamiInfoDetails;