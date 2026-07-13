import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useStateContext } from "../GlobalContext/StateContext.js";
import { TextureLoader } from "three";
import gsap from "gsap";
import { useLoader } from "@react-three/fiber/dist/react-three-fiber.cjs";
import { useThree } from "@react-three/fiber";

const Origami = ({ positionOrigami, texturePaths }) => {
    // Create a ref to the mesh
    const materialRef = useRef();
    const group = useRef();
    const [isMoving, setisMoving] = useState(true)
    const { origamiIndex } = useStateContext()

    const texture = useLoader(TextureLoader, texturePaths);
    texture.repeat.set(0.5, 0.286)
    texture.offset.set(0, 0);
    const { camera } = useThree(); // Access to the camera
    // State to hold the rotation angle in degrees
    const [rotationAngleX, setRotationAngleX] = useState(0);
    const [rotationAngleY, setRotationAngleY] = useState(0);
    const [rotationAngleZ, setRotationAngleZ] = useState(0);
    const [rotationSpeedX, setRotationSpeedX] = useState(Math.random() * 0.02 + 0.005);
    const [rotationSpeedY, setRotationSpeedY] = useState(Math.random() * 0.02 + 0.005);
    const [rotationSpeedZ, setRotationSpeedZ] = useState(Math.random() * 0.02 + 0.005);

    useFrame(() => {
        if (isMoving === false) {
            setRotationAngleX((prevAngle) => THREE.MathUtils.lerp(prevAngle, 0, 0.1));
            setRotationAngleY((prevAngle) => THREE.MathUtils.lerp(prevAngle, 0, 0.1));
            setRotationAngleZ((prevAngle) => THREE.MathUtils.lerp(prevAngle, 0, 0.1));
        }
        // Update the rotation angle based on the frame
        setRotationAngleX((prevAngle) => {
            let newAngle = prevAngle + rotationSpeedX;

            // Adjust the rotation direction when reaching the limits
            if (newAngle >= 10 || newAngle <= -10) {
                setRotationSpeedX((prevSpeed) => -prevSpeed); // Reverse the rotation direction
                newAngle = prevAngle + rotationSpeedX;
            }
            return newAngle;
        });
        setRotationAngleY((prevAngle) => {
            let newAngle = prevAngle + rotationSpeedY;

            // Adjust the rotation direction when reaching the limits
            if (newAngle >= 15 || newAngle <= -15) {
                setRotationSpeedY((prevSpeed) => -prevSpeed); // Reverse the rotation direction
                newAngle = prevAngle + rotationSpeedY;
            }
            return newAngle;
        });
        setRotationAngleZ((prevAngle) => {
            let newAngle = prevAngle + rotationSpeedZ;

            // Adjust the rotation direction when reaching the limits
            if (newAngle >= 10 || newAngle <= -10) {
                setRotationSpeedZ((prevSpeed) => -prevSpeed); // Reverse the rotation direction
                newAngle = prevAngle + rotationSpeedZ;
            }
            return newAngle;
        });

        group.current.rotation.x = THREE.MathUtils.degToRad(rotationAngleX); // Convert to radians
        group.current.rotation.y = THREE.MathUtils.degToRad(rotationAngleY); // Convert to radians
        group.current.rotation.z = THREE.MathUtils.degToRad(rotationAngleZ); // Convert to radians
    });

    // Create a custom shape for curved edges
    function configureShape(x, y, width, height, radius, shape) {
        shape.moveTo(x, y + radius)
        shape.lineTo(x, y + height - radius)
        shape.quadraticCurveTo(x, y + height, x + radius, y + height)
        shape.lineTo(x + width - radius, y + height)
        shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
        shape.lineTo(x + width, y + radius)
        shape.quadraticCurveTo(x + width, y, x + width - radius, y)
        shape.lineTo(x + radius, y)
        shape.quadraticCurveTo(x, y, x, y + radius)
    }
    const width = 2
    const height = 3.5// Set the height of the label
    const radius = Math.PI / 20 // Set the radius for the rounded corners
    const planeShape = new THREE.Shape();
    configureShape(0, 0, width, height, radius, planeShape)

    useFrame(() => {
        gsap.to(materialRef.current, {
            opacity: 1,
            duration: 2.5,
        });
    }, []); // Empty dependency array ensures the effect runs only once on mount

    // Create geometry using the custom shape
    const geometry = new THREE.ShapeGeometry(planeShape);

    // This will run every frame
    return (
    <group
        ref={group}
        position={[
            camera.position.x - 3,
            camera.position.y - 0.5,
            camera.position.z - 5,
        ]}
    >
        <mesh
            geometry={geometry}
            position={[-1, -1.3, 0.8]}
            onPointerOver={(e) => {
                setisMoving(false);
                document.body.style.cursor = "pointer";

                gsap.to(e.object.scale, {
                    x: 1.2,
                    y: 1.2,
                    z: 1.2,
                    duration: 0.25,
                });
            }}
            onPointerOut={(e) => {
                setisMoving(true);
                document.body.style.cursor = "default";

                gsap.to(e.object.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.25,
                });
            }}
            onClick={() => {
                switch (origamiIndex) {
                    case 0:
                        window.open(
                            "https://www.linkedin.com/in/lazaroskosmidis/",
                            "_blank"
                        );
                        break;

                    case 1:
                        window.open(
                            "/textures/LAZAROS_KOSMIDIS_CV.pdf",
                            "_blank"
                        );
                        break;

                    case 2:
                        window.open(
                            "https://github.com/LazarosKosmidis",
                            "_blank"
                        );
                        break;

                    default:
                        break;
                }
            }}
        >
            <meshBasicMaterial
                ref={materialRef}
                map={texture}
                transparent
                opacity={0}
            />
        </mesh>
    </group>
);
};

export default Origami;