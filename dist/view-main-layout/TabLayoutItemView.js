import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { TabWidget } from "..";
import LayoutItemView from "./LayoutItemView";
const TabLayoutItemView = ({ layoutItem, ViewComponent, views, width, height }) => {
    if (layoutItem.type !== 'TabLayout') {
        throw Error('Unexpected');
    }
    const { items, itemProperties } = layoutItem;
    const tabs = useMemo(() => (itemProperties.map(p => ({
        label: p.label
    }))), [itemProperties]);
    return (_jsx(TabWidget, Object.assign({ tabs: tabs, width: width, height: height }, { children: items.map((item, ii) => (_jsx(LayoutItemView, { layoutItem: item, ViewComponent: ViewComponent, views: views, width: 0, height: 0 }, ii))) })));
};
export default TabLayoutItemView;
//# sourceMappingURL=TabLayoutItemView.js.map