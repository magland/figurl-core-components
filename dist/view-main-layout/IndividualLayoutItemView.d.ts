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
declare const IndividualLayoutItemView: FunctionComponent<Props>;
export default IndividualLayoutItemView;
