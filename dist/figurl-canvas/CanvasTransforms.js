import { matrix } from 'mathjs';
import { useMemo } from 'react';
// TODO: Other canvas transform computation code (e.g. in TimeScrollView) should be combined in here
// TODO: Delete the equivalent stuff out of Geometry.ts, it was overbuilt
export const nullTransformMatrix = matrix([[0, 0, 0], [0, 0, 0]]);
export const emptyMargins = { top: 0, left: 0, bottom: 0, right: 0 };
/**
 * Hook returns an updated set of margins which ensure that the actual drawing space will be a rectangle that preserves
 * the aspect ratio of the underlying data set. The margins also ensure the resulting rectangle is centered in the
 * available canvas space.
 *
 * @param props
 * @returns Final set of margins that correctly size and position the drawing space, centered in the canvas.
 */
export const useAspectTrimming = (props) => {
    const { preserveDataAspect, pixelHeight, pixelWidth, margins, xrange, yrange } = props;
    const baseMargins = margins || emptyMargins;
    return useMemo(() => {
        if (pixelWidth === undefined || pixelWidth === 0 || pixelHeight === undefined || pixelHeight === 0 || xrange <= 0 || yrange <= 0) {
            // TODO: Warn about this? Or is it expected?
            return baseMargins;
        }
        if (preserveDataAspect === undefined || preserveDataAspect) {
            const dataAspect = xrange / yrange;
            const effectiveCanvasWidth = pixelWidth - baseMargins.left - baseMargins.right;
            const effectiveCanvasHeight = pixelHeight - baseMargins.top - baseMargins.bottom;
            const canvasAspect = effectiveCanvasWidth / effectiveCanvasHeight;
            if (dataAspect > canvasAspect) {
                // data width / data height > canvasx / canvas y --> trim canvas height
                const rightHeight = effectiveCanvasWidth / dataAspect;
                const trimAmt = Math.floor((effectiveCanvasHeight - rightHeight) / 2);
                return Object.assign(Object.assign({}, baseMargins), { top: baseMargins.top + trimAmt, bottom: baseMargins.bottom + trimAmt });
            }
            else if (dataAspect < canvasAspect) {
                // datax / datay < canvasx / canvasy --> trim canvas width
                const rightWidth = effectiveCanvasHeight * dataAspect;
                const trimAmt = Math.floor((effectiveCanvasWidth - rightWidth) / 2);
                return Object.assign(Object.assign({}, baseMargins), { left: baseMargins.left + trimAmt, right: baseMargins.right + trimAmt });
            }
        }
        return baseMargins;
    }, [baseMargins, pixelHeight, pixelWidth, preserveDataAspect, xrange, yrange]);
};
/**
 * Returns a (memoized) transformation matrix mapping from data units to the pixel units for a given-sized Canvas panel.
 * The panel is assumed to run from [0, panelWidth] in the x-direction and [panelHeight, 0] in the y-direction.
 *
 * @param props The properties of the data to be projected and the drawing space to project it into.
 *
 * @returns Transformation matrix that can left-multiply an [[xs], [ys], [1]] augmented data matrix to yield the corresponding pixel positions.
 */
export const use2DTransformationMatrix = (props) => {
    const { pixelWidth, pixelHeight, margins, xmin, xmax, ymin, ymax, invertY, preserveDataAspect } = props;
    const _invertY = invertY === undefined ? true : invertY;
    const xrange = (xmax - xmin);
    const yrange = (ymax - ymin);
    const finalMargins = useAspectTrimming({ preserveDataAspect, pixelWidth, pixelHeight, xrange, yrange, margins });
    return useMemo(() => {
        if (pixelWidth === undefined || pixelWidth === 0 || pixelHeight === undefined || pixelHeight === 0) {
            console.warn('Attempt to compute drawing matrix with degenerate canvas shape.');
            return nullTransformMatrix;
        }
        if (xmax <= xmin || ymax <= ymin) {
            console.warn('Error creating drawing matrix: data has a nonpositive range in one or both dimensions.');
            return nullTransformMatrix;
        }
        const xScale = (pixelWidth - finalMargins.left - finalMargins.right) / (xrange);
        const xOffset = (xmin * -xScale) + finalMargins.left;
        const yScale = (_invertY ? -1 : 1) * (pixelHeight - finalMargins.top - finalMargins.bottom) / (yrange);
        const yOffset = (-yScale * (_invertY ? ymax : ymin)) + finalMargins.top;
        // TODO: Something about user scaling for zoom?
        return matrix([[xScale, 0, xOffset],
            [0, yScale, yOffset]]);
    }, [pixelWidth, pixelHeight, xmax, xmin, ymax, ymin, finalMargins.left, finalMargins.right, finalMargins.top, finalMargins.bottom, xrange, _invertY, yrange]);
};
//# sourceMappingURL=CanvasTransforms.js.map