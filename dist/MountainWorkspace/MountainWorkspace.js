import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import Expandable from './components/Expandable/Expandable';
import { useCallback, useReducer } from 'react';
import openViewsReducer from './openViewsReducer';
import MWViewContainer from './MWContainer';
import MWViewLauncher from './MWViewLauncher';
import MWViewWidget from './MWViewWidget';
// import MWCurationControl from './MWCurationControl';
import { Splitter } from '../component-splitter';
const initialLeftPanelWidth = 320;
const MountainWorkspace = ({ width, height, viewPlugins, ViewComponent, viewProps, hideCurationControl, controlViewPlugins }) => {
    const [openViews, openViewsDispatch] = useReducer(openViewsReducer, []);
    const launchIcon = _jsx("span", Object.assign({ style: { color: 'gray' } }, { children: _jsx(OpenInBrowserIcon, {}) }));
    const handleLaunchView = useCallback((plugin) => {
        openViewsDispatch({
            type: 'AddView',
            plugin,
            label: plugin.label,
            area: ''
        });
    }, [openViewsDispatch]);
    const handleViewClosed = useCallback((v) => {
        openViewsDispatch({
            type: 'CloseView',
            view: v
        });
    }, [openViewsDispatch]);
    const handleSetViewArea = useCallback((view, area) => {
        openViewsDispatch({
            type: 'SetViewArea',
            viewId: view.viewId,
            area
        });
    }, [openViewsDispatch]);
    return (_jsxs(Splitter, Object.assign({ width: width, height: height, initialPosition: initialLeftPanelWidth }, { children: [_jsxs("div", { children: [_jsx(Expandable, Object.assign({ icon: launchIcon, label: "Open views", defaultExpanded: true, unmountOnExit: false }, { children: _jsx(MWViewLauncher, { onLaunchView: handleLaunchView, plugins: viewPlugins }) })), controlViewPlugins.map(v => (_jsx(Expandable, Object.assign({ icon: launchIcon, label: v.label, defaultExpanded: true, unmountOnExit: false }, { children: _jsx(MWViewWrapper, { viewPlugin: v, ViewComponent: ViewComponent }) }), v.name)))] }), _jsx(MWViewContainer, Object.assign({ onViewClosed: handleViewClosed, onSetViewArea: handleSetViewArea, views: openViews, width: 0, height: 0 }, { children: openViews.map(v => (_jsx(MWViewWidget, { view: v, viewProps: viewProps }, v.viewId))) }))] })));
};
const MWViewWrapper = ({ viewPlugin }) => {
    const p = viewPlugin;
    const Component = p.component;
    return (_jsx(Component, Object.assign({}, (p.additionalProps || {}))));
};
export default MountainWorkspace;
//# sourceMappingURL=MountainWorkspace.js.map