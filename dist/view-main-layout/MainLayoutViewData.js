import { validateObject } from "@figurl/core-utils";
import { isArrayOf, isBoolean, isEqualTo, isNumber, isOneOf, isString, optional } from "@figurl/core-utils";
export const isLayoutItem = (x) => {
    return isOneOf([
        (y) => (validateObject(y, {
            type: isEqualTo('Box'),
            direction: isOneOf(['horizontal', 'vertical'].map(s => (isEqualTo(s)))),
            showTitles: optional(isBoolean),
            scrollbar: optional(isBoolean),
            items: isArrayOf(isLayoutItem),
            itemProperties: optional(isArrayOf(z => (validateObject(z, {
                minSize: optional(isNumber),
                maxSize: optional(isNumber),
                stretch: optional(isNumber),
                title: optional(isString)
            }))))
        })),
        (y) => (validateObject(y, {
            type: isEqualTo('Splitter'),
            direction: isOneOf(['horizontal', 'vertical'].map(s => (isEqualTo(s)))),
            showTitles: optional(isBoolean),
            items: isArrayOf(isLayoutItem),
            itemProperties: optional(isArrayOf(z => (validateObject(z, {
                minSize: optional(isNumber),
                maxSize: optional(isNumber),
                stretch: optional(isNumber),
                title: optional(isString)
            }))))
        })),
        (y) => (validateObject(y, {
            type: isEqualTo('Mountain'),
            items: isArrayOf(isLayoutItem),
            itemProperties: isArrayOf(z => (validateObject(z, {
                label: isString,
                isControl: optional(isBoolean)
            })))
        })),
        (y) => (validateObject(y, {
            type: isEqualTo('TabLayout'),
            items: isArrayOf(isLayoutItem),
            itemProperties: isArrayOf(z => (validateObject(z, {
                label: isString
            })))
        })),
        (y) => (validateObject(y, {
            type: isEqualTo('View'),
            viewId: isString
        }))
    ])(x);
};
export const isMainLayoutViewData = (x) => {
    return validateObject(x, {
        type: isEqualTo('MainLayout'),
        views: isArrayOf(y => (validateObject(y, {
            viewId: isString,
            type: isString,
            dataUri: isString
        }))),
        layout: isLayoutItem
    });
};
//# sourceMappingURL=MainLayoutViewData.js.map