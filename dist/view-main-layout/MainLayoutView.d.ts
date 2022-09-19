import { ViewComponentProps } from '../core-view-component-props';
import { FunctionComponent } from 'react';
import { MainLayoutViewData } from './MainLayoutViewData';
declare type Props = {
    data: MainLayoutViewData;
    ViewComponent: FunctionComponent<ViewComponentProps>;
    width: number;
    height: number;
};
declare const MainLayoutView: FunctionComponent<Props>;
export default MainLayoutView;
