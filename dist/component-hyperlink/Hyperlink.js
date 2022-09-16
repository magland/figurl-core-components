import { jsx as _jsx } from "react/jsx-runtime";
const Hyperlink = ({ style = {}, onClick, href, target, children }) => {
    let style0 = Object.assign({ color: 'gray', cursor: 'pointer', textDecoration: 'underline' }, style);
    return (_jsx("span", Object.assign({ className: "Hyperlink" }, { children: href ? (_jsx("a", Object.assign({ href: href, target: target }, { children: children }))) : (_jsx("span", Object.assign({ style: style0, onClick: onClick }, { children: children }))) })));
};
export default Hyperlink;
//# sourceMappingURL=Hyperlink.js.map