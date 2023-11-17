import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { PlaneGeometry } from "three";
import { useStateContext } from "../GlobalContext/StateContext.js";
import { TextureLoader } from "three";

import { useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

const OrigamiPlane = () => {
    const planeRef = useRef();
    const { isLetterClicked, setIsLetterClicked } = useStateContext();
    const { isLetterVisible, setIsLetterVisible } = useStateContext();
    const { isCameraMoving, setIsCameraMoving } = useStateContext();

    const texture = useLoader(TextureLoader, "/textures/26_arina_kashchavtseva.jpg");
    console.log(texture);
    const geometry = new THREE.BufferGeometry();
    const geometryWidth = 1.82
    const geometryHeight = 2
    const vertices = new Float32Array([
        //1-Right-Down
        -geometryWidth, 0.0, 0,     //(0,1,2)
        geometryWidth, 0.0, 0,      //(3,4,5)
        geometryWidth, geometryHeight, 0, //(6,7,8)
        //2-Left-Down
        geometryWidth, geometryHeight, 0,   //(9,10,11)
        -geometryWidth, geometryHeight, 0,//(12,13,14)
        -geometryWidth, 0, 0,       //(15,16,17)
        //3-Right-Middle
        geometryWidth, geometryHeight, 0,       //(18,19,20)
        -geometryWidth, geometryHeight, 0,      //(21,22,23)
        geometryWidth, geometryHeight * 2, 0,   //(24,25,26)

        //4-Left-Middle
        geometryWidth, geometryHeight * 2, 0,   //(27,28,29)
        -geometryWidth, geometryHeight, 0,      //(30,31,32)
        -geometryWidth, geometryHeight * 2, 0,  //(33,34,35)
        //5-Right-Top
        geometryWidth, geometryHeight * 2, 0.0, //(36,37,38)
        geometryWidth, geometryHeight * 3, 0.0, //(39,40,41)
        -geometryWidth, geometryHeight * 2, 0.0,//(42,43,44)
        //6-Left-Top
        -geometryWidth, geometryHeight * 3, 0.0,//(45,46,47)
        geometryWidth, geometryHeight * 3, 0.0, //(48,49,50)
        -geometryWidth, geometryHeight * 2, 0.0,//(51,52,53)

    ]);
    const verticesNumber = 8
    const normal = []
    const uv = []
    for (let i = 0; i < verticesNumber; i++) {
        normal.push(0, 0, 1)
    }
    uv.push(0)
    uv.push(0)
    uv.push(1)
    uv.push(0)
    uv.push(1)
    uv.push(1 / 3)

    uv.push(1)
    uv.push(1 / 3)
    uv.push(0)
    uv.push(1 / 3)
    uv.push(0)
    uv.push(0)

    uv.push(1)
    uv.push(1 / 3)
    uv.push(0)
    uv.push(1 / 3)
    uv.push(1)
    uv.push(2 / 3)

    uv.push(1)
    uv.push(2 / 3)
    uv.push(0)
    uv.push(1 / 3)
    uv.push(0)
    uv.push(2 / 3)

    uv.push(1)
    uv.push(2 / 3)
    uv.push(1)
    uv.push(1)
    uv.push(0)
    uv.push(2 / 3)

    uv.push(0)
    uv.push(1)
    uv.push(1)
    uv.push(1)
    uv.push(0)
    uv.push(2 / 3)

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normal, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    console.log(geometry);

    const handlePointerOver = () => {

        document.body.style.cursor = "pointer";
        gsap.to(geometry.attributes.position.array, {
            45: -geometryWidth,
            46: geometryHeight * 3,
            47: 0,

            48: geometryWidth,
            49: geometryHeight * 3,
            50: 0,

            39: geometryWidth,
            40: geometryHeight * 3,
            41: 0,

            15: -geometryWidth,
            16: 0,
            17: 0,
            0: -geometryWidth,
            1: 0,
            2: 0,
            3: geometryWidth,
            4: 0,
            5: 0,
            onUpdate: () => {
                geometry.attributes.position.needsUpdate = true;
            },
            duration: 0.5,

        });
    };

    const handlePointerOut = () => {
        document.body.style.cursor = "auto";
        gsap.to(geometry.attributes.position.array, {
            45: -geometryWidth,
            46: 4.5,
            47: 1,

            48: geometryWidth,
            49: 4.5,
            50: 1,

            39: geometryWidth,
            40: 4.5,
            41: 1,

            15: -geometryWidth,
            16: 4,
            17: 0.3,
            0: -geometryWidth,
            1: 4,
            2: 0.3,
            3: geometryWidth,
            4: 4,
            5: 0.3,
            onUpdate: () => {
                geometry.attributes.position.needsUpdate = true;
            },
            duration: 0.5,
        });
    };
    return (
        <group>
            <Float>
                <mesh
                    ref={planeRef}
                    geometry={geometry}
                    position={[1, 0, 0]}
                    scale={[0.5, 0.5, 0.5]}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    onClick={() => {
                        setIsLetterClicked((prev) => !prev);
                        setIsLetterVisible((prev) => !prev);
                        setIsCameraMoving(false)
                        handlePointerOut();
                    }}
                    // Add your click handler
                    pointerEvents="auto" // Enable pointer events
                >
                    <meshBasicMaterial side={2} map={texture} />
                </mesh>
            </Float>

        </group >
    );
};

export default OrigamiPlane;
