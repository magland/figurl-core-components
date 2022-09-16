import React, { FunctionComponent } from "react";
declare type Scene2dObjectCommon = {
    objectId: string;
    clickable?: boolean;
    draggable?: boolean;
    selected?: boolean;
};
declare type Scene2dLineObject = Scene2dObjectCommon & {
    type: 'line';
    x: number;
    y: number;
    dx: number;
    dy: number;
    attributes: {
        color: string;
        dash?: number[];
        width?: number;
    };
    selectedAttributes?: {
        color: string;
        dash?: number[];
        width?: number;
    };
};
declare type Scene2dMarkerObject = Scene2dObjectCommon & {
    type: 'marker';
    x: number;
    y: number;
    attributes: {
        fillColor?: string;
        lineColor?: string;
        shape?: 'circle' | 'square';
        radius?: number;
    };
    selectedAttributes?: {
        fillColor?: string;
        lineColor?: string;
        shape?: 'circle' | 'square';
        radius?: number;
    };
};
declare type Scene2dConnectorObject = Scene2dObjectCommon & {
    type: 'connector';
    objectId1: string;
    objectId2: string;
    attributes: {
        color: string;
        dash?: number[];
        width?: number;
    };
};
export declare type Scene2dObject = Scene2dLineObject | Scene2dMarkerObject | Scene2dConnectorObject;
declare type Props = {
    width: number;
    height: number;
    objects: Scene2dObject[];
    onClickObject?: (objectId: string, e: React.MouseEvent) => void;
    onDragObject?: (objectId: string, newPoint: {
        x: number;
        y: number;
    }, e: React.MouseEvent) => void;
    onSelectObjects?: (objectIds: string[], e: React.MouseEvent | undefined) => void;
    onClick?: (p: {
        x: number;
        y: number;
    }, e: React.MouseEvent) => void;
};
declare const Scene2d: FunctionComponent<Props>;
export declare const createObjectId: () => string;
export default Scene2d;
