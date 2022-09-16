import { Margins } from '../figurl-canvas';
import { Matrix } from 'mathjs';
export declare const nullTransformMatrix: import("mathjs").Matrix;
/**
 * @param pixelWidth Width of the drawing space, in pixels. This *includes* the margins (which will be subtracted internally).
 * @param pixelHeight Height of the drawing space, in pixels. Highest values will be at the visual bottom of the panel.
 * @param margins Pixel dimensions for offsets that establish the drawing space within the Canvas' width and height.
 * @param xmin Minimum observed x-value in the data.
 * @param xmax Maximum observed x-value in the data.
 * @param ymin Minimum observed y-value in the data.
 * @param ymax Maximum observed y-value in the data.
 * @param invertY Default true. If set, the returned matrix will flip the y-axis so that the origin is in the lower (not upper) left corner of the canvas.
 * You probably want this.
 * @param preserveDataAspect Default true. If set, the returned matrix will ensure that the effective drawing space matches the aspect ratio of the
 * input data. You probably want this, but might not.
 */
export declare type TwoDTransformProps = {
    pixelWidth: number;
    pixelHeight: number;
    margins: Margins;
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    invertY?: boolean;
    preserveDataAspect?: boolean;
};
/**
 * @param preserveDataAspect (Optional) If false, this hook is a no-op.
 * @param pixelWidth Width of the available drawing canvas, in pixels.
 * @param pixelHeight Height of the available drawing canvas, in pixles.
 * @param margins Desired minimal margins for the drawing space, in pixels. Any additional margin needed
 * to preserve the aspect ratio of the underlying data will be added to these margins.
 * @param xrange Range of x-values in the native-space data (i.e. xmax - xmin)
 * @param yrange Range of y-values in the native-space data (i.e. ymax - ymin)
 */
export declare type AspectTrimProps = {
    preserveDataAspect?: boolean;
    pixelWidth: number;
    pixelHeight: number;
    margins?: Margins;
    xrange: number;
    yrange: number;
};
export declare const emptyMargins: {
    top: number;
    left: number;
    bottom: number;
    right: number;
};
/**
 * Hook returns an updated set of margins which ensure that the actual drawing space will be a rectangle that preserves
 * the aspect ratio of the underlying data set. The margins also ensure the resulting rectangle is centered in the
 * available canvas space.
 *
 * @param props
 * @returns Final set of margins that correctly size and position the drawing space, centered in the canvas.
 */
export declare const useAspectTrimming: (props: AspectTrimProps) => Margins;
/**
 * Returns a (memoized) transformation matrix mapping from data units to the pixel units for a given-sized Canvas panel.
 * The panel is assumed to run from [0, panelWidth] in the x-direction and [panelHeight, 0] in the y-direction.
 *
 * @param props The properties of the data to be projected and the drawing space to project it into.
 *
 * @returns Transformation matrix that can left-multiply an [[xs], [ys], [1]] augmented data matrix to yield the corresponding pixel positions.
 */
export declare const use2DTransformationMatrix: (props: TwoDTransformProps) => Matrix;
