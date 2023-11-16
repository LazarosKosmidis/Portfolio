import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PlaneGeometry } from "three";
import { useStateContext } from "../GlobalContext/StateContext.js";
import { TextureLoader } from "three";

import { useLoader } from "@react-three/fiber/dist/react-three-fiber.cjs";
import { Float } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

const OrigamiPlane = () => {
    const planeRef = useRef();
    const { isLetterClicked, setIsLetterClicked } = useStateContext();
    const { isLetterVisible, setIsLetterVisible } = useStateContext();
    const { isCameraMoving, setIsCameraMoving } = useStateContext();


    const texture = useLoader(TextureLoader, "/textures/letter.png");



    // Set up the BufferGeometry with the initial vertices
    const geometry1 = new PlaneGeometry(3, 2);
    console.log("Plane Geometry", geometry1);
    // Set up the BufferGeometry with the initial vertices
    const height = Math.sqrt(3)

    const geometry = new THREE.BufferGeometry();

    const width_half = 2 / 2;
    const height_half = 2 / 2;

    const gridX = 1
    const gridY = 1

    const gridX1 = gridX + 1;
    const gridY1 = gridY + 1;

    const segment_width = 2 / gridX;
    const segment_height = 2 / gridY;
    const normals = [];
    const uvs = [];
    const indices = [];
    const vertices = [];
    for (let iy = 0; iy < gridY1; iy++) {

        const y = iy * segment_height - height_half;

        for (let ix = 0; ix < gridX1; ix++) {

            const x = ix * segment_width - width_half;
            vertices.push(x, - y, 0);

            normals.push(0, 0, 1);
            uvs.push(ix / gridX);
            uvs.push(1 - (iy / gridY));

        }

    }
    for (let iy = 0; iy < gridY; iy++) {

        for (let ix = 0; ix < gridX; ix++) {

            const a = ix + gridX1 * iy;
            const b = ix + gridX1 * (iy + 1);
            const c = (ix + 1) + gridX1 * (iy + 1);
            const d = (ix + 1) + gridX1 * iy;
            indices.push(a, b, d);
            indices.push(b, c, d);

        }

    }

    geometry.setIndex(indices);


    // const vertices = new Float32Array([
    //     //1
    //     -1.0, -1.0, 0,
    //     1.0, -1.0, 0,
    //     1.0, 1.0, 0,
    //     //2
    //     1.0, 1.0, 0,
    //     -1.0, 1.0, 0,
    //     -1.0, -1.0, 0,
    //     //3
    //     // 1.0, 1.0, 0,
    //     // -1.0, 1.0, 0,
    //     // 1.0, 3.0, 0,
    //     // //4
    //     // 1.0, 3.0, 0,
    //     // -1.0, 1.0, 0,
    //     // -1.0, 3.0, 0,
    //     // //5
    //     // 1.0, 3.0, 0.0,
    //     // 1.0, 5.0, 0.0,
    //     // -1.0, 3.0, 0.0,
    //     // //6
    //     // -1.0, 5.0, 0.0,
    //     // 1.0, 5.0, 0.0,
    //     // -1.0, 3.0, 0.0,

    //     //7 left triangle
    //     // -1.0, 1.0, 0.0,
    //     // -1.0, -1.0, 0.0,
    //     // -(height + 1), 0.0, 0.0,
    //     // //8 left triangle
    //     // 1.0, 1.0, 0.0,
    //     // 1.0, -1.0, 0.0,
    //     // (height + 1), 0.0, 0.0,
    // ]);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    // geometry.computeBoundingBox()
    geometry.computeBoundingBox()
    console.log(geometry);

    const handlePointerOver = () => {

        document.body.style.cursor = "pointer";
        gsap.to(planeRef.current.position, {
            z: planeRef.current.position.z + 0.2,
            duration: 0.5,
        });
    };

    const handlePointerOut = () => {
        document.body.style.cursor = "auto";
        gsap.to(planeRef.current.position, {
            z: planeRef.current.position.z - 0.2,
            duration: 0.5,
        });
    };

    return (
        <group>
            <Float>
                <mesh
                    ref={planeRef}
                    geometry={geometry}
                    position={[2.5, 0, 0]}
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
