import { jsx as _jsx } from "react/jsx-runtime";
import { MountainWorkspace } from '../../MountainWorkspace';
import { useMemo } from 'react';
import ViewWrapper from './ViewWrapper';
const MountainLayout2View = ({ data, ViewComponent, hideCurationControl, width, height }) => {
    const viewPlugins = useMemo(() => (data.views.map((view, ii) => ({
        name: `view-${ii}`,
        label: view.label,
        component: ViewWrapper,
        singleton: true,
        additionalProps: { figureDataSha1: view.figureDataSha1, figureDataUri: view.figureDataUri, ViewComponent }
    }))), [data.views, ViewComponent]);
    const controlViewPlugins = useMemo(() => ((data.controls || []).map((view, ii) => ({
        name: `control-${ii}`,
        label: view.label,
        component: ViewWrapper,
        singleton: true,
        additionalProps: { figureDataSha1: view.figureDataSha1, figureDataUri: view.figureDataUri, ViewComponent }
    }))), [data.controls, ViewComponent]);
    const viewProps = useMemo(() => ({}), []);
    return (_jsx(MountainWorkspace, { viewPlugins: viewPlugins, viewProps: viewProps, ViewComponent: ViewComponent, hideCurationControl: hideCurationControl, controlViewPlugins: controlViewPlugins, width: width, height: height }));
};
export const feedIdForUri = (uri) => {
    return uri.split('/')[2] || 'invalid-feed-uri';
};
export default MountainLayout2View;
//# sourceMappingURL=MountainLayout2View.js.map