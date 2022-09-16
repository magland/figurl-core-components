import React from "react";
import { Vec2, Vec4 } from "./Geometry";
export interface DragState {
    isActive: boolean;
    dragAnchor?: Vec2;
    dragRect?: Vec4;
    shift?: boolean;
}
export declare type DragActionType = 'COMPUTE_DRAG' | 'END_DRAG' | 'RESET_DRAG' | 'PARTIAL';
export interface DragAction {
    type: DragActionType;
    mouseButtonIsDown?: boolean;
    point?: Vec2;
    shift?: boolean;
}
export declare const COMPUTE_DRAG: DragActionType;
export declare const END_DRAG: DragActionType;
export declare const RESET_DRAG: DragActionType;
export declare const INCOMPLETE_ACTION: DragActionType;
export declare const getDragActionFromEvent: (e: React.MouseEvent) => DragAction;
export declare const dragReducer: (state: DragState, action: DragAction) => DragState;
interface DebounceProps {
    nextDragStateUpdate: React.MutableRefObject<DragAction | null>;
    nextFrame: React.MutableRefObject<number>;
    reducer: (props: any) => any;
    reducerOtherProps: any;
}
export declare const handleMouseMoveIfDragging: (e: React.MouseEvent, delegatedProps: DebounceProps) => boolean;
export declare const handleMouseDownIfDragging: (e: React.MouseEvent, delegatedProps: DebounceProps) => void;
export declare const handleMouseUpIfDragging: (e: React.MouseEvent, delegatedProps: DebounceProps) => void;
interface DragCanvasProps {
    width: number;
    height: number;
    newState: DragState;
    dragStyle?: string;
}
declare const DragCanvas: (props: DragCanvasProps) => JSX.Element;
export default DragCanvas;
