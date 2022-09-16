import { jsx as _jsx } from "react/jsx-runtime";
import { BaseCanvas } from '../figurl-canvas';
const draw = (context, data) => {
    context.clearRect(0, 0, data.width, data.height);
    for (let vline of data.pixelVerticalLines || []) {
        context.strokeStyle = vline.color;
        context.beginPath();
        context.moveTo(vline.x, data.margins.top - 20);
        context.lineTo(vline.x, data.height - data.margins.bottom);
        context.stroke();
    }
    data.barBoxes.forEach(b => {
        context.fillStyle = b.color;
        context.fillRect(b.x1, b.y1, b.x2 - b.x1, b.y2 - b.y1);
    });
    if (data.xLabel) {
        context.textBaseline = 'bottom';
        context.textAlign = 'center';
        context.fillStyle = 'black';
        context.fillText(data.xLabel, data.width / 2, data.height - 3);
    }
    for (let tick of data.pixelTicks || []) {
        context.strokeStyle = 'black';
        context.beginPath();
        context.moveTo(tick.x, data.height - data.margins.bottom);
        context.lineTo(tick.x, data.height - data.margins.bottom + 6);
        context.stroke();
        context.textBaseline = 'top';
        context.textAlign = 'center';
        context.fillStyle = 'black';
        context.fillText(tick.label, tick.x, data.height - data.margins.bottom + 8);
    }
};
const BarPlotMainLayer = (props) => {
    return (_jsx(BaseCanvas, { width: props.width, height: props.height, draw: draw, drawData: props }));
};
export default BarPlotMainLayer;
//# sourceMappingURL=BarPlotMainLayer.js.map