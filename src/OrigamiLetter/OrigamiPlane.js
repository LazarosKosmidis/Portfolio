import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { BoxGeometry, SphereGeometry } from "three";
import { useStateContext } from "../GlobalContext/StateContext.js";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
const OrigamiPlane = ({ positionOrigami, rotationOrigami }) => {
    const planeRef = useRef();
    const sphereCollider = useRef();
    const { isLetterClicked, setIsLetterClicked } = useStateContext();
    const { isLetterVisible, setIsLetterVisible } = useStateContext();
    const { isNonClickable, setINonClickable } = useStateContext();

    const { isCameraMoving, setIsCameraMoving } = useStateContext();
    const [isOrigamiClicked, setIsOrigamiClicked] = useState(false);
    const { camera } = useThree(); // Access to the camera

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
        const geometry_tmp = new THREE.BufferGeometry();
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

        geometry_tmp.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry_tmp.setAttribute('normal', new THREE.Float32BufferAttribute(normal, 3));
        geometry_tmp.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));

        geometry_tmp.attributes.position.array[24] = 2
        geometry_tmp.attributes.position.array[25] = 0
        geometry_tmp.attributes.position.array[26] = 0.1

        geometry_tmp.attributes.position.array[30] = 2
        geometry_tmp.attributes.position.array[31] = 0
        geometry_tmp.attributes.position.array[32] = 0.1

        geometry_tmp.attributes.position.array[21] = 0
        geometry_tmp.attributes.position.array[22] = 0
        geometry_tmp.attributes.position.array[23] = 0.1

        geometry_tmp.attributes.position.array[12] = 0
        geometry_tmp.attributes.position.array[13] = 0

        for (let i = 0; i < 36; i += 3) {
            geometry_tmp.attributes.position.array[i] -= 1
        }
        for (let i = 1; i < 36; i += 3) {
            geometry_tmp.attributes.position.array[i] -= 1
        }


        setPosition([positionOrigami[0] + 1, positionOrigami[1] + 1, planeRef.current.position.z])
        setSphereColliderPos([0, -0.7, 0]) // -1 on x and -1 on y

        setGeometry(geometry_tmp)
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

        setPosition([positionOrigami[0], positionOrigami[1], planeRef.current.position.z])
        setSphereColliderPos([1, 0.3, 0]) // -1 on x and -1 on y

    }

    useEffect(() => {
        // Update the circular motion on each frame
        createGeometry();
        if (!isOrigamiClicked) return;

        setDoAnim1(true);

        setStartingAngle(Math.PI)
        // moveOrigamiToCamera();
    }, [isOrigamiClicked]);

    useEffect(() => {
        // Update the circular motion on each frame
        if (doCreate1 === false) {
            return;
        }
        createNewGeometry(geometry, 1, 1);
        // setDoAnim2(true)
    }, [doCreate1,]);

    const handlePointerOver = () => {

        if (!isOrigamiClicked) {
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
        }
        document.body.style.cursor = "pointer";
    };

    const handlePointerOut = () => {
        document.body.style.cursor = "auto";
        console.log(isOrigamiClicked);
        if (!isOrigamiClicked) {
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
        }




        // gsap.to(planeRef.current.position, {
        //     x: positionOrigami[0],
        //     y: positionOrigami[1],
        //     z: positionOrigami[2],
        //     duration: 0.5,
        // })
    };



    // Calculate initial angle for circular motion
    let angle = startingAngle
    const angularSpeed = 0.02; // Adjust the angular speed as needed
    const maxAngle = 2 * Math.PI; // 180 degrees in radians

    const moveOrigamiToCamera = (() => {
        if (isOrigamiClicked) {
            gsap.to(planeRef.current.position, {
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z - 2,
                duration: 1.5,
            })
        }
    })

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

    useFrame((state, delta) => {
        // Update the circular motion on each frame 

        if (doAnim1) {

            if (angle >= 0) {
                // Stop further updates when the angle exceeds or reaches 180 degrees
                updateCircularMotion(new THREE.Vector3(1, -1, 0), new THREE.Vector3(1, 1, 0), 2, [12, 13, 14, 21, 22, 23]);
                angle -= delta * 9;
            } else {
                setDoAnim1(false);
                setDoAnim2(true);
                setStartingAngle(2 * Math.PI - 0.05);
                setDoCreate1(true);
            }
        }
        else if (doAnim2) {
            if (angle >= Math.PI) {
                // Stop further updates when the angle exceeds or reaches 180 degrees
                updateCircularMotion(new THREE.Vector3(2, 2, 0), new THREE.Vector3(2, 0, 0), 2, [24, 25, 26, 30, 31, 32]);
                angle -= delta * 9;
            } else {
                setGeometry(geometry);
                moveOrigamiToCamera();

            }
        }
    });

    return (
        <group>
            <Float>
                <mesh
                    ref={planeRef}
                    geometry={geometry}
                    position={isPosition}
                    scale={[1, 1, 1]}
                    rotation={rotationOrigami}
                >
                    <meshBasicMaterial
                        side={2}
                        map={texture}
                        transparent={true}
                    // wireframe={true}
                    />
                    <mesh
                        ref={sphereCollider}
                        scale={[1, 0.8, 1]}
                        position={shpereColliderPos}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                        onClick={() => {
                            document.body.style.cursor = "auto";
                            setINonClickable(true)
                            setIsOrigamiClicked(true)
                            // handlePointerOut();
                            handlePointerOver();
                            setTimeout(() => {
                                setINonClickable(false);
                                setIsLetterClicked((prev) => !prev);
                                setIsLetterVisible((prev) => !prev);
                            }, 1500);

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
