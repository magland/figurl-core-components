import { FunctionComponent } from 'react';
import { MWView } from './MWViewPlugin';
declare type Props = {
    views: MWView[];
    currentView: MWView | null;
    onCurrentViewChanged: (v: MWView) => void;
    onViewClosed: (v: MWView) => void;
    active: boolean;
};
declare const MWContainerTabBar: FunctionComponent<Props>;
export default MWContainerTabBar;
