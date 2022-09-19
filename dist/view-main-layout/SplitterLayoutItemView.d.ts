import { ViewComponentProps } from "../core-view-component-props";
import { FunctionComponent } from "react";
import { LayoutItem, MLView } from "./MainLayoutViewData";
declare type Props = {
    layoutItem: LayoutItem;
    ViewComponent: FunctionComponent<ViewComponentProps>;
    views: MLView[];
    width: number;
    height: number;
};
declare const SplitterLayoutItemView: FunctionComponent<Props>;
export default SplitterLayoutItemView;
