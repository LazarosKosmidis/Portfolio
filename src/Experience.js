import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from '@react-three/drei'; // Import OrbitControls and Stars for camera control and background stars
import gsap from "gsap";

// import { OrbitControls, Stars, Sky } from '@react-three/drei'; // Import OrbitControls and Stars for camera control and background stars
import * as THREE from "three";
import Origami from "./OrigamiLetter/Origami";
import OrigamiPlane from "./OrigamiLetter/OrigamiPlane"
import Camera from "./Camera";
import { useStateContext } from "./GlobalContext/StateContext";
import Menu from "./UI/Menu";
import NonClickable from "./OrigamiLetter/NonClickable";
import OrigamiInfoDetails from "./UI/OrigamiInfoDetails";
function Experience() {
    const { isLetterClicked } = useStateContext();
    const { isNonClickable } = useStateContext();
    const { isLetterVisible } = useStateContext();
    const enterRef = useRef(null);
    const origamiTextures = [
        "/textures/linkdin_logo.png",
        "/textures/resume_logo.png",
        "/textures/github_logo.png",
    ];
    const origamiLabels = [
        "LinkedIn",
        "Resume",
        "GitHub",
    ];
    const [cameraPosition, setCameraPosition] = useState([-20, 0, 7]);
    const [isRotationOrigami, setIsRotationOrigami] = useState([0, 0, 0])
    const { origamiIndex } = useStateContext()
    const texturePaths = [
        "/textures/linkdin_preview.png",
        "/textures/resume.png",
        "/textures/github_preview_1200x2100.png",
        
    ]
    // const [isPositionOrigami, setIsPositionOrigami] = useState();
    // const [isPositionOrigami1, setIsPositionOrigami1] = useState([-2, 2.5, 0]);
    // const [isPositionOrigami2, setIsPositionOrigami2] = useState([-1.5, -1.5, 0]);
    const positionOrigamies = [
        [-4, -2.5, 1, 0],
        [-1, 1.5, 1, 1],
        [2, -2.5, 1, 2],
    ];
    

    const enterPortfolio = () => {
        gsap.to(enterRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power2.out",
            onComplete: () => {
                enterRef.current.style.display = "none";
            },
        });

        const camera = {
            x: cameraPosition[0],
            y: cameraPosition[1],
            z: cameraPosition[2],
        };

        gsap.to(camera, {
            x: 0,
            duration: 5,
            ease: "power2.inOut",
            onUpdate: () => {
                setCameraPosition([camera.x, camera.y, camera.z]);
            },
        });
    };
    
    useEffect(() => {
    setIsRotationOrigami([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);
}, []);
    
    

    const touchStart = useRef(new THREE.Vector2())
    // Event handler for mouse wheel
    

    useEffect(() => {
        // Add touch screen swipe event listeners
        const canvas = document.querySelector("canvas");
        canvas.addEventListener("touchstart", (e) => handleTouchStart(e));
        canvas.addEventListener("touchmove", (e) => handleTouchMove(e));
        return () => {
            canvas.removeEventListener("touchstart", (e) => handleTouchStart(e));
            canvas.removeEventListener("touchmove", (e) => handleTouchMove(e));
        };
        //eslint-disable-next-line
    }, []);

    const handleTouchStart = useCallback((event) => {
        touchStart.current.set(event.touches[0].clientX, event.touches[0].clientY);
    }, []);


    const handleTouchMove = useCallback(
        (event) => {
            const touchEnd = new THREE.Vector2(event.touches[0].clientX, event.touches[0].clientY);
            const delta = touchEnd.clone().sub(touchStart.current);
            touchStart.current.copy(touchEnd);
            const sensitivity = cameraPosition[1] - delta.y > 10 || cameraPosition[1] - delta.y < -10 ? 0 : 0.02;
            let newPosition = (cameraPosition[1] -= delta.y * sensitivity);
            setCameraPosition([cameraPosition[0], newPosition, cameraPosition[2]]);
        },
        // eslint-disable-next-line
        [cameraPosition]
    );

    return (
        <div>
            <Canvas
                frameloop="always"
                style={{
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    background: "black",
                }}
                camera={{
                    position: [-20, 0, 7],
                    rotation: [0, THREE.MathUtils.degToRad(0), 0],
                    fov: 75,
                    aspect: window.innerWidth / window.innerHeight,
                    near: 0.1,
                    far: 1000,
                }}

                // onWheel={moveCamera}
                gl={{
                    antialias: true,
                    toneMapping: THREE.LinearToneMapping,
                    outputColorSpace: THREE.LinearSRGBColorSpace,
                }}
                dpr={2}
            >
                {/* Add a light source */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                {isLetterClicked && (<Origami texturePaths={texturePaths[origamiIndex]} />)}

                {isLetterVisible &&
                    positionOrigamies.map((_, index) => (
                        <OrigamiPlane
                            key={index}
                            label={origamiLabels[index]}
                            positionOrigami={positionOrigamies[index]}
                            rotationOrigami={isRotationOrigami[index]}
                            texturePath={origamiTextures[index]}
                        />
                    ))}

                {/* {isLetterVisible && (<OrigamiPlane positionOrigami={positionOrigamies[0]} rotationOrigami={isRotationOrigami} />)} */}
                <Camera cameraPosition={cameraPosition} />
                {/* Add camera controls */}
                {/* <OrbitControls /> */}
                {/* <Sky distance={450000} sunPosition={[10, -0.1, 0]} inclination={0} azimuth={0.5} />
                < Stars
                    saturation={0}
                    factor={4}
                /> */}
                <Sparkles
                    count={2000}
                    dpr={1}
                    color={"orange"}
                    speed={1}
                    scale={[60, 20, 10]}
                    size={3}
                    noise={0.3}
                />
                {/* Add background stars */}
                {/* HELPERS */}
                {/* <axesHelper args={[50]} position={[0, 0, 0]} /> */}
                
            </Canvas>
            <div className="enter-container"
                ref={enterRef}    
            >
                <p className="enter-text">Click to begin</p>
                <button
                    className="enter-btn"
                    onClick={enterPortfolio}
                    style={{
                        position: "fixed",
                        left: "50%",
                        bottom: "60px",
                        transform: "translateX(-50%)",
                        padding: "15px 35px",
                        fontSize: "18px",
                        cursor: "pointer",
                        zIndex: 10,
                    }}
                >
                    Enter Portfolio →
                </button>
            </div>
            <Menu />
            <OrigamiInfoDetails />
            {isNonClickable && <NonClickable />}
            <div className={`portfolio-info ${isLetterClicked ? "hide" : ""}`}>
                <h2>Lazaros Kosmidis</h2>

                <p>Software Engineer</p>

                <span>lazaros.kosmidis99@gmail.com</span>

                <div className="portfolio-hint">
                    Interactive 3D Portfolio
                    <br />
                    Built with Three.js & React
                </div>
            </div>
        </div>
    );
}

export default Experience;
