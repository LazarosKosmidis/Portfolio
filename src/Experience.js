import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from '@mui/material';
import { OrbitControls, Stars } from '@react-three/drei'; // Import OrbitControls and Stars for camera control and background stars
import * as THREE from "three";
import Origami from "./Origami";
import OrigamiPlane from "./OrigamiLetter/OrigamiPlane"
import Camera from "./Camera";
import { Stats } from "@react-three/drei";
import { useStateContext } from "./GlobalContext/StateContext";
import Menu from "./UI/Menu";
function Experience() {
    const { isLetterClicked, setIsLetterClicked } = useStateContext();
    const { isLetterVisible, setIsLetterVisible } = useStateContext();
    const { isCameraMoving, setIsCameraMoving } = useStateContext();

    const [isPositionOrigami, setIsPositionOrigami] = useState([1, 0, 0]);
    const [isRotationOrigami, setIsRotationOrigami] = useState([0, 0, 0])
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
                    position: [0, 1, 3],
                    rotation: [0, THREE.MathUtils.degToRad(0), 0],
                    fov: 100,
                    aspect: window.innerWidth / window.innerHeight,
                    near: 0.1,
                    far: 1000,

                }}
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

                {isLetterClicked && (<Origami />)}
                {isLetterVisible && (<OrigamiPlane positionOrigami={isPositionOrigami} rotationOrigami={isRotationOrigami} />)}
                {/* {isCameraMoving && (<Camera />)} */}
                {/* Add camera controls */}
                <OrbitControls />
                <Stars />
                {/* Add background stars */}
                {/* HELPERS */}
                <axesHelper args={[50]} position={[0, 0, 0]} />
                {/* <Stats /> */}
            </Canvas>
            <Menu />
        </div>
    );
}

export default Experience;
