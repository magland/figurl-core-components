/// <reference types="react" />
import { Vec2 } from "./Geometry";
export interface DrawingHelloWorldProps {
    width: number;
    height: number;
    dataPoints: Vec2[];
}
declare const DrawingHelloWorld: (props: DrawingHelloWorldProps) => JSX.Element;
export declare const DrawingHelloWorldClicks: (props: DrawingHelloWorldProps) => JSX.Element;
export declare const DrawingHelloWorldDragRect: (props: DrawingHelloWorldProps) => JSX.Element;
export default DrawingHelloWorld;
