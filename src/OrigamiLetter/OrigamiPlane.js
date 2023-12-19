import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { BoxGeometry, SphereGeometry } from "three";
import { useStateContext } from "../GlobalContext/StateContext.js";
import { TextureLoader } from "three";

import { useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

const OrigamiPlane = ({ positionOrigami, rotationOrigami }) => {
    const planeRef = useRef();
    const sphereCollider = useRef();
    const { isLetterClicked, setIsLetterClicked } = useStateContext();
    const { isLetterVisible, setIsLetterVisible } = useStateContext();
    const { isCameraMoving, setIsCameraMoving } = useStateContext();
    const [isPosition, setPosition] = useState(positionOrigami)
    const [doAnim1, setDoAnim1] = useState(false)
    const [doAnim2, setDoAnim2] = useState(false)
    const [doCreate, setDoCreate] = useState(true)
    const [geometry, setGeometry] = useState(new THREE.BufferGeometry());
    const [doCreate1, setDoCreate1] = useState(false)
    const [startingAngle, setStartingAngle] = useState(0)
    const [shpereColliderPos, setSphereColliderPos] = useState([1.0, 0.3, 0])

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

            geometryWidth * 2, 0.0, 0,//(9,10,11)
            geometryWidth * 2, geometryHeight, 0,//(12,13,14)
            geometryWidth, (geometryHeight / 2), 0,//(15,16,17)

            geometryWidth, (geometryHeight / 2), 0,//(18,19,20)
            geometryWidth * 2, geometryHeight, 0,//(21,22,23)
            0, geometryHeight, 0,//(24,25,26)

            geometryWidth, (geometryHeight / 2), 0,//(27,28,29)
            0, geometryHeight, 0,//(30,31,32)
            0, 0, 0,//(33,34,35)

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

        // old_Geometry.attributes.position
        for (let i = 0; i < 36; i += 3) {
            old_Geometry.attributes.position.array[i] += x_move
        }
        for (let i = 1; i < 36; i += 3) {
            old_Geometry.attributes.position.array[i] += y_move
        }
        geometry.attributes.position.needsUpdate = true;

        setGeometry(old_Geometry)

        console.log(planeRef.current.position);
        setPosition([positionOrigami[0] + 1, positionOrigami[1] + 1, planeRef.current.position.z])
        setSphereColliderPos([0, -0.7, 0]) // -1 on x and -1 on y

    }

    useEffect(() => {
        // Update the circular motion on each frame
        console.log(planeRef.current.position);

        createGeometry();
        setDoAnim1(true);
        setStartingAngle(Math.PI)

    }, []);

    useEffect(() => {
        // Update the circular motion on each frame
        if (doCreate1 === false) {
            return;
        }
        createNewGeometry(geometry, -1, -1);
        // setDoAnim2(true)
    }, [doCreate1,]);

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

        // gsap.to(planeRef.current.position, {
        //     x: 0,
        //     y: 0,
        //     z: 1,
        //     duration: 0.5,
        // })

        console.log("gg");
        document.body.style.cursor = "pointer";
    };


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

        // gsap.to(planeRef.current.position, {
        //     x: positionOrigami[0],
        //     y: positionOrigami[1],
        //     z: positionOrigami[2],
        //     duration: 0.5,
        // })
    };

    // Calculate initial angle for circular motion
    let angle = startingAngle
    const centerY = 1;
    const centerZ = 0;
    const angularSpeed = 0.02; // Adjust the angular speed as needed
    const maxAngle = 2 * Math.PI; // 180 degrees in radians


    const updateCircularMotion = (U_Vector, Rotate_point, vertices, vertex_coordinates) => {
        const U_Vec_Norm = U_Vector.normalize()
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        if (vertices === 1) {

            geometry.attributes.position.array[vertex_coordinates[0]] = ([U_Vec_Norm.x * U_Vec_Norm.x * (1 - cos) + cos] * Rotate_point.x) + ([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) - U_Vec_Norm.z * sin] * Rotate_point.y) + ([U_Vec_Norm.x * U_Vec_Norm.z * (1 - cos) + U_Vec_Norm.y * sin] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[1]] = ([U_Vec_Norm.y * U_Vec_Norm.x * (1 - cos) + U_Vec_Norm.z * sin] * Rotate_point.x) + ([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) + cos] * Rotate_point.y) + ([U_Vec_Norm.y * U_Vec_Norm.z * (1 - cos) - U_Vec_Norm.x * sin] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[2]] = -([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) + U_Vec_Norm.y * sin] * Rotate_point.x) + ([U_Vec_Norm.y * U_Vec_Norm.z * (1 - cos) + U_Vec_Norm.x * sin] * Rotate_point.y) + ([U_Vec_Norm.z * U_Vec_Norm.z * (1 - cos) + cos] * Rotate_point.z)

        }
        else if (vertices === 2) {

            geometry.attributes.position.array[vertex_coordinates[0]] = ([U_Vec_Norm.x * U_Vec_Norm.x * (1 - cos) + cos] * Rotate_point.x) + ([U_Vec_Norm.y * U_Vec_Norm.x * (1 - cos) - U_Vec_Norm.z * sin] * Rotate_point.y) + ([U_Vec_Norm.x * U_Vec_Norm.z * (1 - cos) + U_Vec_Norm.y * sin] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[1]] = ([U_Vec_Norm.y * U_Vec_Norm.x * (1 - cos) + U_Vec_Norm.z * sin] * Rotate_point.x) + ([U_Vec_Norm.y * U_Vec_Norm.y * (1 - cos) + cos] * Rotate_point.y) + ([U_Vec_Norm.y * U_Vec_Norm.z * (1 - cos) - U_Vec_Norm.x * sin] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[2]] = -([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) + U_Vec_Norm.y * sin] * Rotate_point.x) + ([U_Vec_Norm.y * U_Vec_Norm.z * (1 - cos) + U_Vec_Norm.x * sin] * Rotate_point.y) + ([U_Vec_Norm.z * U_Vec_Norm.z * (1 - cos) + cos] * Rotate_point.z)

            geometry.attributes.position.array[vertex_coordinates[3]] = ([U_Vec_Norm.x * U_Vec_Norm.x * (1 - cos) + cos] * Rotate_point.x) + ([U_Vec_Norm.y * U_Vec_Norm.x * (1 - cos) - U_Vec_Norm.z * sin] * Rotate_point.y) + ([U_Vec_Norm.x * U_Vec_Norm.z * (1 - cos) + U_Vec_Norm.y * sin] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[4]] = ([U_Vec_Norm.y * U_Vec_Norm.x * (1 - cos) + U_Vec_Norm.z * sin] * Rotate_point.x) + ([U_Vec_Norm.y * U_Vec_Norm.y * (1 - cos) + cos] * Rotate_point.y) + ([U_Vec_Norm.y * U_Vec_Norm.z * (1 - cos) - U_Vec_Norm.x * sin] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[5]] = -([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) + U_Vec_Norm.y * sin] * Rotate_point.x) + ([U_Vec_Norm.y * U_Vec_Norm.z * (1 - cos) + U_Vec_Norm.x * sin] * Rotate_point.y) + ([U_Vec_Norm.z * U_Vec_Norm.z * (1 - cos) + cos] * Rotate_point.z)

        }
        else if (vertices === 3) {

            geometry.attributes.position.array[vertex_coordinates[0]] = ([U_Vec_Norm.x * U_Vec_Norm.x * (1 - cos) + cos] * Rotate_point.x) + ([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) - U_Vec_Norm.z * sin] * Rotate_point.y) + ([U_Vec_Norm.x * U_Vec_Norm.z * (1 - cos) + U_Vec_Norm.y * sin] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[1]] = ([U_Vec_Norm.y * U_Vec_Norm.x * (1 - cos) + U_Vec_Norm.z * sin] * Rotate_point.x) + ([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) + cos] * Rotate_point.y) + ([U_Vec_Norm.y * U_Vec_Norm.z * (1 - cos) - U_Vec_Norm.x * sin] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[2]] = -([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) + U_Vec_Norm.y * sin] * Rotate_point.x) + ([U_Vec_Norm.y * U_Vec_Norm.z * (1 - cos) + U_Vec_Norm.x * sin] * Rotate_point.y) + ([U_Vec_Norm.z * U_Vec_Norm.z * (1 - cos) + cos] * Rotate_point.z)

            geometry.attributes.position.array[vertex_coordinates[3]] = ([U_Vec_Norm.x * U_Vec_Norm.x * (1 - cos) + cos] * Rotate_point.x) + ([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) - U_Vec_Norm.z * sin] * Rotate_point.y) + ([U_Vec_Norm.x * U_Vec_Norm.z * (1 - cos) + U_Vec_Norm.y * sin] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[4]] = ([U_Vec_Norm.y * U_Vec_Norm.x * (1 - cos) + U_Vec_Norm.z * sin] * Rotate_point.x) + ([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) + cos] * Rotate_point.y) + ([U_Vec_Norm.y * U_Vec_Norm.z * (1 - cos) - U_Vec_Norm.x * sin] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[5]] = -([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) + U_Vec_Norm.y * sin] * Rotate_point.x) + ([U_Vec_Norm.y * U_Vec_Norm.z * (1 - cos) + U_Vec_Norm.x * sin] * Rotate_point.y) + ([U_Vec_Norm.z * U_Vec_Norm.z * (1 - cos) + cos] * Rotate_point.z)

            geometry.attributes.position.array[vertex_coordinates[6]] = ([U_Vec_Norm.x * U_Vec_Norm.x * (1 - cos) + cos] * Rotate_point.x) + ([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) - U_Vec_Norm.z * sin] * Rotate_point.y) + ([U_Vec_Norm.x * U_Vec_Norm.z * (1 - cos) + U_Vec_Norm.y * sin] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[7]] = ([U_Vec_Norm.y * U_Vec_Norm.x * (1 - cos) + U_Vec_Norm.z * sin] * Rotate_point.x) + ([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) + cos] * Rotate_point.y) + ([U_Vec_Norm.y * U_Vec_Norm.z * (1 - cos) - U_Vec_Norm.x * sin] * Rotate_point.z)
            geometry.attributes.position.array[vertex_coordinates[8]] = -([U_Vec_Norm.z * U_Vec_Norm.x * (1 - cos) + U_Vec_Norm.y * sin] * Rotate_point.x) + ([U_Vec_Norm.y * U_Vec_Norm.z * (1 - cos) + U_Vec_Norm.x * sin] * Rotate_point.y) + ([U_Vec_Norm.z * U_Vec_Norm.z * (1 - cos) + cos] * Rotate_point.z)

        }
        // Mark the buffer as needing an update
        geometry.attributes.position.needsUpdate = true;
    };

    // useFrame((state, delta) => {
    //     // Update the circular motion on each frame 

    //     if (doAnim1) {
    //         if (angle <= maxAngle) {
    //             // Stop further updates when the angle exceeds or reaches 180 degrees
    //             updateCircularMotion(new THREE.Vector3(2, 2, 0), new THREE.Vector3(2, 0, 0), 2, [24, 25, 26, 30, 31, 32]);
    //             angle += delta * 5;
    //         } else {
    //             setDoAnim1(false);
    //             setDoAnim2(true);
    //             setStartingAngle(0);
    //             setDoCreate1(true);
    //         }
    //     } else if (doAnim2) {
    //         console.log(angle);
    //         if (angle <= Math.PI) {
    //             // Stop further updates when the angle exceeds or reaches 180 degrees
    //             updateCircularMotion(new THREE.Vector3(1, -1, 0), new THREE.Vector3(1, 1, 0), 2, [12, 13, 14, 21, 22, 23]);
    //             angle += delta * 5;
    //         } else {
    //             setGeometry(geometry);
    //         }
    //     }
    // });


    return (
        <group>
            <Float>
                <mesh
                    ref={planeRef}
                    geometry={geometry}
                    position={isPosition}
                    scale={[1, 1, 1]}
                    rotation={rotationOrigami}
                // Add your click handler

                >
                    <meshBasicMaterial
                        side={2}
                        // map={texture}
                        transparent={true}
                        wireframe={true}
                    />
                    <mesh
                        ref={sphereCollider}
                        scale={[1, 0.8, 1]}
                        position={shpereColliderPos}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                        onClick={() => {

                            handlePointerOut();
                            setIsLetterClicked((prev) => !prev);
                            setIsLetterVisible((prev) => !prev);
                            setIsCameraMoving(false)
                        }}
                        pointerEvents="auto" // Enable pointer events
                    >
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshBasicMaterial
                            wireframe={true}
                            transparent={true}
                            opacity={0}
                            visible={false}
                        />
                    </mesh>
                </mesh>

            </Float>
        </group >
    );
};

export default OrigamiPlane;
