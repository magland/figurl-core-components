import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CircularProgress } from "@material-ui/core";
import { formatByteCount } from "@figurl/core-utils";
const ProgressComponent = ({ loaded, total }) => {
    return (_jsxs("div", { children: [_jsx(CircularProgress, { value: (total) && (loaded !== undefined) ? loaded / total * 100 : 0, variant: total ? "determinate" : "indeterminate" }), total ? (_jsxs("span", { children: ["Loaded ", formatByteCount(loaded || 0), " of ", formatByteCount(total || 0)] })) : _jsx("span", { children: "Waiting for data" })] }));
};
export default ProgressComponent;
//# sourceMappingURL=ProgressComponent.js.map