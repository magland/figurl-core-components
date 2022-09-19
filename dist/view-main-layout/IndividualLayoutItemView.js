import { jsx as _jsx } from "react/jsx-runtime";
import { useFileData } from "@figurl/interface";
import { ProgressComponent } from "../component-progress";
import { useEffect, useMemo, useState } from "react";
const IndividualLayoutItemView = ({ layoutItem, ViewComponent, views, width, height }) => {
    if (layoutItem.type !== 'View') {
        throw Error('Unexpected');
    }
    const { viewId } = layoutItem;
    const view = views.filter(v => (v.viewId === viewId))[0];
    if (!view)
        throw Error(`View not found ${viewId}`);
    const { fileData: figureData, progress, errorMessage } = useFileData(view.dataUri);
    const [progressValue, setProgressValue] = useState(undefined);
    useEffect(() => {
        progress.onProgress(({ loaded, total }) => {
            setProgressValue({ loaded, total });
        });
    }, [progress]);
    const opts = useMemo(() => ({}), []);
    if (!figureData) {
        return (_jsx("div", Object.assign({ style: { width, height } }, { children: errorMessage ? errorMessage : (_jsx(ProgressComponent, { loaded: progressValue === null || progressValue === void 0 ? void 0 : progressValue.loaded, total: progressValue === null || progressValue === void 0 ? void 0 : progressValue.total })) })));
    }
    return (_jsx(ViewComponent, { data: figureData, opts: opts, width: width, height: height }));
};
export default IndividualLayoutItemView;
//# sourceMappingURL=IndividualLayoutItemView.js.map