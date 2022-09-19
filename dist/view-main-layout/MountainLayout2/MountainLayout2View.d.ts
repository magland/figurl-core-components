import { ViewComponentProps } from '../../core-view-component-props';
import { FunctionComponent } from 'react';
import { MountainLayout2ViewData } from './MountainLayout2ViewData';
declare type Props = {
    data: MountainLayout2ViewData;
    ViewComponent: FunctionComponent<ViewComponentProps>;
    hideCurationControl?: boolean;
    width: number;
    height: number;
};
declare const MountainLayout2View: FunctionComponent<Props>;
export declare const feedIdForUri: (uri: string) => string;
export default MountainLayout2View;
