import { jsx as _jsx } from "react/jsx-runtime";
import { useFileData } from '@figurl/interface';
import { useEffect, useMemo, useState } from 'react';
const ViewWrapper = ({ figureDataSha1, figureDataUri, ViewComponent, width, height }) => {
    const sha1OrUri = figureDataSha1 ? figureDataSha1.toString() : figureDataUri;
    if (!sha1OrUri)
        throw Error('No figureDataSha1 or figureDataUri in ViewWrapper');
    const { fileData: figureData, progress, errorMessage } = useFileData(sha1OrUri);
    const [progressValue, setProgressValue] = useState(undefined);
    useEffect(() => {
        progress.onProgress(({ loaded, total }) => {
            setProgressValue({ loaded, total });
        });
    }, [progress]);
    const opts = useMemo(() => ({}), []);
    if (!figureData) {
        return (_jsx("div", Object.assign({ style: { width, height } }, { children: errorMessage ? errorMessage : progressValue ? `Waiting for data ${progressValue.loaded} / ${progressValue.total}` : 'Waiting for data (2)' })));
    }
    return (_jsx(ViewComponent, { data: figureData, opts: opts, width: width, height: height }));
};
export default ViewWrapper;
//# sourceMappingURL=ViewWrapper.js.map