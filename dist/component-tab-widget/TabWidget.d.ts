import { FunctionComponent, PropsWithChildren } from "react";
declare type Props = {
    tabs: {
        label: string;
    }[];
    width: number;
    height: number;
};
declare const TabWidget: FunctionComponent<PropsWithChildren<Props>>;
export default TabWidget;
