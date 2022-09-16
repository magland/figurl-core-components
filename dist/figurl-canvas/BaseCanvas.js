import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
const baseCanvasStyle = {
    position: 'absolute',
    left: 0,
    top: 0
};
const getDrawingContextFromCanvasRef = (canvasRef) => {
    if (!canvasRef || typeof canvasRef === 'function')
        return undefined;
    const canvas = canvasRef.current;
    const ctxt = canvas && canvas.getContext('2d');
    if (!ctxt)
        return undefined;
    return ctxt;
};
// the ', ' in the type parameter is so the parser knows it isn't
// an unclosed HTML tag. Can also use 'extends {}' for this, but this is more idiomatic.
/**
 * Creates a canvas object with a specified data type and draw function that draws that data type,
 * along with wiring to ensure the draw function is called every time the underlying data changes.
 * A graphical-element View in an MVC pattern.
 *
 * @param props Dimensions and positioning parameters, plus typed drawing data and drawing function.
 * @returns A Canvas element which automatically redraws when its content data changes.
 */
const BaseCanvas = (props) => {
    const { width, height, vOffsetPx, hOffsetPx, draw, drawData } = props;
    const canvasRef = useRef(null);
    useEffect(() => {
        const ctxt = getDrawingContextFromCanvasRef(canvasRef);
        ctxt && ctxt.canvas && draw(ctxt, drawData);
    }, [draw, canvasRef, drawData]);
    const topPosition = vOffsetPx ? { top: vOffsetPx } : {};
    const leftPosition = hOffsetPx ? { left: hOffsetPx } : {};
    const style = Object.assign(Object.assign(Object.assign({}, baseCanvasStyle), topPosition), leftPosition);
    return _jsx("canvas", { ref: canvasRef, width: width, height: height, style: style });
};
export default BaseCanvas;
//# sourceMappingURL=BaseCanvas.js.map