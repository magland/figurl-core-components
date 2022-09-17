import { Button } from "@material-ui/core";
import { FunctionComponent, useCallback, useRef, useState } from "react";
import { ProgressComponent } from "../package";

type Props ={
}

const TestProgress: FunctionComponent<Props> = () => {
	const [, setRefreshCode] = useState(0)
	const progress = useRef(0)
	const total = 100

	const handleGo = useCallback(() => {
		let canceled = false
		progress.current = 0
		function increment() {
			if (canceled) return
			progress.current ++
			setRefreshCode(c => (c + 1))
			if (progress.current >= total) return
			setTimeout(increment, 40)
		}
		increment()
		return () => {canceled = true}
	}, [])
	return (
		<div>
			<Button onClick={handleGo}>Click me</Button>
			<ProgressComponent
				loaded={progress.current}
				total={total}
			/>
		</div>
	)
}

export default TestProgress
