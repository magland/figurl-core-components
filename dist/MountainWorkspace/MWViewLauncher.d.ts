import { FunctionComponent } from 'react';
import { MWViewPlugin } from './MWViewPlugin';
declare type Props = {
    onLaunchView: (plugin: MWViewPlugin) => void;
    plugins: MWViewPlugin[];
};
declare const MWViewLauncher: FunctionComponent<Props>;
export default MWViewLauncher;
