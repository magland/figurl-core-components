/// <reference types="react" />
export interface MWViewPlugin {
    name: string;
    label: string;
    component: React.FunctionComponent<any>;
    singleton: boolean;
    icon?: any;
    additionalProps?: {
        [key: string]: any;
    };
}
export declare class MWView {
    plugin: MWViewPlugin;
    extraProps: {
        [key: string]: any;
    };
    label: string;
    viewId: string;
    activate: boolean;
    area: 'north' | 'south' | '';
    constructor(plugin: MWViewPlugin, extraProps: {
        [key: string]: any;
    }, label: string, viewId: string);
}
