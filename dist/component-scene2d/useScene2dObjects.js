import { useCallback, useReducer } from "react";
const scene2dObjectsReducer = (s, a) => {
    if (a.type === 'add') {
        return [...s, a.object];
    }
    else if (a.type === 'clear') {
        return [];
    }
    else if (a.type === 'setObjectPosition') {
        return s.map(o => (o.objectId === a.objectId ? setObjectPosition(o, { x: a.position.x, y: a.position.y }) : o));
    }
    else if (a.type === 'setSelectedObjects') {
        return s.map(o => (Object.assign(Object.assign({}, o), { selected: a.objectIds.includes(o.objectId) })));
    }
    else
        return s;
};
const setObjectPosition = (o, p) => {
    return Object.assign(Object.assign({}, o), p);
};
// A list of scene2d objects, with actions for clearing, adding, setting positions, selecting, etc.
const useScene2dObjects = () => {
    const [objects, objectsDispatch] = useReducer(scene2dObjectsReducer, []);
    const clearObjects = useCallback(() => {
        objectsDispatch({ type: 'clear' });
    }, []);
    const addObject = useCallback((object) => {
        objectsDispatch({ type: 'add', object });
    }, []);
    const setObjectPosition = useCallback((objectId, position) => {
        objectsDispatch({ type: 'setObjectPosition', objectId, position });
    }, []);
    const setSelectedObjects = useCallback((objectIds) => {
        objectsDispatch({ type: 'setSelectedObjects', objectIds });
    }, []);
    return {
        objects,
        clearObjects,
        addObject,
        setObjectPosition,
        setSelectedObjects
    };
};
export default useScene2dObjects;
//# sourceMappingURL=useScene2dObjects.js.map