import { FunctionComponent, useState } from "react";
import { Hyperlink } from "../package";

type Props ={
}

const TestHyperlink: FunctionComponent<Props> = () => {
	const [value, setValue] = useState<number>(0)
	return (
		<div>
			<Hyperlink onClick={() => setValue(v => (v + 1))}>Click me</Hyperlink>
			<div>{value}</div>
		</div>
	)
}

export default TestHyperlink
