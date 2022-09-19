import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useCallback } from 'react';
const buttonStyle = {
    fontSize: 12,
    padding: 4,
    margin: 1
};
const MWViewLauncher = ({ onLaunchView, plugins }) => {
    return (_jsx(Fragment, { children: _jsx("div", Object.assign({ style: { flexFlow: 'wrap' } }, { children: plugins.map(p => (_jsx(MWLaunchViewButton, { plugin: p, onLaunch: onLaunchView }, p.name))) }), "views") }));
};
const MWLaunchViewButton = ({ plugin, onLaunch }) => {
    const handleClick = useCallback(() => {
        onLaunch(plugin);
    }, [onLaunch, plugin]);
    return (_jsxs("button", Object.assign({ onClick: handleClick, style: buttonStyle }, { children: [plugin.icon && (_jsx(plugin.icon.type, Object.assign({}, plugin.icon.props, { style: { height: 14, width: 14, paddingRight: 2, paddingTop: 0 } }))), plugin.label] })));
};
export default MWViewLauncher;
//# sourceMappingURL=MWViewLauncher.js.map