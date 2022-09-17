import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { createObjectId, Scene2d, Scene2dObject, useScene2dObjects } from '../package';

type Props = {
    width: number
    height: number
}

const initialObjects: Scene2dObject[] = []
for (let i = 1; i < 20; i ++) {
    initialObjects.push({
        objectId: `${i}-a`,
        type: 'marker',
        clickable: true,
        draggable: true,
        x: 30 * i, y: 20 + 2 * i,
        attributes: {fillColor: 'blue'}
    })
    initialObjects.push({
        objectId: `${i}-b`,
        type: 'marker',
        clickable: true,
        draggable: true,
        x: 30 * i, y: 100 + 2.5 * i,
        attributes: {shape: 'square', fillColor: 'green', radius: 1 + i / 5}
    })
    initialObjects.push({
        type: 'connector',
        clickable: true,
        draggable: true,
        objectId: `${i}-connector`,
        objectId1: `${i}-a`,
        objectId2: `${i}-b`,
        attributes: {color: 'black', dash: [5, 5]}
    })
}

const TestScene2d: FunctionComponent<Props> = ({width, height}) => {
    // objects is the list of scene objects
    const {objects, clearObjects, addObject, setObjectPosition, setSelectedObjects} = useScene2dObjects()

    useEffect(() => {
        // initialize the list
        clearObjects()
        for (let o of initialObjects) {
            addObject(o)
        }
    }, [clearObjects, addObject])
    const handleClickObject = useCallback((objectId: string, e: React.MouseEvent) => {
        // select an object when it is clicked
        console.info('CLICK', objectId, e.ctrlKey, e.shiftKey)
        setSelectedObjects([objectId])
    }, [setSelectedObjects])
    const handleDragObject = useCallback((objectId: string, p: {x: number, y: number}, e: React.MouseEvent) => {
        // change object position when it is dragged
        console.info('DRAG OBJECT', objectId, p, e.ctrlKey, e.shiftKey)
        setObjectPosition(objectId, p)
    }, [setObjectPosition])
    const handleSelectObjects = useCallback((objectIds: string[], e: React.MouseEvent | undefined) => {
        // select a list of objects when selected using a drag rect
        console.info('SELECT OBJECTS', objectIds, e?.ctrlKey, e?.shiftKey)
        setSelectedObjects(objectIds)
    }, [setSelectedObjects])
    const handleClick = useCallback((p: {x: number, y: number}, e: React.MouseEvent) => {
        // when canvas is clicked, add a marker object at that location
        console.info('CLICK', p, e.ctrlKey, e.shiftKey)
        setSelectedObjects([])
        addObject({
            objectId: createObjectId(),
            type: 'marker',
            clickable: true,
            draggable: true,
            x: p.x, y: p.y,
            attributes: {shape: 'square', fillColor: 'purple', radius: 6}
        })
    }, [setSelectedObjects, addObject])

    return (
        <Scene2d
            width={width}
            height={height}
            objects={objects}
            onClickObject={handleClickObject}
            onDragObject={handleDragObject}
            onSelectObjects={handleSelectObjects}
            onClick={handleClick}
        />
    )
}

export default TestScene2d