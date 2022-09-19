import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import MountainLayout2View from "./MountainLayout2/MountainLayout2View";
const MountainLayoutItemView = ({ layoutItem, ViewComponent, views, width, height }) => {
    if (layoutItem.type !== 'Mountain') {
        throw Error('Unexpected');
    }
    const { items, itemProperties } = layoutItem;
    const data = useMemo(() => {
        const views0 = [];
        const controls0 = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const properties = itemProperties[i];
            if (item.type === 'View') {
                const V = views.filter(v => (v.viewId === item.viewId))[0];
                if (!properties.isControl) {
                    views0.push({
                        label: properties.label,
                        type: V.type,
                        figureDataUri: V.dataUri
                    });
                }
                else {
                    controls0.push({
                        label: properties.label,
                        type: V.type,
                        figureDataUri: V.dataUri
                    });
                }
            }
            else {
                throw Error(`Unsupported layout item type for mountain layout: ${item.type}`);
            }
        }
        return {
            type: 'MountainLayout',
            views: views0,
            controls: controls0
        };
    }, [items, itemProperties, views]);
    return (_jsx(MountainLayout2View, { data: data, ViewComponent: ViewComponent, hideCurationControl: true, width: width, height: height }));
};
export default MountainLayoutItemView;
//# sourceMappingURL=MountainLayoutItemView.js.map