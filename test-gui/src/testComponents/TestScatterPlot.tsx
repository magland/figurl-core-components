import { FunctionComponent, useMemo } from "react";
import { ScatterPlot, ScatterPlotMarker } from "../package";

type Props ={
}

const TestScatterPlot: FunctionComponent<Props> = () => {

	const width = 250
	const height = 250

	const markers: ScatterPlotMarker[] = useMemo(() => {
		return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => ({
			key: `${i}`,
			x: (i + 1) * 5,
			y: (i + 1) * (i + 1) * 1.5,
			tooltip: `${i}`,
			color: 'red',
			radius: 5
		}))
	}, [])

	return (
		<div style={{position: 'relative', width, height, border: 'solid 2px black'}}>
			<ScatterPlot
				width={width}
				height={height}
				markers={markers}
			/>
		</div>
	)
}

export default TestScatterPlot
