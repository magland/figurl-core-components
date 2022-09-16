import { FunctionComponent } from 'react';
import { Margins } from './BarPlot';
export declare type BarBox = {
    key: string | number;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    tooltip: string;
    color: string;
};
export declare type BarPlotTick = {
    x: number;
    label: string;
};
export declare type BarPlotVerticalLine = {
    x: number;
    color: string;
};
declare type Props = {
    barBoxes: BarBox[];
    margins: Margins;
    pixelTicks?: BarPlotTick[];
    pixelVerticalLines?: BarPlotVerticalLine[];
    xLabel?: string;
    width: number;
    height: number;
};
declare const BarPlotMainLayer: FunctionComponent<Props>;
export default BarPlotMainLayer;
