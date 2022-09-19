import { jsx as _jsx } from "react/jsx-runtime";
const MWViewWidget = ({ view, viewProps, width, height }) => {
    const p = view.plugin;
    const Component = p.component;
    let pr = {};
    if (width)
        pr.width = width;
    if (height)
        pr.height = height;
    return (_jsx(Component, Object.assign({}, viewProps, pr, view.extraProps, (p.additionalProps || {}))));
};
export default MWViewWidget;
//# sourceMappingURL=MWViewWidget.js.map