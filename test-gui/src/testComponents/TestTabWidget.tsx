import { FunctionComponent, useMemo } from "react";
import { TabWidget } from "../package";
import { ChildComponent } from "./TestSplitter";

type Props ={
}

const width = 800
const height = 400

const TestTabWidget: FunctionComponent<Props> = () => {
	const tabs = useMemo(() => {
		return [
			{label: 'Tab 1'},
			{label: 'Tab 2'}
		]
	}, [])
	return (
		<div style={{position: 'relative', width, height}}>
			<TabWidget
				tabs={tabs}
				width={width}
				height={height}
			>
				<ChildComponent key="1" width={0} height={0} color="green" text="tab view 1" />
				<ChildComponent key="2" width={0} height={0} color="orange" text="tab view 2" />
			</TabWidget>
		</div>
	)
}

export default TestTabWidget
