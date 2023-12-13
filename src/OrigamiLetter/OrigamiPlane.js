import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { BoxGeometry, PlaneGeometry } from "three";
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
    const cubeGeometry = new BoxGeometry(0.5, 0.5, 0.5); // Adjust the size as needed

    const texture = useLoader(TextureLoader, "/textures/text24.png");
    console.log(texture);
    const geometry = new THREE.BufferGeometry();
    const geometryWidth = 1
    const geometryHeight = 2
    // const geometrySmallHeight = 0.3

    const createGeometry = () => {
        console.log("gg");
        const vertices = new Float32Array([
            //1-Right-Down
            0, 0.0, 0,     //(0,1,2)
            geometryWidth * 2, 0.0, 0,      //(3,4,5)
            geometryWidth, (geometryHeight / 2), 0, //(6,7,8)

            geometryWidth * 2, 0.0, 0,
            geometryWidth * 2, geometryHeight, 0,
            geometryWidth, (geometryHeight / 2), 0,

            geometryWidth, (geometryHeight / 2), 0,
            geometryWidth * 2, geometryHeight, 0,
            0, geometryHeight, 0,

            geometryWidth, (geometryHeight / 2), 0,
            0, geometryHeight, 0,
            0, 0, 0,

        ]);
        const verticesNumber = 4
        const normal = []
        const uv = []
        for (let i = 0; i < verticesNumber; i++) {
            normal.push(0, 0, 1)
        }
        uv.push(0)
        uv.push(0)
        uv.push(1)
        uv.push(0)
        uv.push(1 / 2)
        uv.push(1 / 2)

        uv.push(1)
        uv.push(0)
        uv.push(1)
        uv.push(1)
        uv.push(1 / 2)
        uv.push(1 / 2)

        uv.push(1 / 2)
        uv.push(1 / 2)
        uv.push(1)
        uv.push(1)
        uv.push(0)
        uv.push(1)

        uv.push(1 / 2)
        uv.push(1 / 2)
        uv.push(0)
        uv.push(1)
        uv.push(0)
        uv.push(0)



        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normal, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));

    }


    useEffect(() => {
        // Update the circular motion on each frame
        createGeometry();

    }, []);

    // const handlePointerOver = () => {
    //     // gsap.to(planeRef.current.position, {
    //     //     z: planeRef.current.position.z + 0.5,
    //     //     duration: 0.5,
    //     // })

    //     // gsap.to(planeRef.current.rotation, {
    //     //     x: 0,
    //     //     y: 0,
    //     //     z: 0,
    //     //     duration: 0.5,
    //     // })

    //     // gsap.to(planeRef.current.position, {
    //     //     x: 0,
    //     //     y: 0,
    //     //     z: 2,
    //     //     duration: 0.5,
    //     // })

    //     document.body.style.cursor = "pointer";
    //     gsap.to(geometry.attributes.position.array, {

    //         //Bottom
    //         15: -geometryWidth,
    //         16: 0,
    //         17: 0,
    //         0: -geometryWidth,
    //         1: 0,
    //         2: 0,
    //         3: geometryWidth,
    //         4: 0,
    //         5: 0,
    //         onUpdate: () => {
    //             geometry.attributes.position.needsUpdate = true;
    //         },
    //         onComplete: () => {
    //             gsap.to(geometry.attributes.position.array, {
    //                 //Top
    //                 66: -geometryWidth,
    //                 67: (geometryHeight * 3) + geometrySmallHeight,
    //                 68: 0,

    //                 63: geometryWidth,
    //                 64: (geometryHeight * 3) + geometrySmallHeight,
    //                 65: 0,

    //                 60: geometryWidth,
    //                 61: (geometryHeight * 3) + geometrySmallHeight,
    //                 62: 0,

    //                 //Small-Triagnle
    //                 42: geometryWidth,
    //                 43: (geometryHeight * 2) + geometrySmallHeight,
    //                 44: 0,

    //                 45: geometryWidth,
    //                 46: (geometryHeight * 2) + geometrySmallHeight,
    //                 47: 0,

    //                 48: -geometryWidth,
    //                 49: (geometryHeight * 2) + geometrySmallHeight,
    //                 50: 0,

    //                 54: -geometryWidth,
    //                 55: (geometryHeight * 2) + geometrySmallHeight,
    //                 56: 0,

    //                 57: geometryWidth,
    //                 58: (geometryHeight * 2) + geometrySmallHeight,
    //                 59: 0,

    //                 69: -geometryWidth,
    //                 70: (geometryHeight * 2) + geometrySmallHeight,
    //                 71: 0,
    //                 onUpdate: () => {
    //                     geometry.attributes.position.needsUpdate = true;
    //                 },
    //                 duration: 0.5,
    //             })
    //         },
    //         duration: 0.5,
    //     });
    // };


    // const handlePointerOut = () => {
    //     document.body.style.cursor = "auto";
    //     // gsap.to(planeRef.current.position, {
    //     //     z: planeRef.current.position.z - 0.5,
    //     //     duration: 0.5,
    //     // })

    //     // gsap.to(planeRef.current.rotation, {
    //     //     x: rotationOrigami[0],
    //     //     y: rotationOrigami[1],
    //     //     z: rotationOrigami[2],
    //     //     duration: 0.5,
    //     // })

    //     // gsap.to(planeRef.current.position, {
    //     //     x: positionOrigami[0],
    //     //     y: positionOrigami[1],
    //     //     z: positionOrigami[2],
    //     //     duration: 0.5,
    //     // })

    //     gsap.to(geometry.attributes.position.array, {

    //         //Bottom
    //         15: - geometryWidth,
    //         16: (yOfAngleBottomTriangle * 2),
    //         17: zOfAngleBottomTriangle,

    //         0: -geometryWidth,
    //         1: (yOfAngleBottomTriangle * 2),
    //         2: zOfAngleBottomTriangle,

    //         3: geometryWidth,
    //         4: (yOfAngleBottomTriangle * 2),
    //         5: zOfAngleBottomTriangle,
    //         onUpdate: () => {
    //             geometry.attributes.position.needsUpdate = true;
    //         },

    //         onComplete: () => {
    //             gsap.to(geometry.attributes.position.array, {
    //                 //Top
    //                 66: -geometryWidth,
    //                 67: geometryHeight + 0.1,
    //                 68: 0.5,

    //                 63: geometryWidth,
    //                 64: geometryHeight + 0.1,
    //                 65: 0.5,

    //                 60: geometryWidth,
    //                 61: geometryHeight + 0.1,
    //                 62: 0.5,

    //                 //Small-Triagnle
    //                 42: geometryWidth,
    //                 43: (geometryHeight * 2) + geometrySmallHeight,
    //                 44: 0.2,

    //                 45: geometryWidth,
    //                 46: (geometryHeight * 2) + geometrySmallHeight,
    //                 47: 0.2,

    //                 48: -geometryWidth,
    //                 49: (geometryHeight * 2) + geometrySmallHeight,
    //                 50: 0.2,

    //                 54: -geometryWidth,
    //                 55: (geometryHeight * 2) + geometrySmallHeight,
    //                 56: 0.2,

    //                 57: geometryWidth,
    //                 58: (geometryHeight * 2) + geometrySmallHeight,
    //                 59: 0.2,

    //                 69: -geometryWidth,
    //                 70: (geometryHeight * 2) + geometrySmallHeight,
    //                 71: 0.2,
    //                 onUpdate: () => {
    //                     geometry.attributes.position.needsUpdate = true;
    //                 },
    //                 duration: 0.5,
    //             })
    //         },
    //         duration: 0.5,
    //     });
    // };

    // Calculate initial angle for circular motion
    let angle = Math.PI;
    const centerY = 1;
    const centerZ = 0;
    const angularSpeed = 0.02; // Adjust the angular speed as needed
    const maxAngle = 2 * Math.PI; // 180 degrees in radians



    const updateCircularMotion = () => {

        geometry.attributes.position.array[24] = [(1 / 2) * (1 - Math.cos(angle)) + Math.cos(angle)] * 2
        geometry.attributes.position.array[25] = (1 / 2) * (1 - Math.cos(angle)) * 2
        geometry.attributes.position.array[26] = -[(1 / Math.sqrt(2) * Math.sin(angle))]

        geometry.attributes.position.array[30] = [(1 / 2) * (1 - Math.cos(angle)) + Math.cos(angle)] * 2
        geometry.attributes.position.array[31] = (1 / 2) * (1 - Math.cos(angle)) * 2
        geometry.attributes.position.array[32] = -[(1 / Math.sqrt(2) * Math.sin(angle))]


        // Increment the angle for the next frame

        // Mark the buffer as needing an update
        geometry.attributes.position.needsUpdate = true;
    };

    useFrame(() => {
        // Update the circular motion on each frame     
        if (angle < maxAngle) {
            // Stop further updates when the angle exceeds or reaches 180 degrees
            updateCircularMotion();
            angle += angularSpeed;
            console.log("gg");
        }
        console.log("ff");

    });

    return (
        <group>
            {/* <Float> */}
            <mesh
                ref={planeRef}
                geometry={geometry}
                position={[0, 0, 0]}
                scale={[1, 1, 1]}
                rotation={rotationOrigami}
                // onPointerOver={handlePointerOver}
                // onPointerOut={handlePointerOut}
                onClick={() => {

                    // handlePointerOut();
                    setIsLetterClicked((prev) => !prev);
                    setIsLetterVisible((prev) => !prev);
                    setIsCameraMoving(false)
                }}
                // Add your click handler
                pointerEvents="auto" // Enable pointer events
            >
                <meshBasicMaterial
                    side={2}
                    // map={texture}
                    transparent={true}
                    wireframe={true}
                />

            </mesh>
            <mesh
                position={[1, 1, -1]} // Adjust the position of the cube
                geometry={cubeGeometry}
            >
                <meshBasicMaterial color="red" /> {/* Adjust the material as needed */}
            </mesh>
            {/* </Float> */}

        </group >
    );
};

export default OrigamiPlane;
