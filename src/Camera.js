import { useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

const Camera = () => {
    const { camera } = useThree();


    // Define damping factor, y-axis limits, and wheel sensitivity
    const dampingFactor = 0.05;
    const minY = -10;
    const maxY = 10;
    const wheelSensitivity = 0.01;

    // Set up a target position for smooth camera movement
    const targetPosition = new THREE.Vector3();
    targetPosition.copy(camera.position);

    // Event handler for mouse wheel
    const handleWheel = (event) => {
        // Update target position based on the mouse wheel movement
        targetPosition.y -= event.deltaY * wheelSensitivity;
    };

    // Attach the wheel event listener
    useEffect(() => {
        const handleWheelEvent = (event) => handleWheel(event);
        window.addEventListener("wheel", handleWheelEvent);

        return () => {
            window.removeEventListener("wheel", handleWheelEvent);
        };
    },); // Empty dependency array ensures the effect runs once on mount and cleans up on unmount

    // Update camera position on every frame
    useFrame(() => {
        // Interpolate camera position towards the target position with damping
        camera.position.lerp(targetPosition, dampingFactor);

        // Clamp camera position to y-axis limits
        camera.position.setY(THREE.MathUtils.clamp(camera.position.y, minY, maxY));
    });

    return null;
};

export default Camera;
