import React, { FunctionComponent, PropsWithChildren } from 'react';
interface Props {
    width: number;
    height: number;
    initialPosition: number;
    positionFromRight?: boolean;
    onChange?: (newPosition: number) => void;
    gripThickness?: number;
    gripInnerThickness?: number;
    gripMargin?: number;
    adjustable?: boolean;
    direction?: 'horizontal' | 'vertical';
}
declare const Splitter: FunctionComponent<PropsWithChildren<Props> & {
    ref?: React.Ref<HTMLDivElement>;
}>;
export default Splitter;
