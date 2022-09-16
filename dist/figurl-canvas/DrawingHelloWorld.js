import { jsx as _jsx } from "react/jsx-runtime";
import funcToTransform from './funcToTransform'; // NOTE: Need to copy this into DrawingWidget or whatever final directory
import { max, norm } from "mathjs";
import { useCallback, useReducer, useRef } from "react";
import { pointSpanToRegion, transformPoints } from "./Geometry";
import BaseCanvas from "./BaseCanvas";
import CanvasFrame from "./CanvasFrame";
import DragCanvas, { dragReducer, handleMouseDownIfDragging, handleMouseMoveIfDragging, handleMouseUpIfDragging } from "./DragCanvas";
/*
    Implementing a simple canvas-based visualization only requires 3 steps:
     - Converting data from its native coordinate system to one based on the
       actual pixel dimensions of the canvas element
     - Providing a drawing function to do the visualization (which should work
        entirely in the pixel coordinate system)
     - Creating the needed canvas(es) and the canvasframe that coordinates their
       layout.
     - [Optionally] You may want to implement interactivity; event handlers must be
       attached to the canvas frame.
    For complex objects, these areas of functionality may be broken out into
    separate files to make them easier to digest.
*/
const DrawingHelloWorld = (props) => {
    const { dataPoints, width, height } = props;
    const pixelPoints = convertDataToPixelSpace(dataPoints, width, height);
    const drawData = { pixelPoints };
    // Typescript can usually infer the type parameter, but if you need to pass
    // a generic type parameter to a react component, this is how you do it
    const canvas = _jsx(BaseCanvas, { width: width, height: height, draw: drawPixelSpaceData, drawData: drawData });
    const frame = _jsx(CanvasFrame, { width: width, height: height, canvases: [canvas] });
    return frame;
};
const convertDataToPixelSpace = (dataPoints, width, height) => {
    const Xs = dataPoints.map(p => p[0]);
    const Ys = dataPoints.map(p => p[1]);
    const xmax = max(Xs);
    // We're going to assume the input points are random but positive.
    // Let's add a 5% margin to both sides
    const xMargin = xmax * .05;
    const finalNativeWidthWithMargins = xmax + 2 * xMargin;
    // Rinse and repeat for the y-direction
    // (This would be a function but we want to keep the margin we compute as an intermediate step)
    const ymax = max(Ys);
    const yMargin = ymax * .05;
    const finalNativeHeightWithMargins = ymax + 2 * yMargin;
    // Project our data points (in finalXWithMargins x finalYWithMargins space) into a
    // new coordinate system that's width x height.
    // funcToTransform is a function that makes it easier to construct the appropriate transformation
    // matrix; it takes a function that converts a single point, and then builds a matrix using the
    // test points [0,0], [1,0], and [0, 1].
    // In this case, we want to convert the native space to pixel space by scaling the each
    // x-value to a percent of the total native width, then multiplying by the pixel width, then
    // adding in the margin.
    // Same for the y-values, except that because the axis is inverted (0 is at the top, not the bottom)
    // we need to subtract the computed value from the final height.
    const transform = funcToTransform((p) => {
        const x = xMargin + (p[0] * width) / finalNativeWidthWithMargins;
        // const y = finalNativeHeightWithMargins - yMargin - (p[1] * height)/finalNativeHeightWithMargins
        const y = yMargin + (p[1] * height) / finalNativeHeightWithMargins;
        return [x, y];
    });
    // Now we have a transformation matrix which we can feed to the transformPoints function, which
    // conveniently vectorizes our full list of points and applies the scaling matrix, then
    // returns them as another list of 2-vectors.
    return transformPoints(transform, dataPoints);
};
const drawPixelSpaceData = (ctxt, props) => {
    // This function is pretty easy: we have a bunch of points, we want to draw circles around each
    // of them with a radius of 3 pixels.
    const { pixelPoints } = props;
    ctxt.clearRect(0, 0, ctxt.canvas.width, ctxt.canvas.height);
    const circle = 2 * Math.PI;
    const pastelPurple = 'rgb(154, 127, 174)';
    ctxt.fillStyle = pastelPurple;
    pixelPoints.forEach(p => {
        ctxt.beginPath();
        ctxt.ellipse(p[0], p[1], 3, 3, 0, 0, circle);
        ctxt.fill();
    });
    // Now let's provide numeric labels for our points (this will be useful for interactivity)
    // We can position the text relative to the drawn points using the ctxt.textAlign and txt.textBaseline properties
    // (Ordinarily we'd want to make sure the labels don't overlap other points or whatever, but I'm cutting that corner here,
    // this may look weird for some random values)
    ctxt.fillStyle = 'black';
    ctxt.font = '12px Arial';
    // left, top should mean the text's upper left anchor is the actual drawn point, putting the label to the point's bottom right
    ctxt.textAlign = 'left';
    ctxt.textBaseline = 'top';
    pixelPoints.forEach((p, ii) => {
        ctxt.fillText(`${ii}`, p[0] + 2, p[1] + 2);
    });
};
// --------------------------------------------------------------------------------------------------------
/*
    This example extends the DrawingHelloWorld example by adding an event handler for click events.
*/
const clickEventHandler = (e, pixelSpacePoints) => {
    // We'll log the index number of any point within a radius of 3 from the click event.
    // First get the click event point relative to the surrounding canvas (vs the whole page)
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const clickPoint = [e.clientX - boundingRect.x, e.clientY - boundingRect.y];
    pixelSpacePoints.forEach((pt, ii) => {
        if (norm([pt[0] - clickPoint[0], pt[1] - clickPoint[1]]) < 3) {
            console.log(`You just clicked point ${ii}!`);
        }
    });
};
export const DrawingHelloWorldClicks = (props) => {
    // This code is unchanged from above --------->
    const { dataPoints, width, height } = props;
    const pixelPoints = convertDataToPixelSpace(dataPoints, width, height);
    const drawData = { pixelPoints };
    console.log(pixelPoints);
    const canvas = _jsx(BaseCanvas, { width: width, height: height, draw: drawPixelSpaceData, drawData: drawData });
    // --------------- end of completely unchanged code
    // And all that changes here is that we used the optional `handlers` prop to pass an event handler function
    const clickEventHandlerCallback = useCallback((e) => {
        clickEventHandler(e, pixelPoints);
    }, [pixelPoints]);
    const frame = _jsx(CanvasFrame, { width: width, height: height, canvases: [canvas], handlers: { onMouseDown: (e) => clickEventHandlerCallback(e) } });
    return frame;
};
// --------------------------------------------------------------------------------------------------------
/*
    Using a drag canvas is very similar to using a base canvas, except:
        you will need to set up more state (to delegate to dragstate-management
            functions supplied by DragCanvas); and
        you will need to provide handlers for the mousemove, mouseup, and
            mousedown events (since DragCanvas' state-management methods need
            to be alerted of these events in order to manage drag state.)
    The expectation is that an element using a DragCanvas will probably have
    fairly complex state that will need to respond to the drag state. You will
    likely need to implement a reducer to store this logic.
*/
export const DrawingHelloWorldDragRect = (props) => {
    // This code is unchanged from DrawingHelloWorld --------->
    const { dataPoints, width, height } = props;
    const pixelPoints = convertDataToPixelSpace(dataPoints, width, height);
    const drawData = { pixelPoints };
    const canvas = _jsx(BaseCanvas, { width: width, height: height, draw: drawPixelSpaceData, drawData: drawData });
    // --------------- end of completely unchanged code
    // To support dragging, we need to bring in some state (most of which we'll delegate to the DragCanvas functions)
    // and some state management. That means (for realistic cases) a reducer, as well as a couple refs (which are just
    // for debouncing the move events).
    const [state, dispatchState] = useReducer(helloReducer, {
        dragState: emptyDragState
    });
    const nextDragStateUpdate = useRef(null);
    const nextFrame = useRef(0);
    // We also need an actual DragCanvas.
    const dragCanvas = _jsx(DragCanvas, { width: width, height: height, newState: state.dragState });
    const handleMouseMove = useCallback((e) => {
        // handleMouseMoveIfDragging() is a function provided by the DragCanvas. It takes the delegated debouncing refs,
        // the reducer to call (as a callback), and the additional parameters needed to operate the reducer (in our case,
        // the type we want passed to the reducer, the actual points, and a string). The extra parameter allows the actual
        // reducer logic to live entirely within our control, and the DragCanvas can operate independently of it.
        const wasHandled = handleMouseMoveIfDragging(e, { nextDragStateUpdate, nextFrame, reducer: dispatchState,
            reducerOtherProps: {
                type: 'DRAGUPDATE',
                pixelSpacePoints: pixelPoints,
                bonusParameter: 'We can inspect our own logic to see this will never appear!'
            } });
        if (wasHandled) { }
        // If we wanted to respond to this event (either always or conditionally upon whether the drag canvas did something with it),
        // we would do so here. wasHandled will be true if DragCanvas did a state update, otherwise false.
    }, [pixelPoints]);
    const handleMouseDown = (e) => handleMouseDownIfDragging(e, { nextDragStateUpdate, nextFrame, reducer: dispatchState,
        reducerOtherProps: {
            type: 'DRAGUPDATE',
            pixelSpacePoints: pixelPoints,
            bonusParameter: 'You will never see this!'
        } });
    const handleMouseUp = useCallback((e) => {
        if (state.dragState.isActive) {
            // with an active state, mouseup means end the drag state. If that happens, we shouldn't process the event.
            handleMouseUpIfDragging(e, { nextDragStateUpdate, nextFrame, reducer: dispatchState, reducerOtherProps: {
                    type: 'DRAGUPDATE',
                    pixelSpacePoints: pixelPoints,
                    bonusParameter: 'You just released a drag rect!'
                } });
        }
        else {
            // with no active drag state, this was a normal click; call the click handler from the second example (above).
            clickEventHandler(e, pixelPoints);
        }
    }, [state.dragState.isActive, pixelPoints]);
    const handlers = {
        onMouseMove: (e) => handleMouseMove(e),
        onMouseUp: (e) => handleMouseUp(e),
        onMouseDown: (e) => handleMouseDown(e)
    };
    const frame = _jsx(CanvasFrame, { width: width, height: height, canvases: [canvas, dragCanvas], handlers: handlers });
    return frame;
};
const emptyDragState = { isActive: false };
const helloReducer = (state, action) => {
    if (action.type === 'DRAGUPDATE') {
        const newDrag = dragReducer(state.dragState, action.dragAction);
        const { pixelSpacePoints, bonusParameter } = action;
        if (!newDrag.isActive && newDrag.dragRect) {
            // just completed a drag. Write some stuff to console and clear out the state.
            const dragRectAsMaxMin = pointSpanToRegion(newDrag.dragRect);
            const xmin = dragRectAsMaxMin.xmin - 3;
            const xmax = dragRectAsMaxMin.xmax + 3;
            const ymin = dragRectAsMaxMin.ymin - 3;
            const ymax = dragRectAsMaxMin.ymax + 3;
            pixelSpacePoints.forEach((p, ii) => {
                if (p[0] > xmin && p[0] < xmax && p[1] > ymin && p[1] < ymax) {
                    console.log(`${ii} was in the drag rect!`);
                }
            });
            console.log(`Here was the bonus parameter: ${bonusParameter}`);
            return Object.assign(Object.assign({}, state), { dragState: emptyDragState });
        }
        else {
            // For this application, we don't care to specify more precisely.
            // If we did want to, e.g., highlight dragged items, we could check and
            // handle separately the case where newDrag.dragRect is set (an ongoing drag)
            // vs not set (which would clear everything out).
            return Object.assign(Object.assign({}, state), { dragState: newDrag });
        }
    }
    else {
        console.log(`Error: unrecognized verb ${action.type} in helloReducer`);
        return state;
    }
};
export default DrawingHelloWorld;
//# sourceMappingURL=DrawingHelloWorld.js.map