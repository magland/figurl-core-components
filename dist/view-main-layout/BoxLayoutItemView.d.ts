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
export declare const computeSizes: (totalSize: number | undefined, itemCount: number, itemProperties: {
    minSize?: number;
    maxSize?: number;
    stretch?: number;
}[]) => number[];
declare const BoxLayoutItemView: FunctionComponent<Props>;
export default BoxLayoutItemView;
