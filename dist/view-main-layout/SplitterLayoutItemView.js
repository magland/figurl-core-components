import { jsx as _jsx } from "react/jsx-runtime";
import { Splitter } from "../component-splitter";
import { useMemo } from "react";
import { computeSizes } from "./BoxLayoutItemView";
import LayoutItemView from "./LayoutItemView";
const SplitterLayoutItemView = ({ layoutItem, ViewComponent, views, width, height }) => {
    if (layoutItem.type !== 'Splitter') {
        throw Error('Unexpected');
    }
    const { direction, items, itemProperties } = layoutItem;
    if (items.length !== 2) {
        throw Error('Number of items must be 2 for a Splitter layout item');
    }
    const itemPositions = useMemo(() => {
        let itemSizes;
        if (direction === 'horizontal') {
            itemSizes = computeSizes(width, items.length, itemProperties || []);
        }
        else {
            // not used until vertical is implemented
            itemSizes = computeSizes(height, items.length, itemProperties || []);
        }
        const ret = [];
        let x = 0;
        for (let s of itemSizes) {
            ret.push(x);
            x += s;
        }
        return ret;
    }, [direction, items, width, height, itemProperties]);
    const initialSplitterPosition = itemPositions[1];
    // Todo, we need to enforce min/max sizes
    return (_jsx(Splitter, Object.assign({ width: width, height: height, initialPosition: initialSplitterPosition, direction: direction }, { children: items.map((item, ii) => {
            return (_jsx(LayoutItemView, { layoutItem: item, ViewComponent: ViewComponent, views: views, width: 0, height: 0 }, ii));
        }) })));
};
export default SplitterLayoutItemView;
//# sourceMappingURL=SplitterLayoutItemView.js.map