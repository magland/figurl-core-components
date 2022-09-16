import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Delete, Edit } from "@material-ui/icons";
import { useCallback, useMemo, useState } from 'react';
import './NiceTable.css';
const NiceTable = ({ rows, columns, onDeleteRow = undefined, deleteRowLabel = undefined, onEditRow = undefined, editRowLabel = undefined, selectionMode = 'none', // none, single, multiple
selectedRowKeys = [], onSelectedRowKeysChanged = undefined, selectionDisabled }) => {
    const selectedRowKeysObj = useMemo(() => {
        const x = {};
        selectedRowKeys.forEach((key) => { x[key] = true; });
        return x;
    }, [selectedRowKeys]);
    const [confirmDeleteRowKey, setConfirmDeleteRowKey] = useState(null);
    const handleClickRow = useCallback((key) => {
        if (!onSelectedRowKeysChanged || false)
            return;
        if (selectionMode === 'single') {
            if (!(key in selectedRowKeysObj) || !selectedRowKeysObj[key]) {
                onSelectedRowKeysChanged([key + '']);
            }
            else {
                onSelectedRowKeysChanged([]);
            }
        }
        else if (selectionMode === 'multiple') {
            // todo: write this logic. Note, we'll need to also pass in the event to get the ctrl/shift modifiers
            onSelectedRowKeysChanged(Object.keys(selectedRowKeysObj)
                // eslint-disable-next-line eqeqeq
                .filter(k => k != key && selectedRowKeysObj[k])
                .concat(selectedRowKeysObj[key] ? [] : [key.toString()]));
        }
    }, [onSelectedRowKeysChanged, selectionMode, selectedRowKeysObj]);
    const handleDeleteRow = useCallback((rowKey) => {
        setConfirmDeleteRowKey(rowKey);
    }, []);
    const handleConfirmDeleteRow = useCallback((rowKey, confirmed) => {
        if (confirmed) {
            onDeleteRow && onDeleteRow(rowKey);
        }
        setConfirmDeleteRowKey(null);
    }, [onDeleteRow]);
    const handleEditRow = useCallback((rowKey) => {
        onEditRow && onEditRow(rowKey);
    }, [onEditRow]);
    return (_jsxs(Table, Object.assign({ className: "NiceTable" }, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { style: { width: 0 } }, "_first"), columns.map(col => (_jsx(TableCell, { children: col.element ? col.element : (_jsx("span", { children: col.label })) }, col.key)))] }) }), _jsx(TableBody, { children: rows.map(row => (_jsxs(TableRow, { children: [_jsxs(TableCell, { children: [onDeleteRow && ((confirmDeleteRowKey === row.key) ? (_jsx(ConfirmDeleteRowButton, { title: deleteRowLabel || '', onConfirmDeleteRow: handleConfirmDeleteRow, rowKey: row.key })) : ((_jsx(DeleteRowButton, { title: deleteRowLabel || '', onDeleteRow: handleDeleteRow, rowKey: row.key })))), onEditRow && (_jsx(EditRowButton, { title: editRowLabel || '', onEditRow: handleEditRow, rowKey: row.key })), selectionMode !== 'none' && (_jsx(Checkbox, { checked: selectedRowKeysObj[row.key] || false, onClick: () => handleClickRow(row.key), disabled: selectionDisabled }))] }), columns.map(col => (_jsx(TableCell, { children: _jsx("span", { children: makeCell(row.columnValues[col.key]) }) }, col.key)))] }, row.key))) })] })));
};
const DeleteRowButton = ({ title, rowKey, onDeleteRow }) => {
    const handleClick = useCallback(() => {
        onDeleteRow && onDeleteRow(rowKey);
    }, [onDeleteRow, rowKey]);
    return (_jsx(IconButton, Object.assign({ title: title, onClick: handleClick }, { children: _jsx(Delete, {}) })));
};
const ConfirmDeleteRowButton = ({ title, rowKey, onConfirmDeleteRow }) => {
    const handleClick = useCallback(() => {
        onConfirmDeleteRow && onConfirmDeleteRow(rowKey, true);
    }, [onConfirmDeleteRow, rowKey]);
    const handleCancel = useCallback(() => {
        onConfirmDeleteRow && onConfirmDeleteRow(rowKey, false);
    }, [onConfirmDeleteRow, rowKey]);
    return (_jsxs("span", { children: ["Confirm delete?", _jsx(IconButton, Object.assign({ title: title, onClick: handleClick }, { children: _jsx(Delete, {}) })), _jsx(IconButton, Object.assign({ title: "Cancel", onClick: handleCancel }, { children: "\u2716" }))] }));
};
const EditRowButton = ({ title, rowKey, onEditRow }) => {
    return (_jsx(IconButton, Object.assign({ title: title, onClick: () => onEditRow && onEditRow(rowKey) }, { children: _jsx(Edit, {}) })));
};
const makeCell = (x) => {
    // eslint-disable-next-line eqeqeq
    if (x == 0)
        return x; // !'0' is true, but we shouldn't null out actual 0s
    if (!x)
        return '';
    if (typeof (x) == "object") {
        if (x.element)
            return x.element;
        else
            return x.text || '';
    }
    else {
        return x;
    }
};
export default NiceTable;
//# sourceMappingURL=NiceTable.js.map