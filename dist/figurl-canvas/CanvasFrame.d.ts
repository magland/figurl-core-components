/// <reference types="react" />
declare type MaybeCanvas = JSX.Element | boolean;
interface CanvasFrameProps<T extends {}> {
    width: number;
    height: number;
    canvases: MaybeCanvas[];
    disableHandlers?: boolean;
    handlers?: T;
    leftOffset?: number;
    topOffset?: number;
}
declare const CanvasFrame: <T extends {}>(props: CanvasFrameProps<T>) => JSX.Element;
export default CanvasFrame;
