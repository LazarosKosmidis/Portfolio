import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { PlaneGeometry } from "three";
import { useStateContext } from "../GlobalContext/StateContext.js";
import { TextureLoader } from "three";

import { useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

const OrigamiPlane = ({ positionOrigami, rotationOrigami }) => {
    const planeRef = useRef();
    const { isLetterClicked, setIsLetterClicked } = useStateContext();
    const { isLetterVisible, setIsLetterVisible } = useStateContext();
    const { isCameraMoving, setIsCameraMoving } = useStateContext();

    const texture = useLoader(TextureLoader, "/textures/26_arina_kashchavtseva.jpg");
    console.log(texture);
    const geometry = new THREE.BufferGeometry();
    const geometryWidth = 1.82
    const geometryHeight = 1.9
    const geometrySmallHeight = 0.3
    const vertices = new Float32Array([
        //1-Right-Down
        -geometryWidth, 0.0, 0,     //(0,1,2)
        geometryWidth, 0.0, 0,      //(3,4,5)
        geometryWidth, geometryHeight, 0, //(6,7,8)

        //2-Left-Down
        geometryWidth, geometryHeight, 0,   //(9,10,11)
        -geometryWidth, geometryHeight, 0,//(12,13,14)
        -geometryWidth, 0, 0,       //(15,16,17)
        // 3-Right-Middle
        -geometryWidth, geometryHeight, 0,      //(18,19,20)
        geometryWidth, geometryHeight, 0,       //(21,22,23)
        geometryWidth, geometryHeight * 2, 0,   //(24,25,26)

        // //4-Left-Middle
        geometryWidth, geometryHeight * 2, 0,   //(27,28,29)
        -geometryWidth, geometryHeight * 2, 0,  //(30,31,32)
        -geometryWidth, geometryHeight, 0,      //(33,34,35)

        // 5-Right-SmallHelperTriangle
        -geometryWidth, geometryHeight * 2, 0,      //(36,37,38)
        geometryWidth, geometryHeight * 2, 0,       //(39,40,41)
        geometryWidth, (geometryHeight * 2) + geometrySmallHeight, 0,   //(42,43,44)

        // //6-Left-SmallHelperTriangle
        geometryWidth, (geometryHeight * 2) + geometrySmallHeight, 0,   //(45,46,47)
        -geometryWidth, (geometryHeight * 2) + geometrySmallHeight, 0,  //(48,49,50)
        -geometryWidth, geometryHeight * 2, 0,      //(51,52,53)


        // 5-Right-Top
        -geometryWidth, (geometryHeight * 2) + geometrySmallHeight, 0,      //(54,55,56)
        geometryWidth, (geometryHeight * 2) + geometrySmallHeight, 0,       //(57,58,59)
        geometryWidth, (geometryHeight * 3) + geometrySmallHeight, 0,   //(60,61,62)

        // //6-Left-Top
        geometryWidth, (geometryHeight * 3) + geometrySmallHeight, 0,   //(63,64,65)
        -geometryWidth, (geometryHeight * 3) + geometrySmallHeight, 0,  //(66,67,68)
        -geometryWidth, (geometryHeight * 2) + geometrySmallHeight, 0,     //(69,70,71) 

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
    uv.push(geometryHeight / 6)

    uv.push(1)
    uv.push(geometryHeight / 6)
    uv.push(0)
    uv.push(geometryHeight / 6)
    uv.push(0)
    uv.push(0)

    uv.push(0)
    uv.push(geometryHeight / 6)
    uv.push(1)
    uv.push(geometryHeight / 6)
    uv.push(1)
    uv.push((geometryHeight * 2) / 6)

    uv.push(1)
    uv.push((geometryHeight * 2) / 6)
    uv.push(0)
    uv.push((geometryHeight * 2) / 6)
    uv.push(0)
    uv.push(geometryHeight / 6)

    uv.push(0)
    uv.push((geometryHeight * 2) / 6)
    uv.push(1)
    uv.push((geometryHeight * 2) / 6)
    uv.push(1)
    uv.push(((geometryHeight * 2) + geometrySmallHeight) / 6)

    uv.push(1)
    uv.push(((geometryHeight * 2) + geometrySmallHeight) / 6)
    uv.push(0)
    uv.push(((geometryHeight * 2) + geometrySmallHeight) / 6)
    uv.push(0)
    uv.push((geometryHeight * 2) / 6)

    uv.push(0)
    uv.push(((geometryHeight * 2) + geometrySmallHeight) / 6)
    uv.push(1)
    uv.push(((geometryHeight * 2) + geometrySmallHeight) / 6)
    uv.push(1)
    uv.push(((geometryHeight * 3) + geometrySmallHeight) / 6)

    uv.push(1)
    uv.push(((geometryHeight * 3) + geometrySmallHeight) / 6)
    uv.push(0)
    uv.push(((geometryHeight * 3) + geometrySmallHeight) / 6)
    uv.push(0)
    uv.push(((geometryHeight * 2) + geometrySmallHeight) / 6)


    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normal, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    console.log(geometry);



    const handlePointerOver = () => {
        gsap.to(planeRef.current.position, {
            z: planeRef.current.position.z + 0.5,
            duration: 0.5,
        })

        gsap.to(planeRef.current.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.5,
        })

        gsap.to(planeRef.current.position, {
            x: 0,
            y: 0,
            z: 2,
            duration: 0.5,
        })

        document.body.style.cursor = "pointer";
        gsap.to(geometry.attributes.position.array, {

            //Bottom
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
            onComplete: () => {
                gsap.to(geometry.attributes.position.array, {
                    //Top
                    66: -geometryWidth,
                    67: (geometryHeight * 3) + geometrySmallHeight,
                    68: 0,

                    63: geometryWidth,
                    64: (geometryHeight * 3) + geometrySmallHeight,
                    65: 0,

                    60: geometryWidth,
                    61: (geometryHeight * 3) + geometrySmallHeight,
                    62: 0,

                    //Small-Triagnle
                    42: geometryWidth,
                    43: (geometryHeight * 2) + geometrySmallHeight,
                    44: 0,

                    45: geometryWidth,
                    46: (geometryHeight * 2) + geometrySmallHeight,
                    47: 0,

                    48: -geometryWidth,
                    49: (geometryHeight * 2) + geometrySmallHeight,
                    50: 0,

                    54: -geometryWidth,
                    55: (geometryHeight * 2) + geometrySmallHeight,
                    56: 0,

                    57: geometryWidth,
                    58: (geometryHeight * 2) + geometrySmallHeight,
                    59: 0,

                    69: -geometryWidth,
                    70: (geometryHeight * 2) + geometrySmallHeight,
                    71: 0,
                    onUpdate: () => {
                        geometry.attributes.position.needsUpdate = true;
                    },
                    duration: 0.5,
                })
            },
            duration: 0.5,

        });
    };
    //Calculates the z and x of the Bottome Triangle so when the animation is completed there wont be no stretch on the texture
    const angleOfBottomTriangle = Math.atan(0.2 / geometryHeight)
    const zOfAngleBottomTriangle = Math.sin(angleOfBottomTriangle) * geometryHeight
    const yOfAngleBottomTriangle = Math.cos(angleOfBottomTriangle) * geometryHeight

    const handlePointerOut = () => {
        document.body.style.cursor = "auto";
        gsap.to(planeRef.current.position, {
            z: planeRef.current.position.z - 0.5,
            duration: 0.5,
        })

        gsap.to(planeRef.current.rotation, {
            x: rotationOrigami[0],
            y: rotationOrigami[1],
            z: rotationOrigami[2],
            duration: 0.5,
        })

        gsap.to(planeRef.current.position, {
            x: positionOrigami[0],
            y: positionOrigami[1],
            z: positionOrigami[2],
            duration: 0.5,
        })



        gsap.to(geometry.attributes.position.array, {

            //Bottom
            15: - geometryWidth,
            16: (yOfAngleBottomTriangle * 2),
            17: zOfAngleBottomTriangle,

            0: -geometryWidth,
            1: (yOfAngleBottomTriangle * 2),
            2: zOfAngleBottomTriangle,

            3: geometryWidth,
            4: (yOfAngleBottomTriangle * 2),
            5: zOfAngleBottomTriangle,
            onUpdate: () => {
                geometry.attributes.position.needsUpdate = true;
            },

            onComplete: () => {
                gsap.to(geometry.attributes.position.array, {
                    //Top
                    66: -geometryWidth,
                    67: geometryHeight + 0.1,
                    68: 0.5,

                    63: geometryWidth,
                    64: geometryHeight + 0.1,
                    65: 0.5,

                    60: geometryWidth,
                    61: geometryHeight + 0.1,
                    62: 0.5,

                    //Small-Triagnle
                    42: geometryWidth,
                    43: (geometryHeight * 2) + geometrySmallHeight,
                    44: 0.2,

                    45: geometryWidth,
                    46: (geometryHeight * 2) + geometrySmallHeight,
                    47: 0.2,

                    48: -geometryWidth,
                    49: (geometryHeight * 2) + geometrySmallHeight,
                    50: 0.2,

                    54: -geometryWidth,
                    55: (geometryHeight * 2) + geometrySmallHeight,
                    56: 0.2,

                    57: geometryWidth,
                    58: (geometryHeight * 2) + geometrySmallHeight,
                    59: 0.2,

                    69: -geometryWidth,
                    70: (geometryHeight * 2) + geometrySmallHeight,
                    71: 0.2,
                    onUpdate: () => {
                        geometry.attributes.position.needsUpdate = true;
                    },
                    duration: 0.5,
                })
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
                    position={positionOrigami}
                    scale={[0.2, 0.2, 0.2]}
                    rotation={rotationOrigami}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    onClick={() => {

                        handlePointerOut();
                        setIsLetterClicked((prev) => !prev);
                        setIsLetterVisible((prev) => !prev);
                        setIsCameraMoving(false)
                    }}
                    // Add your click handler
                    pointerEvents="auto" // Enable pointer events
                >
                    <meshBasicMaterial
                        side={2}
                        map={texture}
                        transparent={true}
                    />

                </mesh>
            </Float>

        </group >
    );
};

export default OrigamiPlane;
