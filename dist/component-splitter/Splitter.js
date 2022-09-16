import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
const defaultGripThickness = 10;
const defaultGripInnerThickness = 4;
const defaultGripMargin = 2;
// see: https://github.com/react-grid-layout/react-draggable/issues/652
const Draggable1 = Draggable;
const Splitter = React.forwardRef((props, ref) => {
    var _a, _b, _c;
    const { width, height, initialPosition, onChange, adjustable = true, positionFromRight = false, direction = 'horizontal' } = props;
    const size1 = direction === 'horizontal' ? width : height;
    // const size2 = direction === 'horizontal' ? height : width
    const [gripPosition, setGripPosition] = useState(initialPosition);
    useEffect(() => {
        if (gripPosition > size1 - 4) {
            setGripPosition(size1 - 4);
        }
        else if ((gripPosition < 4) && (size1 > 20)) {
            setGripPosition(4);
        }
    }, [gripPosition, width, size1]);
    // See: https://stackoverflow.com/questions/63603902/finddomnode-is-deprecated-in-strictmode-finddomnode-was-passed-an-instance-of-d
    // const draggableNodeRef = React.useRef(null)
    // this was actually causing an error with Draggable
    if (!props.children)
        throw Error('Unexpected: no props.children');
    let child1;
    let child2;
    if (!Array.isArray(props.children)) {
        child1 = props.children;
        child2 = null;
    }
    else {
        const children = props.children.filter(c => (c !== undefined));
        child1 = children[0] || null;
        child2 = children[1] || null;
    }
    if (!child1) {
        child1 = child2;
        child2 = null;
    }
    if (!child1) {
        throw Error('Splitter must have at least one child.');
    }
    if (!child2) {
        return _jsx(child1.type, Object.assign({}, child1.props, { width: width, height: height }));
    }
    const gripPositionFromLeft = positionFromRight ? size1 - gripPosition : gripPosition;
    const gripThickness = adjustable ? ((_a = props.gripThickness) !== null && _a !== void 0 ? _a : defaultGripThickness) : 0;
    const gripInnerThickness = adjustable ? ((_b = props.gripInnerThickness) !== null && _b !== void 0 ? _b : defaultGripInnerThickness) : 0;
    const gripMargin = adjustable ? ((_c = props.gripMargin) !== null && _c !== void 0 ? _c : defaultGripMargin) : 0;
    const size1A = gripPositionFromLeft - gripThickness / 2 - gripMargin;
    const size1B = size1 - size1A - gripThickness - 2 * gripMargin;
    let style0 = {
        top: 0,
        left: 0,
        width: width,
        height: height,
        overflow: 'hidden'
    };
    let style1 = {
        left: 0,
        top: 0,
        width: direction === 'horizontal' ? size1A : width,
        height: direction === 'horizontal' ? height : size1A,
        zIndex: 0,
        overflowY: direction === 'horizontal' ? 'auto' : 'hidden',
        overflowX: direction === 'horizontal' ? 'hidden' : 'auto'
    };
    let style2 = {
        left: direction === 'horizontal' ? size1A + gripThickness + 2 * gripMargin : 0,
        top: direction === 'horizontal' ? 0 : size1A + gripThickness + 2 * gripMargin,
        width: direction === 'horizontal' ? size1B : width,
        height: direction === 'horizontal' ? height : size1B,
        zIndex: 0,
        overflowY: direction === 'horizontal' ? 'auto' : 'hidden',
        overflowX: direction === 'horizontal' ? 'hidden' : 'auto'
    };
    let styleGripOuter = {
        left: 0,
        top: 0,
        width: direction === 'horizontal' ? gripThickness + 2 * gripMargin : width,
        height: direction === 'horizontal' ? height : gripThickness + 2 * gripMargin,
        backgroundColor: 'transparent',
        cursor: direction === 'horizontal' ? 'col-resize' : 'row-resize',
        zIndex: 9998
    };
    let styleGrip = {
        left: direction === 'horizontal' ? gripMargin : 0,
        top: direction === 'horizontal' ? 0 : gripMargin,
        width: direction === 'horizontal' ? gripThickness : width,
        height: direction === 'horizontal' ? height : gripThickness,
        background: 'rgb(230, 230, 230)',
        cursor: direction === 'horizontal' ? 'col-resize' : 'row-resize'
    };
    let styleGripInner = {
        top: direction === 'horizontal' ? 0 : (gripThickness - gripInnerThickness) / 2,
        left: direction === 'horizontal' ? (gripThickness - gripInnerThickness) / 2 : 0,
        width: direction === 'horizontal' ? gripInnerThickness : width,
        height: direction === 'horizontal' ? height : gripInnerThickness,
        background: 'gray',
        cursor: direction === 'horizontal' ? 'col-resize' : 'row-resize'
    };
    const _handleGripDrag = (evt, ui) => {
    };
    const _handleGripDragStop = (evt, ui) => {
        const newGripPositionFromLeft = direction === 'horizontal' ? ui.x : ui.y;
        if (newGripPositionFromLeft === gripPositionFromLeft) {
            return;
        }
        const newGripPosition = positionFromRight ? size1 - newGripPositionFromLeft : newGripPositionFromLeft;
        setGripPosition(newGripPosition);
        onChange && onChange(newGripPosition);
    };
    return (_jsxs("div", Object.assign({ className: "splitter", style: Object.assign(Object.assign({}, style0), { position: 'relative' }) }, { children: [_jsx("div", Object.assign({ style: Object.assign(Object.assign({}, style1), { position: 'absolute' }), className: "SplitterChild" }, { children: _jsx(child1.type, Object.assign({}, child1.props, { width: direction === 'horizontal' ? size1A : width, height: direction === 'horizontal' ? height : size1A })) }), "child1"), adjustable && (_jsx(Draggable1
            // nodeRef={draggableNodeRef} // this was actually causing an error with Draggable
            , Object.assign({ position: { x: direction === 'horizontal' ? gripPositionFromLeft - gripThickness / 2 - gripMargin : 0, y: direction === 'horizontal' ? 0 : gripPositionFromLeft - gripThickness / 2 - gripMargin }, axis: direction === 'horizontal' ? "x" : "y", onDrag: (evt, ui) => _handleGripDrag(evt, ui), onStop: (evt, ui) => _handleGripDragStop(evt, ui) }, { children: _jsx("div", Object.assign({ style: Object.assign(Object.assign({}, styleGripOuter), { position: 'absolute' }) }, { children: _jsx("div", Object.assign({ style: Object.assign(Object.assign({}, styleGrip), { position: 'absolute' }) }, { children: _jsx("div", { style: Object.assign(Object.assign({}, styleGripInner), { position: 'absolute' }) }) })) })) }), "drag")), _jsx("div", Object.assign({ style: Object.assign(Object.assign({}, style2), { position: 'absolute' }), className: "SplitterChild" }, { children: _jsx(child2.type, Object.assign({ ref: ref }, child2.props, { width: direction === 'horizontal' ? size1B : width, height: direction === 'horizontal' ? height : size1B })) }), "child2")] })));
});
export default Splitter;
//# sourceMappingURL=Splitter.js.map