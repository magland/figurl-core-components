import { FunctionComponent } from 'react';
import './NiceTable.css';
export declare type NiceTableRow = {
    key: string;
    columnValues: {
        [key: string]: any;
    };
};
export declare type NiceTableColumn = {
    key: string;
    label: string;
    element?: any;
};
interface Props {
    rows: NiceTableRow[];
    columns: NiceTableColumn[];
    onDeleteRow?: (key: string) => void;
    deleteRowLabel?: string;
    onEditRow?: (key: string) => void;
    editRowLabel?: string;
    selectionMode?: 'none' | 'single' | 'multiple';
    selectedRowKeys?: string[];
    onSelectedRowKeysChanged?: ((keys: string[]) => void);
    selectionDisabled?: boolean;
}
declare const NiceTable: FunctionComponent<Props>;
export default NiceTable;
