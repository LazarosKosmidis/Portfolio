import { useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

const Camera = ({ cameraPosition }) => {
    const { camera } = useThree();
    const tempVec3 = new THREE.Vector3();

    // Update camera position on every frame
    useFrame(({ camera }) => {
        camera.position.lerp(tempVec3.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]), 0.03);
    });

    return null;
};

export default Camera;
