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
    const [isPosition, setPosition] = useState([0, 0, 0])
    const [doAnim1, setDoAnim1] = useState(false)
    const [doAnim2, setDoAnim2] = useState(false)
    const [doCreate, setDoCreate] = useState(true)
    const [geometry, setGeometry] = useState(new THREE.BufferGeometry());
    const [doCreate1, setDoCreate1] = useState(false)



    const texture = useLoader(TextureLoader, "/textures/text24.png");

    const geometryWidth = 1
    const geometryHeight = 2
    // const geometrySmallHeight = 0.3

    const createGeometry = () => {
        const geometry = new THREE.BufferGeometry();
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
        setGeometry(geometry)
    }
    const createNewGeometry = (old_Geometry, x_move, y_move) => {
        console.log("old_Geometry", old_Geometry);

        // old_Geometry.attributes.position
        console.log(geometry);
        for (let i = 0; i < 36; i += 3) {
            console.log(i);
            old_Geometry.attributes.position.array[i] += x_move
        }
        for (let i = 1; i < 36; i += 3) {
            console.log(i);
            old_Geometry.attributes.position.array[i] += y_move
        }
        setGeometry(old_Geometry)
    }

    useEffect(() => {
        // Update the circular motion on each frame
        createGeometry();
        setDoAnim1(true);

    }, []);

    useEffect(() => {
        // Update the circular motion on each frame
        if (doCreate1 === false) {
            console.log("gg");
            return;
        }
        createNewGeometry(geometry, -1, -1);
        // setDoAnim2(true)
    }, [doCreate1,]);

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


    const updateCircularMotion = (U_Vector, Rotate_point, vertices, vertex_coordinates) => {

        if (vertices === 1) {

            geometry.attributes.position.array[vertex_coordinates[0]] = ([U_Vector.normalize().x * U_Vector.normalize().x * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.x) + ([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) - U_Vector.normalize().z * Math.sin(angle)] * Rotate_point.y) + ([U_Vector.normalize().x * U_Vector.normalize().z * (1 - Math.cos(angle)) + U_Vector.normalize().y * Math.sin(angle)] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[1]] = ([U_Vector.normalize().y * U_Vector.normalize().x * (1 - Math.cos(angle)) + U_Vector.normalize().z * Math.sin(angle)] * Rotate_point.x) + ([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.y) + ([U_Vector.normalize().y * U_Vector.normalize().z * (1 - Math.cos(angle)) - U_Vector.normalize().x * Math.sin(angle)] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[2]] = -([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) + U_Vector.normalize().y * Math.sin(angle)] * Rotate_point.x) + ([U_Vector.normalize().y * U_Vector.normalize().z * (1 - Math.cos(angle)) + U_Vector.normalize().x * Math.sin(angle)] * Rotate_point.y) + ([U_Vector.normalize().z * U_Vector.normalize().z * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.z)

        }
        else if (vertices === 2) {

            geometry.attributes.position.array[vertex_coordinates[0]] = ([U_Vector.normalize().x * U_Vector.normalize().x * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.x) + ([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) - U_Vector.normalize().z * Math.sin(angle)] * Rotate_point.y) + ([U_Vector.normalize().x * U_Vector.normalize().z * (1 - Math.cos(angle)) + U_Vector.normalize().y * Math.sin(angle)] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[1]] = ([U_Vector.normalize().y * U_Vector.normalize().x * (1 - Math.cos(angle)) + U_Vector.normalize().z * Math.sin(angle)] * Rotate_point.x) + ([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.y) + ([U_Vector.normalize().y * U_Vector.normalize().z * (1 - Math.cos(angle)) - U_Vector.normalize().x * Math.sin(angle)] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[2]] = -([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) + U_Vector.normalize().y * Math.sin(angle)] * Rotate_point.x) + ([U_Vector.normalize().y * U_Vector.normalize().z * (1 - Math.cos(angle)) + U_Vector.normalize().x * Math.sin(angle)] * Rotate_point.y) + ([U_Vector.normalize().z * U_Vector.normalize().z * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.z)

            geometry.attributes.position.array[vertex_coordinates[3]] = ([U_Vector.normalize().x * U_Vector.normalize().x * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.x) + ([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) - U_Vector.normalize().z * Math.sin(angle)] * Rotate_point.y) + ([U_Vector.normalize().x * U_Vector.normalize().z * (1 - Math.cos(angle)) + U_Vector.normalize().y * Math.sin(angle)] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[4]] = ([U_Vector.normalize().y * U_Vector.normalize().x * (1 - Math.cos(angle)) + U_Vector.normalize().z * Math.sin(angle)] * Rotate_point.x) + ([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.y) + ([U_Vector.normalize().y * U_Vector.normalize().z * (1 - Math.cos(angle)) - U_Vector.normalize().x * Math.sin(angle)] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[5]] = -([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) + U_Vector.normalize().y * Math.sin(angle)] * Rotate_point.x) + ([U_Vector.normalize().y * U_Vector.normalize().z * (1 - Math.cos(angle)) + U_Vector.normalize().x * Math.sin(angle)] * Rotate_point.y) + ([U_Vector.normalize().z * U_Vector.normalize().z * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.z)

        }
        else if (vertices === 3) {

            geometry.attributes.position.array[vertex_coordinates[0]] = ([U_Vector.normalize().x * U_Vector.normalize().x * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.x) + ([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) - U_Vector.normalize().z * Math.sin(angle)] * Rotate_point.y) + ([U_Vector.normalize().x * U_Vector.normalize().z * (1 - Math.cos(angle)) + U_Vector.normalize().y * Math.sin(angle)] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[1]] = ([U_Vector.normalize().y * U_Vector.normalize().x * (1 - Math.cos(angle)) + U_Vector.normalize().z * Math.sin(angle)] * Rotate_point.x) + ([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.y) + ([U_Vector.normalize().y * U_Vector.normalize().z * (1 - Math.cos(angle)) - U_Vector.normalize().x * Math.sin(angle)] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[2]] = -([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) + U_Vector.normalize().y * Math.sin(angle)] * Rotate_point.x) + ([U_Vector.normalize().y * U_Vector.normalize().z * (1 - Math.cos(angle)) + U_Vector.normalize().x * Math.sin(angle)] * Rotate_point.y) + ([U_Vector.normalize().z * U_Vector.normalize().z * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.z)

            geometry.attributes.position.array[vertex_coordinates[3]] = ([U_Vector.normalize().x * U_Vector.normalize().x * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.x) + ([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) - U_Vector.normalize().z * Math.sin(angle)] * Rotate_point.y) + ([U_Vector.normalize().x * U_Vector.normalize().z * (1 - Math.cos(angle)) + U_Vector.normalize().y * Math.sin(angle)] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[4]] = ([U_Vector.normalize().y * U_Vector.normalize().x * (1 - Math.cos(angle)) + U_Vector.normalize().z * Math.sin(angle)] * Rotate_point.x) + ([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.y) + ([U_Vector.normalize().y * U_Vector.normalize().z * (1 - Math.cos(angle)) - U_Vector.normalize().x * Math.sin(angle)] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[5]] = -([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) + U_Vector.normalize().y * Math.sin(angle)] * Rotate_point.x) + ([U_Vector.normalize().y * U_Vector.normalize().z * (1 - Math.cos(angle)) + U_Vector.normalize().x * Math.sin(angle)] * Rotate_point.y) + ([U_Vector.normalize().z * U_Vector.normalize().z * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.z)

            geometry.attributes.position.array[vertex_coordinates[6]] = ([U_Vector.normalize().x * U_Vector.normalize().x * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.x) + ([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) - U_Vector.normalize().z * Math.sin(angle)] * Rotate_point.y) + ([U_Vector.normalize().x * U_Vector.normalize().z * (1 - Math.cos(angle)) + U_Vector.normalize().y * Math.sin(angle)] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[7]] = ([U_Vector.normalize().y * U_Vector.normalize().x * (1 - Math.cos(angle)) + U_Vector.normalize().z * Math.sin(angle)] * Rotate_point.x) + ([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.y) + ([U_Vector.normalize().y * U_Vector.normalize().z * (1 - Math.cos(angle)) - U_Vector.normalize().x * Math.sin(angle)] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[8]] = -([U_Vector.normalize().z * U_Vector.normalize().x * (1 - Math.cos(angle)) + U_Vector.normalize().y * Math.sin(angle)] * Rotate_point.x) + ([U_Vector.normalize().y * U_Vector.normalize().z * (1 - Math.cos(angle)) + U_Vector.normalize().x * Math.sin(angle)] * Rotate_point.y) + ([U_Vector.normalize().z * U_Vector.normalize().z * (1 - Math.cos(angle)) + Math.cos(angle)] * Rotate_point.z)

        }
        // Mark the buffer as needing an update
        geometry.attributes.position.needsUpdate = true;
    };

    useFrame(() => {
        // Update the circular motion on each frame 
        if (doAnim1 == false) {
            return;
        }
        if (angle < maxAngle) {
            // Stop further updates when the angle exceeds or reaches 180 degrees
            updateCircularMotion(new THREE.Vector3(2, 2, 0), new THREE.Vector3(2, 0, 0), 2, [24, 25, 26, 30, 31, 32]);
            angle += angularSpeed;
        }
        else {
            setDoAnim1(false);
            setDoAnim2(true);
            setDoCreate1(true);
        }
    });

    useFrame(() => {
        // Update the circular motion on each frame 

        if (doAnim2 == false) {
            console.log("doAnim2 == false");
            return;
        }

        else {
            setGeometry(geometry)
            console.log(geometry);
        }
    });

    return (
        <group>
            {/* <Float> */}
            <mesh
                ref={planeRef}
                geometry={geometry}
                position={isPosition}
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
            {/* <mesh
                position={[1, 1, -1]} // Adjust the position of the cube
                geometry={cubeGeometry}
            >
                <meshBasicMaterial color="red" /> Adjust the material as needed */}
            {/* </mesh> */}

        </group >
    );
};

export default OrigamiPlane;
