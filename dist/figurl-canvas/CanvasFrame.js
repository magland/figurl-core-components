import { jsx as _jsx } from "react/jsx-runtime";
const CanvasFrame = (props) => {
    const { width, height, canvases, disableHandlers, handlers, leftOffset, topOffset } = props;
    return _jsx("div", Object.assign({ style: {
            width: width,
            height: height,
            position: 'relative',
            left: leftOffset !== null && leftOffset !== void 0 ? leftOffset : 0,
            top: topOffset !== null && topOffset !== void 0 ? topOffset : 0
        } }, (!disableHandlers ? (handlers && Object.assign({}, handlers)) : {}), { children: canvases }));
};
export default CanvasFrame;
//# sourceMappingURL=CanvasFrame.js.map