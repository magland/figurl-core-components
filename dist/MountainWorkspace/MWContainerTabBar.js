import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Tab, Tabs } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from "@material-ui/icons/Close";
import { useCallback, useEffect, useMemo } from 'react';
const MWContainerTabBar = ({ views, currentView, onCurrentViewChanged, onViewClosed, active }) => {
    useEffect(() => {
        const i = currentView ? views.indexOf(currentView) : -1;
        if (i < 0) {
            if (views.length > 0) {
                onCurrentViewChanged(views[0]);
            }
        }
    }, [currentView, onCurrentViewChanged, views]);
    const handleClickView = useCallback((v) => {
        onCurrentViewChanged(v);
    }, [onCurrentViewChanged]);
    let currentIndex = currentView ? views.indexOf(currentView) : null;
    if (currentIndex === -1)
        currentIndex = null;
    const classes = ['ViewContainerTabBar'];
    if (active)
        classes.push('active');
    const opts = useMemo(() => (views.map((v, i) => ({ selected: (i === (currentIndex || 0)) }))), [views, currentIndex]);
    return (_jsx(Tabs, Object.assign({ value: currentIndex || 0, 
        // onChange={handleChange}
        scrollButtons: "auto", variant: "scrollable", className: classes.join(' ') }, { children: views.map((v, i) => (_jsx(ViewContainerTab, { view: v, onClick: handleClickView, onClose: onViewClosed, opts: opts[i] }, i))) })));
};
const ViewContainerTab = ({ view, onClose, opts, onClick }) => {
    // thanks: https://stackoverflow.com/questions/63265780/react-material-ui-tabs-close/63277341#63277341
    // thanks also: https://www.freecodecamp.org/news/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a/
    const icon = useMemo(() => (view.plugin.icon || _jsx(CheckBoxOutlineBlankIcon, {})), [view.plugin.icon]);
    const handleClick = useCallback(() => {
        onClick(view);
    }, [onClick, view]);
    const label = (_jsxs("div", Object.assign({ style: { whiteSpace: 'nowrap' }, draggable: true, onDragStart: (e) => { e.dataTransfer.setData('viewId', view.viewId); }, onClick: handleClick }, { children: [_jsx(icon.type, Object.assign({}, icon.props, { style: { paddingRight: 5, paddingLeft: 3, paddingTop: 0, width: 20, height: 20, display: 'inline', verticalAlign: 'middle' } })), _jsx("span", Object.assign({ style: { display: 'inline', verticalAlign: 'middle' } }, { children: view.label })), _jsx("span", { children: "\u00A0" }), _jsx(IconButton, Object.assign({ component: "div", onClick: () => onClose(view), className: "CloseButton", style: { padding: 0 } }, { children: _jsx(CloseIcon, { style: {
                        display: 'inline',
                        verticalAlign: 'middle',
                        fontSize: 20
                    } }) }))] })));
    const style = useMemo(() => (opts.selected ? { color: 'black', fontWeight: 'bold' } : { color: 'gray' }), [opts.selected]);
    return (_jsx(Tab, { label: label, className: "Tab", style: style }, view.viewId));
};
export default MWContainerTabBar;
//# sourceMappingURL=MWContainerTabBar.js.map