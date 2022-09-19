import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import LayoutItemView from "./LayoutItemView";
export const computeSizes = (totalSize, // undefined means we're using a scrollbar
itemCount, itemProperties) => {
    while (itemProperties.length < itemCount) {
        itemProperties.push({});
    }
    let ret = [];
    let remainingSize = totalSize || 0;
    for (let x of itemProperties) {
        ret.push(x.minSize || 0);
        remainingSize -= x.minSize || 0;
    }
    if (totalSize !== undefined) {
        while (remainingSize > 1e-3) {
            let totalStretch = 0;
            for (let x of itemProperties) {
                totalStretch += x.stretch ? x.stretch : 1;
            }
            if (totalStretch === 0)
                break;
            const remainingSize0 = remainingSize;
            let somethingChanged = false;
            for (let i = 0; i < itemProperties.length; i++) {
                const s = ret[i];
                const str = itemProperties[i].stretch;
                let newS = s + remainingSize0 * (str ? str : 1) / totalStretch;
                if (itemProperties[i].maxSize !== undefined) {
                    newS = Math.min(newS, itemProperties[i].maxSize || 0);
                }
                if (newS > s) {
                    ret[i] = newS;
                    remainingSize -= (newS - s);
                    somethingChanged = true;
                }
            }
            if (!somethingChanged)
                break;
        }
    }
    return ret;
};
const BoxLayoutItemView = ({ layoutItem, ViewComponent, views, width, height }) => {
    if (layoutItem.type !== 'Box') {
        throw Error('Unexpected');
    }
    const { direction, scrollbar, items, itemProperties, showTitles } = layoutItem;
    const itemPositions = useMemo(() => {
        var _a, _b;
        if (direction === 'horizontal') {
            const ret = [];
            const itemWidths = computeSizes(!scrollbar ? width : undefined, items.length, itemProperties || []);
            let x = 0;
            for (let i = 0; i < items.length; i++) {
                ret.push({
                    left: x,
                    top: 0,
                    width: itemWidths[i],
                    height,
                    title: (_a = (itemProperties || [])[i]) === null || _a === void 0 ? void 0 : _a.title
                });
                x += itemWidths[i];
            }
            return ret;
        }
        else {
            const ret = [];
            const itemHeights = computeSizes(!scrollbar ? height : undefined, items.length, itemProperties || []);
            let y = 0;
            for (let i = 0; i < items.length; i++) {
                ret.push({
                    left: 0,
                    top: y,
                    width,
                    height: itemHeights[i],
                    title: (_b = (itemProperties || [])[i]) === null || _b === void 0 ? void 0 : _b.title
                });
                y += itemHeights[i];
            }
            return ret;
        }
    }, [direction, items, width, height, itemProperties, scrollbar]);
    const divStyle = useMemo(() => {
        const ret = {
            position: 'absolute',
            left: 0,
            top: 0,
            width,
            height
        };
        if (scrollbar) {
            if (direction === 'horizontal') {
                ret.overflowX = 'auto';
                ret.overflowY = 'hidden';
            }
            else if (direction === 'vertical') {
                ret.overflowY = 'auto';
                ret.overflowX = 'hidden';
            }
        }
        else {
            ret.overflow = 'hidden';
        }
        return ret;
    }, [scrollbar, width, height, direction]);
    const titleFontSize = direction === 'vertical' ? 25 : 20;
    const titleDim = titleFontSize + 3;
    return (_jsx("div", Object.assign({ style: divStyle }, { children: items.map((item, i) => {
            const p = itemPositions[i];
            let titleBox = { left: 0, top: 0, width: 0, height: 0 };
            let itemBox = { left: 0, top: 0, width: p.width, height: p.height };
            if (showTitles) {
                if (direction === 'horizontal') {
                    titleBox = { left: 0, top: 0, width: p.width, height: titleDim };
                    itemBox = { left: 0, top: titleDim, width: p.width, height: p.height - titleDim };
                }
                else if (direction === 'vertical') {
                    titleBox = { left: 0, top: 0, width: titleDim, height: p.height };
                    itemBox = { left: titleDim, top: 0, width: p.width - titleDim, height: p.height };
                }
            }
            const itemView = (_jsx(LayoutItemView, { layoutItem: item, ViewComponent: ViewComponent, views: views, width: itemBox.width, height: itemBox.height }));
            const titleRotationStyle = direction === 'horizontal' ? {} : {
                writingMode: 'vertical-lr',
                transform: 'rotate(-180deg)',
            };
            return (_jsx("div", Object.assign({ style: { position: 'absolute', left: p.left, top: p.top, width: p.width, height: p.height } }, { children: showTitles ? (_jsxs("span", { children: [_jsx("div", Object.assign({ style: Object.assign(Object.assign({ position: 'absolute', textAlign: 'center', fontSize: titleFontSize }, titleBox), titleRotationStyle) }, { children: p.title || '' })), _jsx("div", Object.assign({ style: Object.assign({ position: 'absolute' }, itemBox) }, { children: itemView }))] })) : (itemView) }), i));
        }) })));
};
export default BoxLayoutItemView;
//# sourceMappingURL=BoxLayoutItemView.js.map