import { Scene2dObject } from "./Scene2d";
declare const useScene2dObjects: () => {
    objects: Scene2dObject[];
    clearObjects: () => void;
    addObject: (object: Scene2dObject) => void;
    setObjectPosition: (objectId: string, position: {
        x: number;
        y: number;
    }) => void;
    setSelectedObjects: (objectIds: string[]) => void;
};
export default useScene2dObjects;
