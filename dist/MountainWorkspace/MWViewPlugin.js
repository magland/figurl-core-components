export class MWView {
    constructor(plugin, extraProps, label, viewId) {
        this.plugin = plugin;
        this.extraProps = extraProps;
        this.label = label;
        this.viewId = viewId;
        this.activate = false; // signal to set this tab as active
        this.area = '';
    }
}
//# sourceMappingURL=MWViewPlugin.js.map