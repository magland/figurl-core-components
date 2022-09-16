import React, { FunctionComponent } from 'react';
export declare const voidClickHandler: (evt: React.MouseEvent) => void;
export declare type PGPlot = {
    key: string | number;
    unitId: string | number;
    label: string | undefined;
    labelColor: string;
    clickHandler?: (evt: React.MouseEvent) => void;
    props: {
        [key: string]: any;
    };
    hideBorderColor?: boolean;
};
declare type Props = {
    plots: PGPlot[];
    plotComponent: React.FunctionComponent<any>;
    selectedPlotKeys?: Set<number | string>;
    numPlotsPerRow?: number;
};
declare const PlotGrid: FunctionComponent<Props>;
export default PlotGrid;
