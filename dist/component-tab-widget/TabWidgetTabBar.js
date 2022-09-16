import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Tab, Tabs } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from "@material-ui/icons/Close";
import { useCallback, useEffect, useMemo } from 'react';
const TabWidgetTabBar = ({ tabs, currentTabIndex, onCurrentTabIndexChanged, onTabClosed }) => {
    useEffect(() => {
        if (currentTabIndex === undefined) {
            if (tabs.length > 0) {
                onCurrentTabIndexChanged(0);
            }
        }
    }, [currentTabIndex, onCurrentTabIndexChanged, tabs.length]);
    const handleClickTab = useCallback((index) => {
        onCurrentTabIndexChanged(index);
    }, [onCurrentTabIndexChanged]);
    const classes = ['ViewContainerTabBar'];
    const opts = useMemo(() => (tabs.map((tab, i) => ({ selected: (i === currentTabIndex) }))), [tabs, currentTabIndex]);
    return (_jsx(Tabs, Object.assign({ value: currentTabIndex || 0, scrollButtons: "auto", variant: "scrollable", className: classes.join(' ') }, { children: tabs.map((tab, i) => (_jsx(TabWidgetTab, { tab: tab, tabIndex: i, onClick: handleClickTab, onClose: onTabClosed, opts: opts[i] }, i))) })));
};
const TabWidgetTab = ({ tab, onClose, opts, onClick, tabIndex }) => {
    // thanks: https://stackoverflow.com/questions/63265780/react-material-ui-tabs-close/63277341#63277341
    // thanks also: https://www.freecodecamp.org/news/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a/
    const icon = useMemo(() => (_jsx(CheckBoxOutlineBlankIcon, {})), []);
    const handleClick = useCallback(() => {
        onClick(tabIndex);
    }, [onClick, tabIndex]);
    const label = (_jsxs("div", Object.assign({ style: { whiteSpace: 'nowrap' }, 
        // draggable
        // onDragStart={(e) => {e.dataTransfer.setData('viewId', view.viewId);}}
        onClick: handleClick }, { children: [_jsx(icon.type, Object.assign({}, icon.props, { style: { paddingRight: 5, paddingLeft: 3, paddingTop: 0, width: 20, height: 20, display: 'inline', verticalAlign: 'middle' } })), _jsx("span", Object.assign({ style: { display: 'inline', verticalAlign: 'middle' } }, { children: tab.label })), _jsx("span", { children: "\u00A0" }), _jsx(IconButton, Object.assign({ component: "div", onClick: () => onClose(tabIndex), className: "CloseButton", style: { padding: 0 } }, { children: _jsx(CloseIcon, { style: {
                        display: 'inline',
                        verticalAlign: 'middle',
                        fontSize: 20
                    } }) }))] })));
    const style = useMemo(() => (opts.selected ? { color: 'black', fontWeight: 'bold' } : { color: 'gray' }), [opts.selected]);
    return (_jsx(Tab, { label: label, className: "Tab", style: style }, tabIndex));
};
export default TabWidgetTabBar;
//# sourceMappingURL=TabWidgetTabBar.js.map