import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
const VerticalScrollView = ({ width, height, children, disableScroll }) => {
    const divStyle = useMemo(() => ({
        width: width - 20,
        height,
        position: 'relative',
        overflowY: !disableScroll ? 'auto' : 'hidden'
    }), [width, height, disableScroll]);
    return (_jsx("div", Object.assign({ style: divStyle }, { children: children })));
};
export default VerticalScrollView;
//# sourceMappingURL=VerticalScrollView.js.map