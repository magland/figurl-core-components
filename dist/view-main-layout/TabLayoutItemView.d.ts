import { FunctionComponent } from "react";
import { LayoutItem, MLView } from "./MainLayoutViewData";
import { ViewComponentProps } from "../core-view-component-props";
declare type Props = {
    layoutItem: LayoutItem;
    ViewComponent: FunctionComponent<ViewComponentProps>;
    views: MLView[];
    width: number;
    height: number;
};
declare const TabLayoutItemView: FunctionComponent<Props>;
export default TabLayoutItemView;
