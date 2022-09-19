import { FunctionComponent, PropsWithChildren } from 'react';
interface Props {
    label: string;
    defaultExpanded?: boolean;
    icon?: JSX.Element;
    unmountOnExit?: boolean;
}
export declare const Expandable: FunctionComponent<PropsWithChildren<Props>>;
export default Expandable;
