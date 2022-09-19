import { validateObject } from "@figurl/core-utils";
import { isArrayOf, isEqualTo, isString, optional } from "@figurl/core-utils";
const isMLViewData = (x) => {
    return validateObject(x, {
        label: isString,
        type: isString,
        figureDataSha1: optional(isString),
        figureDataUri: optional(isString) // new
    }, { allowAdditionalFields: true });
};
export const isMountainLayout2ViewData = (x) => {
    return validateObject(x, {
        type: isEqualTo('MountainLayout'),
        views: isArrayOf(isMLViewData),
        controls: optional(isArrayOf(isMLViewData)),
        sortingCurationUri: optional(isString)
    }, { allowAdditionalFields: true });
};
//# sourceMappingURL=MountainLayout2ViewData.js.map