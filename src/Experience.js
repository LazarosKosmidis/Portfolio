import React, { useRef, useState, useEffect, useCallback } from "react";

import { Canvas } from "@react-three/fiber";
import { Box } from '@mui/material';
import { OrbitControls, Sparkles, Stars, Sky } from '@react-three/drei'; // Import OrbitControls and Stars for camera control and background stars
import * as THREE from "three";
import Origami from "./OrigamiLetter/Origami";
import OrigamiPlane from "./OrigamiLetter/OrigamiPlane"
import Camera from "./Camera";
import { Stats } from "@react-three/drei";
import { useStateContext } from "./GlobalContext/StateContext";
import Menu from "./UI/Menu";
import NonClickable from "./OrigamiLetter/NonClickable";

function Experience() {
    const { isLetterClicked, setIsLetterClicked } = useStateContext();
    const { isNonClickable, setINonClickable } = useStateContext();
    const { isLetterVisible, setIsLetterVisible } = useStateContext();
    const { isCameraMoving, setIsCameraMoving } = useStateContext();
    const [cameraPosition, setCameraPosition] = useState([0, 1, 7]);
    const [isRotationOrigami, setIsRotationOrigami] = useState([0, 0, 0])
    const texturePaths = [
        "/textures/05_anahanum.jpg",
        "/textures/26_arina_kashchavtseva.jpg",
        "/textures/49_angelina_bagdasaryan.jpg",
        "/textures/24_alla_dimareva.jpg",
        "/textures/22_alla_dimareva.jpg",
        "/textures/13_daniil_protasov.jpg",
        "/textures/07_angelina_bagdasaryan.jpg"

    ]
    // const [isPositionOrigami, setIsPositionOrigami] = useState();
    // const [isPositionOrigami1, setIsPositionOrigami1] = useState([-2, 2.5, 0]);
    // const [isPositionOrigami2, setIsPositionOrigami2] = useState([-1.5, -1.5, 0]);
    let positionOrigamies = []
    const startingPos = 0
    let y = -20;
    let x = -10
    for (let i = 0; i < 50; i++) {

        if (i % 5 === 0) {
            y += 4
            x = -10
        }
        positionOrigamies.push([startingPos + x, startingPos + y, startingPos])
        x += 4
    }

    let rotationOrigamies = []
    function setRotation() {
        const min = -1;
        const max = 1;
        for (let i = 0; i < 50; i++) {
            const rotationX = Math.random() * (max - min) + min;
            const rotationY = Math.random() * (max - min) + min;
            const rotationZ = Math.random() * (max - min) + min;
            rotationOrigamies.push([rotationX, rotationY, rotationZ]);
        }
        setIsRotationOrigami(rotationOrigamies)
    }
    useEffect(() => {
        setRotation();
    }, [])
    // setIsPositionOrigami(positionOrigamies)
    const cameraRef = useRef();

    const wheelSensitivity = 0.0015;
    const touchStart = useRef(new THREE.Vector2())
    // Event handler for mouse wheel
    function moveCamera(e) {
        const newCameraPosition = [...cameraPosition];
        newCameraPosition[1] -= e.deltaY * wheelSensitivity; // Adjust this value for the desired scroll speed
        if (newCameraPosition[1] <= -10) {
            newCameraPosition[1] = -10;
        } else if (newCameraPosition[1] >= 10) {
            newCameraPosition[1] = 10;
        }
        setCameraPosition(newCameraPosition);
    }

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
                    ref: { cameraRef },
                    position: [0, 1, 7],
                    rotation: [0, THREE.MathUtils.degToRad(0), 0],
                    fov: 100,
                    aspect: window.innerWidth / window.innerHeight,
                    near: 0.1,
                    far: 1000,

                }}
                onWheel={moveCamera}
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

                {isLetterClicked && (<Origami texturePaths={texturePaths[Math.floor(Math.random() * (6))]} />)}

                {isLetterVisible && positionOrigamies.map((position, index) => (
                    <OrigamiPlane key={index} positionOrigami={positionOrigamies[index]} rotationOrigami={isRotationOrigami[index]} />
                ))}

                {/* {isLetterVisible && (<OrigamiPlane positionOrigami={positionOrigamies[0]} rotationOrigami={isRotationOrigami} />)} */}
                {isCameraMoving && (<Camera cameraPosition={cameraPosition} />)}
                {/* Add camera controls */}
                {/* <OrbitControls /> */}
                {/* <Sky distance={450000} sunPosition={[10, -0.1, 0]} inclination={0} azimuth={0.5} /> */}
                {/* < Stars
                    saturation={0}
                    factor={4}
                /> */}
                <Sparkles
                    count={10000}
                    color={"orange"}
                    speed={1}
                    scale={[40, 40, 10]}
                    size={3}
                    noise={0.5}
                />
                {/* Add background stars */}
                {/* HELPERS */}
                <axesHelper args={[50]} position={[0, 0, 0]} />
                <Stats />
            </Canvas>
            <Menu />
            {isNonClickable && <NonClickable />}

        </div>
    );
}

export default Experience;
