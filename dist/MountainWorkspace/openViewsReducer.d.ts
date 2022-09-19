/// <reference types="react" />
import { MWView, MWViewPlugin } from "./MWViewPlugin";
declare type AddViewAction = {
    type: 'AddView';
    plugin: MWViewPlugin;
    label: string;
    area: 'north' | 'south' | '';
    extraProps?: {
        [key: string]: any;
    };
};
declare type CloseViewAction = {
    type: 'CloseView';
    view: MWView;
};
declare type SetViewAreaAction = {
    type: 'SetViewArea';
    viewId: string;
    area: 'north' | 'south';
};
export declare type OpenViewsAction = AddViewAction | CloseViewAction | SetViewAreaAction;
declare const openViewsReducer: React.Reducer<MWView[], OpenViewsAction>;
export declare const JSONStringifyDeterministic: (obj: Object, space?: string | number | undefined) => string;
export default openViewsReducer;
