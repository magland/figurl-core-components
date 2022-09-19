import { FunctionComponent, PropsWithChildren } from 'react';
import { MWView } from './MWViewPlugin';
declare type Props = {
    views: MWView[];
    onViewClosed: (v: MWView) => void;
    onSetViewArea: (v: MWView, area: 'north' | 'south') => void;
    width: number;
    height: number;
};
declare const MWContainer: FunctionComponent<PropsWithChildren<Props>>;
export default MWContainer;
