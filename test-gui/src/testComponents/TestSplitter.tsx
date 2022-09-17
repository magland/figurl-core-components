import { FunctionComponent } from "react";
import { Splitter } from "../package";

type Props ={
}

const TestSplitter: FunctionComponent<Props> = () => {
	return (
		<Splitter
			width={800}
			height={250}
			initialPosition={200}
		>
			<ChildComponent key="1" width={0} height={0} color="green" text="splitter child 1" />
			<ChildComponent key="2" width={0} height={0} color="orange" text="splitter child 2" />
		</Splitter>
	)
}

export const ChildComponent: FunctionComponent<{width: number, height: number, color: string, text: string,}> = ({width, height, color, text}) => {
	return (
		<div style={{position: 'absolute', width, height, background: color}}>
			{text}
		</div>
	)
}

export default TestSplitter
