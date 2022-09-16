import { FunctionComponent } from 'react';
export declare type ScatterPlotMarker = {
    key: string | number;
    x: number;
    y: number;
    tooltip: string;
    color: string;
    radius: number;
};
declare type Props = {
    width: number;
    height: number;
    markers: ScatterPlotMarker[];
    onSelectRect?: (r: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, selectedMarkerKeys: (string | number)[], o: {
        ctrlKey: boolean;
        shiftKey: boolean;
    }) => void;
    onClickPoint?: (p: {
        x: number;
        y: number;
    }, markerKey: string | number | undefined, o: {
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
declare const ScatterPlot: FunctionComponent<Props>;
export default ScatterPlot;
