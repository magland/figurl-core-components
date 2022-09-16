import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BaseCanvas } from '../figurl-canvas';
import { rectangularRegionsIntersect } from '../figurl-canvas';
import { useDragSelectLayer } from '@figurl/core-utils';
import { useCallback, useMemo } from 'react';
import ScatterPlotMainLayer from './ScatterPlotMainLayer';
const emptyDrawData = {};
const ScatterPlot = ({ markers, onSelectRect, onClickPoint, width, height }) => {
    const { margins } = useMemo(() => {
        const margins = {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20 // 3 + (xLabel ? 13 : 0) + (ticks ? 13 : 0)
        };
        return { margins };
    }, []);
    const { coord2Pixel, pixel2Coord } = useMemo(() => {
        let xMin, xMax, yMin, yMax;
        if (markers.length > 0) {
            xMin = Math.min(...markers.map(m => (m.x)));
            xMax = Math.max(...markers.map(m => (m.x)));
            yMin = Math.min(...markers.map(m => (m.y)));
            yMax = Math.max(...markers.map(m => (m.y)));
        }
        else {
            xMin = 0;
            xMax = 1;
            yMin = 0;
            yMax = 1;
        }
        const W = width - margins.left - margins.right;
        const H = height - margins.top - margins.bottom;
        const coord2Pixel = (p) => {
            return {
                x: margins.left + (p.x - xMin) / (xMax - xMin) * W,
                y: margins.top + (1 - (p.y - yMin) / (yMax - yMin)) * H
            };
        };
        const pixel2Coord = (p) => {
            return {
                x: xMin + (p.x - margins.left) / W * (xMax - xMin),
                y: yMin + (1 - (p.y - margins.top) / H) * (yMax - yMin)
            };
        };
        return { coord2Pixel, pixel2Coord };
    }, [markers, width, height, margins]);
    const handleSelectRect = useCallback((r, { ctrlKey, shiftKey }) => {
        const rA = { x: r[0], y: r[1], width: r[2], height: r[3] };
        const selectedMarkerKeys = [];
        for (let m of markers) {
            const p = coord2Pixel({ x: m.x, y: m.y });
            const pR = { xmin: p.x - m.radius, ymin: p.y - m.radius, xmax: p.x + m.radius, ymax: p.y + m.radius };
            if (rectangularRegionsIntersect({ xmin: rA.x, xmax: rA.x + rA.width, ymin: rA.y, ymax: rA.y + rA.height }, pR)) {
                selectedMarkerKeys.push(m.key);
            }
        }
        const r0 = transformRect(pixel2Coord, rA);
        onSelectRect && onSelectRect(r0, selectedMarkerKeys, { ctrlKey, shiftKey });
    }, [onSelectRect, pixel2Coord, markers, coord2Pixel]);
    const handleClickPoint = useCallback((x, { ctrlKey, shiftKey }) => {
        const p = { x: x[0], y: x[1] };
        const rA = { x: p.x, y: p.y, width: 1, height: 1 };
        let selectedMarkerKey = undefined;
        for (let m of markers) {
            const p = coord2Pixel({ x: m.x, y: m.y });
            const pR = { xmin: p.x - m.radius, ymin: p.y - m.radius, xmax: p.x + m.radius, ymax: p.y + m.radius };
            if (rectangularRegionsIntersect({ xmin: rA.x, xmax: rA.x + rA.width, ymin: rA.y, ymax: rA.y + rA.height }, pR)) {
                selectedMarkerKey = m.key;
            }
        }
        onClickPoint && onClickPoint(pixel2Coord(p), selectedMarkerKey, { ctrlKey, shiftKey });
    }, [coord2Pixel, markers, onClickPoint, pixel2Coord]);
    const { onMouseMove, onMouseDown, onMouseUp, onMouseLeave, paintDragSelectLayer } = useDragSelectLayer(width, height, handleSelectRect, handleClickPoint);
    const dragSelectCanvas = useMemo(() => {
        return _jsx(BaseCanvas, { width: width, height: height, draw: paintDragSelectLayer, drawData: emptyDrawData });
    }, [width, height, paintDragSelectLayer]);
    return (_jsxs("div", Object.assign({ style: { width, height, position: 'relative' }, onMouseDown: onMouseDown, onMouseMove: onMouseMove, onMouseUp: onMouseUp, onMouseLeave: onMouseLeave }, { children: [_jsx(ScatterPlotMainLayer, { markers: markers, margins: margins, coord2Pixel: coord2Pixel, width: width, height: height }), dragSelectCanvas] })));
};
const transformRect = (t, r) => {
    const p0 = t({ x: r.x, y: r.y });
    const p1 = t({ x: r.x + r.width, y: r.y + r.height });
    return {
        x: Math.min(p0.x, p1.x),
        y: Math.min(p0.y, p1.y),
        width: Math.abs(p1.x - p0.x),
        height: Math.abs(p1.y - p0.y)
    };
};
export default ScatterPlot;
//# sourceMappingURL=ScatterPlot.js.map