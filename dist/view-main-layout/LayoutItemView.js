import { jsx as _jsx } from "react/jsx-runtime";
import BoxLayoutItemView from "./BoxLayoutItemView";
import IndividualLayoutItemView from "./IndividualLayoutItemView";
import MountainLayoutItemView from "./MountainLayoutItemView";
import SplitterLayoutItemView from "./SplitterLayoutItemView";
import TabLayoutItemView from "./TabLayoutItemView";
const LayoutItemView = ({ layoutItem, ViewComponent, views, width, height }) => {
    return (layoutItem.type === 'Box' ? (_jsx(BoxLayoutItemView, { layoutItem: layoutItem, ViewComponent: ViewComponent, views: views, width: width, height: height })) : layoutItem.type === 'Splitter' ? (_jsx(SplitterLayoutItemView, { layoutItem: layoutItem, ViewComponent: ViewComponent, views: views, width: width, height: height })) : layoutItem.type === 'Mountain' ? (_jsx(MountainLayoutItemView, { layoutItem: layoutItem, ViewComponent: ViewComponent, views: views, width: width, height: height })) : layoutItem.type === 'TabLayout' ? (_jsx(TabLayoutItemView, { layoutItem: layoutItem, ViewComponent: ViewComponent, views: views, width: width, height: height })) : layoutItem.type === 'View' ? (_jsx(IndividualLayoutItemView, { layoutItem: layoutItem, ViewComponent: ViewComponent, views: views, width: width, height: height })) : (_jsx("div", { children: "Unrecognized layout item type" })));
};
export default LayoutItemView;
//# sourceMappingURL=LayoutItemView.js.map