import { jsx as _jsx } from "react/jsx-runtime";
import { BaseCanvas } from '../figurl-canvas';
const draw = (context, data) => {
    context.clearRect(0, 0, data.width, data.height);
    data.markers.forEach(m => {
        const p = data.coord2Pixel({ x: m.x, y: m.y });
        context.fillStyle = m.color;
        context.strokeStyle = 'black';
        context.beginPath();
        context.ellipse(p.x, p.y, m.radius, m.radius, 0, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    });
};
const ScatterPlotMainLayer = (props) => {
    return (_jsx(BaseCanvas, { width: props.width, height: props.height, draw: draw, drawData: props }));
};
export default ScatterPlotMainLayer;
//# sourceMappingURL=ScatterPlotMainLayer.js.map