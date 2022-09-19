import { FunctionComponent } from 'react';
import { ViewComponentProps } from '../../core-view-component-props';
declare type Props = {
    figureDataSha1: string;
    figureDataUri: string;
    ViewComponent: FunctionComponent<ViewComponentProps>;
    width: number;
    height: number;
};
declare const ViewWrapper: FunctionComponent<Props>;
export default ViewWrapper;
