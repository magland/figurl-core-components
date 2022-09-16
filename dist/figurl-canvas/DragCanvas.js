import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useRef } from "react";
import { getRectFromPointPair } from "./Geometry";
// NOTE: Tracks drag state in *pixelspace*.
const defaultDragStyle = 'rgba(196, 196, 196, 0.5)';
export const COMPUTE_DRAG = 'COMPUTE_DRAG';
export const END_DRAG = 'END_DRAG';
export const RESET_DRAG = 'RESET_DRAG';
export const INCOMPLETE_ACTION = 'PARTIAL';
export const getDragActionFromEvent = (e) => {
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const point = [e.clientX - boundingRect.x, e.clientY - boundingRect.y];
    const mouseButtonIsDown = e.buttons === 1;
    const shift = e.shiftKey;
    return { type: INCOMPLETE_ACTION, mouseButtonIsDown, point, shift };
};
// This isn't a "real" Reducer, in that it isn't using any of React's state-management features.
// It's just a function that takes a current state and action, and applies the action to return
// a new state.
export const dragReducer = (state, action) => {
    const { dragAnchor, dragRect } = state;
    const { type, mouseButtonIsDown, point, shift } = action;
    const DRAG_START_TOLERANCE = 4;
    switch (type) {
        case RESET_DRAG: // should happen on mousedown
            return { isActive: false };
        case END_DRAG: // should happen on mouseup
            const rect = dragAnchor && point ? getRectFromPointPair(dragAnchor, point) : undefined;
            return {
                isActive: false,
                dragRect: rect,
                shift: shift
            };
        case COMPUTE_DRAG: // should happen on mouse move
            // Clear the state if the mouse button is up
            // (Any previous state should've already been finalized on the mouse up event itself)
            if (!mouseButtonIsDown)
                return {
                    isActive: false
                };
            if (!point)
                throw Error('ASSERTION FAILED: COMPUTE_DRAG but the mousemove event had no location.');
            // If the drag anchor isn't set, just set it to the current point.
            // If the drag anchor is set, then:
            // - if there's already an active drag, update the drag rectangle.
            // - If there isn't an active drag, start one, IFF the point has moved far enough from the original click.
            return !dragAnchor ?
                {
                    isActive: false,
                    dragAnchor: point
                }
                : dragRect
                    || (Math.abs(point[0] - dragAnchor[0]) > DRAG_START_TOLERANCE)
                    || (Math.abs(point[1] - dragAnchor[1]) > DRAG_START_TOLERANCE) ? Object.assign(Object.assign({}, state), { isActive: true, dragRect: getRectFromPointPair(dragAnchor, point) }) : state;
        default: {
            throw Error(`Invalid mode for drag reducer: ${type}`);
        }
    }
};
const paintDragRectangle = (canvasRef, dragState, dragStyle) => {
    if (!dragState || !canvasRef)
        return;
    if (typeof canvasRef === 'function')
        return;
    const canvas = canvasRef.current;
    const ctxt = canvas && canvas.getContext('2d');
    if (!ctxt) {
        return;
    }
    ctxt.clearRect(0, 0, ctxt.canvas.width, ctxt.canvas.height);
    if (dragState.isActive) {
        const rect = dragState.dragRect || [0, 0, 0, 0];
        ctxt.fillStyle = dragStyle !== null && dragStyle !== void 0 ? dragStyle : defaultDragStyle;
        ctxt.fillRect(rect[0], rect[1], rect[2], rect[3]);
    }
};
// This function debounces drag state updates.
// It uses requestAnimationFrame() to schedule updates at an appropriate rate.
// When the timer expires, if there's no pending update, it cancels the cycle.
// If there is a pending update, it applies the update & sets another timer.
const updateDragState = (props) => {
    const { nextDragStateUpdate, nextFrame, reducer, reducerOtherProps } = props;
    if (nextDragStateUpdate.current === null) {
        window.cancelAnimationFrame(nextFrame.current);
        nextFrame.current = 0;
    }
    else {
        reducer(Object.assign(Object.assign({}, reducerOtherProps), { dragAction: nextDragStateUpdate.current }));
        // We cannot pass props to the animation frame callback. But we still need to use the outer
        // class' delegated state (via the ref vars). So we save them in a closure.
        // This works because the refs never change.
        // POTENTIAL HOLE: If dispatchStateOtherProps has a value that might change, that could be
        // a source of trouble, because we will be reusing the current one.
        const closure = () => updateDragState(props);
        nextFrame.current = requestAnimationFrame(closure);
    }
    nextDragStateUpdate.current = null;
};
export const handleMouseMoveIfDragging = (e, delegatedProps) => {
    const { nextDragStateUpdate, nextFrame } = delegatedProps;
    const action = Object.assign(Object.assign({}, getDragActionFromEvent(e)), { type: COMPUTE_DRAG });
    // with mouse button down, this is a drag situation.
    // But we debounce drag-state updates. So check if we're in the cooldown between updates.
    // If a change is in the queue, update the next change to apply; otherwise, schedule an update.
    if (action.mouseButtonIsDown) {
        nextDragStateUpdate.current = action;
        if (nextFrame.current === 0) {
            updateDragState(delegatedProps);
        }
        return true; // we handled it, so caller does not need to unless it wants to handle everything
    }
    return false; // we did not handle it, so caller definitely needs to handle the event as appropriate
};
export const handleMouseDownIfDragging = (e, delegatedProps) => {
    const { nextDragStateUpdate, reducer, reducerOtherProps } = delegatedProps;
    nextDragStateUpdate.current = null;
    reducer(Object.assign(Object.assign({}, reducerOtherProps), { dragAction: { type: RESET_DRAG } }));
};
export const handleMouseUpIfDragging = (e, delegatedProps) => {
    const { nextDragStateUpdate, reducer, reducerOtherProps } = delegatedProps;
    nextDragStateUpdate.current = null;
    reducer(Object.assign(Object.assign({}, reducerOtherProps), { dragAction: Object.assign(Object.assign({}, getDragActionFromEvent(e)), { type: END_DRAG }) }));
};
const DragCanvas = (props) => {
    const { width, height, newState, dragStyle } = props;
    const ref = useRef(null);
    const canvas = useMemo(() => {
        return _jsx("canvas", { ref: ref, width: width, height: height, style: { position: 'absolute', left: 0, top: 0 } });
    }, [width, height]);
    paintDragRectangle(ref, newState, dragStyle);
    return canvas;
};
export default DragCanvas;
//# sourceMappingURL=DragCanvas.js.map