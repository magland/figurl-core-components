export declare type LayoutItem = {
    type: 'Box';
    direction: 'horizontal' | 'vertical';
    scrollbar?: boolean;
    items: LayoutItem[];
    itemProperties?: {
        minSize?: number;
        maxSize?: number;
        stretch?: number;
        title?: string;
    }[];
    showTitles?: boolean;
} | {
    type: 'Splitter';
    direction: 'horizontal' | 'vertical';
    items: LayoutItem[];
    itemProperties?: {
        minSize?: number;
        maxSize?: number;
        stretch?: number;
        title?: string;
    }[];
    showTitles?: boolean;
} | {
    type: 'Mountain';
    items: LayoutItem[];
    itemProperties: {
        label: string;
        isControl?: boolean;
    }[];
} | {
    type: 'TabLayout';
    items: LayoutItem[];
    itemProperties: {
        label: string;
    }[];
} | {
    type: 'View';
    viewId: string;
};
export declare const isLayoutItem: (x: any) => x is LayoutItem;
export declare type MLView = {
    viewId: string;
    type: string;
    dataUri: string;
};
export declare type MainLayoutViewData = {
    type: 'MainLayout';
    views: MLView[];
    layout: LayoutItem;
};
export declare const isMainLayoutViewData: (x: any) => x is MainLayoutViewData;
