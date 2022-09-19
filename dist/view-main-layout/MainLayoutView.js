import { jsx as _jsx } from "react/jsx-runtime";
import LayoutItemView from './LayoutItemView';
const MainLayoutView = ({ data, ViewComponent, width, height }) => {
    const { layout, views } = data;
    return (_jsx(LayoutItemView, { layoutItem: layout, ViewComponent: ViewComponent, views: views, width: width, height: height }));
};
export default MainLayoutView;
//# sourceMappingURL=MainLayoutView.js.map