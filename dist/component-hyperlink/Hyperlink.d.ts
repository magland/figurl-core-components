import React, { FunctionComponent, PropsWithChildren } from 'react';
declare type Props = {
    onClick?: () => void;
    href?: string;
    target?: string;
    style?: React.CSSProperties;
};
declare const Hyperlink: FunctionComponent<PropsWithChildren<Props>>;
export default Hyperlink;
