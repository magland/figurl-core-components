import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import ReactVisibilitySensor from 'react-visibility-sensor';
export const voidClickHandler = (evt) => { };
const PlotRow = (props) => {
    const { rowStart, maxItems, plotIds, selectedPlotKeys, plotsDict, hideBorderColorPlotKeys } = props;
    const rowEnd = maxItems || plotIds.length;
    const idsThisRow = plotIds.slice(rowStart, rowStart + rowEnd);
    return _jsx(Grid, Object.assign({ container: true }, { children: idsThisRow.filter(id => (plotsDict[id])).map(id => {
            let className = `plotWrapperStyle`;
            if (!(hideBorderColorPlotKeys === null || hideBorderColorPlotKeys === void 0 ? void 0 : hideBorderColorPlotKeys.has(id))) {
                className = className + ' ' + ((selectedPlotKeys === null || selectedPlotKeys === void 0 ? void 0 : selectedPlotKeys.has(id)) ? 'plotSelectedStyle' : 'plotUnselectedStyle');
            }
            else {
                className = className + ' plotUnselectableStyle';
            }
            return (_jsx(Grid, Object.assign({ item: true }, { children: _jsx("div", Object.assign({ className: className }, { children: plotsDict[id] })) }), id));
        }) }), rowStart);
};
const PlotGrid = ({ plots, plotComponent, selectedPlotKeys, numPlotsPerRow }) => {
    const Component = plotComponent;
    const hideBorderColorPlotKeys = useMemo(() => {
        const ret = new Set();
        for (let p of plots) {
            if (p.hideBorderColor) {
                ret.add(p.key);
            }
        }
        return ret;
    }, [plots]);
    // Don't rerender the individual plots with every pass
    // This code renders the individual components, memoized based on Component type and plot data, and then
    // loads them into a dictionary mapping the ID to the rendered plot (with label and interactivity function).
    // TODO: keep items from previous iterations somehow?
    const _plotsDict = useMemo(() => {
        const contents = Object.assign({}, ...plots.map((p) => {
            const labelHeight = p.label !== undefined ? 20 : 0;
            const rendered = _jsxs("div", Object.assign({ "data-key": p.key, onClick: p.clickHandler || voidClickHandler }, { children: [p.label !== undefined && (_jsx("div", Object.assign({ className: 'plotLabelStyle', style: { maxWidth: p.props.width, height: labelHeight, userSelect: 'none' } }, { children: _jsx("span", Object.assign({ style: { color: p.labelColor } }, { children: p.label || _jsx("span", { children: "\u00A0" }) })) }))), _jsx(ReactVisibilitySensor, Object.assign({ partialVisibility: true }, { children: ({ isVisible }) => (isVisible && Component !== null ? (_jsx(Component, Object.assign({}, Object.assign(Object.assign({}, p.props), { height: p.props.height ? p.props.height - labelHeight : p.props.height })))) : (_jsx("div", Object.assign({ style: { position: 'relative', width: p.props.width, height: p.props.height - labelHeight } }, { children: "Not visible" })))) }))] }));
            return { [p.key]: rendered };
        }));
        return contents;
    }, [plots, Component]);
    const rowStarts = Array(plots.length).fill(0).map((x, ii) => ii).filter(i => i % (numPlotsPerRow || plots.length) === 0);
    const plotIds = useMemo(() => {
        return plots.map(p => p.key);
    }, [plots]);
    return (_jsx(Grid, Object.assign({ container: true, spacing: 0 }, { children: rowStarts.map((start) => (_jsx(PlotRow, { rowStart: start, maxItems: numPlotsPerRow, plotIds: plotIds, selectedPlotKeys: selectedPlotKeys, hideBorderColorPlotKeys: hideBorderColorPlotKeys, plotsDict: _plotsDict }, `row-${start}`))) })));
};
export default PlotGrid;
//# sourceMappingURL=PlotGrid.js.map