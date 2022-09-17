import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import TabWidgetTabBar from "./TabWidgetTabBar";
// needs to correspond to css (not best system) - see mountainview.css
const tabBarHeight = 30 + 5;
const TabWidget = ({ children, tabs, width, height }) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(undefined);
    const children2 = children;
    if ((children2 || []).length !== tabs.length) {
        throw Error('TabWidget: incorrect number of tabs');
    }
    const hMargin = 8;
    const vMargin = 8;
    const W = (width || 300) - hMargin * 2;
    const H = height - vMargin * 2;
    return (_jsxs("div", Object.assign({ style: { position: 'absolute', left: hMargin, top: vMargin, width: W, height: H, overflow: 'hidden' }, className: "TabWidget" }, { children: [_jsx("div", Object.assign({ style: { position: 'absolute', left: 0, top: 0, width: W, height: tabBarHeight } }, { children: _jsx(TabWidgetTabBar, { tabs: tabs, currentTabIndex: currentTabIndex, onCurrentTabIndexChanged: setCurrentTabIndex, onTabClosed: () => { } }) }), "tabwidget-bar"), children2.map((c, i) => {
                const visible = i === currentTabIndex;
                return (_jsx("div", Object.assign({ style: { visibility: visible ? 'visible' : 'hidden', overflowY: 'hidden', overflowX: 'hidden', position: 'absolute', left: 0, top: tabBarHeight, width: W, height: H } }, { children: _jsx(c.type, Object.assign({}, c.props, { width: W, height: H - tabBarHeight })) }), `child-${i}`));
            })] })));
};
export default TabWidget;
//# sourceMappingURL=TabWidget.js.map