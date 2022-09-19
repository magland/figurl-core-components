import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
export const Expandable = (props) => {
    return (_jsxs(Accordion, Object.assign({ TransitionProps: { unmountOnExit: props.unmountOnExit !== undefined ? props.unmountOnExit : true }, defaultExpanded: props.defaultExpanded }, { children: [_jsxs(AccordionSummary, { children: [props.icon && _jsx("span", Object.assign({ style: { paddingRight: 10 } }, { children: props.icon })), _jsx("span", Object.assign({ style: { paddingTop: 3 } }, { children: props.label }))] }), _jsx(AccordionDetails, { children: _jsx("div", Object.assign({ style: { width: "100%" } }, { children: props.children })) })] })));
};
export default Expandable;
//# sourceMappingURL=Expandable.js.map