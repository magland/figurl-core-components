import { TransformationMatrix, Vec2 } from './Geometry';
declare const funcToTransform: (transformation: (p: Vec2) => Vec2) => TransformationMatrix;
export default funcToTransform;
