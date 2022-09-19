import { FunctionComponent } from 'react';
import { MWView } from './MWViewPlugin';
declare type Props = {
    view: MWView;
    viewProps: {
        [key: string]: any;
    };
    width?: number;
    height?: number;
};
declare const MWViewWidget: FunctionComponent<Props>;
export default MWViewWidget;
