import { FunctionComponent } from "react";
import { LayoutItem, MLView } from "./MainLayoutViewData";
import { ViewComponentProps } from "../core-view-component-props";
declare type Props = {
    layoutItem: LayoutItem;
    views: MLView[];
    ViewComponent: FunctionComponent<ViewComponentProps>;
    width: number;
    height: number;
};
declare const LayoutItemView: FunctionComponent<Props>;
export default LayoutItemView;
