import { FunctionComponent } from 'react';
import { Margins, ScatterPlotMarker } from './ScatterPlot';
declare type Props = {
    markers: ScatterPlotMarker[];
    margins: Margins;
    coord2Pixel: (p: {
        x: number;
        y: number;
    }) => {
        x: number;
        y: number;
    };
    width: number;
    height: number;
};
declare const ScatterPlotMainLayer: FunctionComponent<Props>;
export default ScatterPlotMainLayer;
