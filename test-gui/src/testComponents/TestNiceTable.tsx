import { FunctionComponent, useMemo } from "react";
import { NiceTable, NiceTableColumn, NiceTableRow } from "../package";

type Props ={
}

const columns: NiceTableColumn[] = [
	{
		key: 'c1',
		label: 'column 1'
	},
	{
		key: 'c2',
		label: 'column 2'
	},
	{
		key: 'c3',
		label: 'column 3'
	}
]

const TestNiceTable: FunctionComponent<Props> = () => {
	const rows: NiceTableRow[] = useMemo(() => {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => (
			{
				key: 'r1',
				columnValues: {
					c1: `r${x}c1`,
					c2: `r${x}c2`,
					c3: `r${x}c3`
				}
			}
		))
	}, [])
	return (
		<div>
			<NiceTable
				rows={rows}
				columns={columns}
			/>
		</div>
	)
}

export default TestNiceTable
