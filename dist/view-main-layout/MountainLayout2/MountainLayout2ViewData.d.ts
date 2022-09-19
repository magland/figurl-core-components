export declare type MLViewData = {
    label: string;
    type: string;
    figureDataSha1?: string;
    figureDataUri?: string;
};
export declare type MountainLayout2ViewData = {
    type: 'MountainLayout';
    views: MLViewData[];
    controls?: MLViewData[];
    sortingCurationUri?: string;
};
export declare const isMountainLayout2ViewData: (x: any) => x is MountainLayout2ViewData;
