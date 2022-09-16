import { FunctionComponent } from 'react';
declare type Props = {
    tabs: {
        label: string;
    }[];
    currentTabIndex: number | undefined;
    onCurrentTabIndexChanged: (i: number) => void;
    onTabClosed: (i: number) => void;
};
declare const TabWidgetTabBar: FunctionComponent<Props>;
export default TabWidgetTabBar;
