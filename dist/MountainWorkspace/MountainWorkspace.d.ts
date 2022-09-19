import { FunctionComponent } from 'react';
import { MWViewPlugin } from './MWViewPlugin';
import { ViewComponentProps } from '../core-view-component-props';
declare type Props = {
    viewPlugins: MWViewPlugin[];
    viewProps: {
        [key: string]: any;
    };
    ViewComponent: FunctionComponent<ViewComponentProps>;
    hideCurationControl?: boolean;
    controlViewPlugins: MWViewPlugin[];
    width: number;
    height: number;
};
declare const MountainWorkspace: FunctionComponent<Props>;
export default MountainWorkspace;
