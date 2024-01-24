import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useStateContext } from "./globalContext/StateContext";


const Camera = ({ cameraPosition }) => {
    // const { camera } = useThree();
    const tempVec3 = new THREE.Vector3();
    const { isLetterClicked, setIsLetterClicked } = useStateContext();
    // Update camera position on every frame
    useFrame(({ camera }) => {
        if (isLetterClicked) {
            camera.position.lerp(tempVec3.set(cameraPosition[0], cameraPosition[1], cameraPosition[2] + 5), 0.03);

        }
        else {
            camera.position.lerp(tempVec3.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]), 0.03);
        }
    });

    return null;
};

export default Camera;
