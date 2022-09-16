import { FunctionComponent } from 'react';
import { BarPlotTick, BarPlotVerticalLine } from './BarPlotMainLayer';
export declare type BarPlotBar = {
    key: string | number;
    xStart: number;
    xEnd: number;
    height: number;
    tooltip: string;
    color: string;
};
declare type Props = {
    width: number;
    height: number;
    bars: BarPlotBar[];
    ticks?: BarPlotTick[];
    verticalLines?: BarPlotVerticalLine[];
    xLabel?: string;
    onSelectRect?: (r: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, selectedBarKeys: (string | number)[], o: {
        ctrlKey: boolean;
        shiftKey: boolean;
    }) => void;
};
export declare type Margins = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};
declare const BarPlot: FunctionComponent<Props>;
export default BarPlot;
