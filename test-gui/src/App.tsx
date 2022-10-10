import './App.css';
import { VerticalScrollView } from './package';
import TestHyperlink from './testComponents/TestHyperlink';
import TestNiceTable from './testComponents/TestNiceTable';
import TestProgress from './testComponents/TestProgress';
import TestScatterPlot from './testComponents/TestScatterPlot';
import TestScene2d from './testComponents/TestScene2d';
import { MuiThemeProvider } from '@material-ui/core';
import { defaultUnitSelection, UnitMetricSelectionContext, unitMetricSelectionReducer, UnitSelectionContext, unitSelectionReducer } from '@figurl/spike-sorting-views';
import { getFigureData, SetupUrlState, startListeningToParent } from '@figurl/interface';
import { useWindowDimensions } from '@figurl/core-utils';
import { useEffect, useMemo, useReducer, useState } from 'react';
import './localStyles.css';
import theme from './theme';
import View from './View';
import { defaultRecordingSelection, RecordingSelectionContext, recordingSelectionReducer } from '@figurl/timeseries-views';
import { SetupSortingCuration } from '@figurl/spike-sorting-views';
import TestSplitter from './testComponents/TestSplitter';
import TestTabWidget from './testComponents/TestTabWidget';
// import { SetupAnnotations } from 'libraries/context-annotations';

const urlSearchParams = new URLSearchParams(window.location.search)
const queryParams = Object.fromEntries(urlSearchParams.entries())

function App() {
  const [data, setData] = useState<any>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const {width, height} = useWindowDimensions()

  const [unitSelection, unitSelectionDispatch] = useReducer(unitSelectionReducer, defaultUnitSelection)
  const [recordingSelection, recordingSelectionDispatch] = useReducer(recordingSelectionReducer, defaultRecordingSelection)

  const [unitMetricSelection, unitMetricSelectionDispatch] = useReducer(unitMetricSelectionReducer, {})

  useEffect(() => {
    if (queryParams.test === '1') {
      // To test the Test1View without using the figurl parent
      // for example, with no internet connection,
      // use http://localhost:3000?test=1
      // setData({type: 'Test1'})
    }
    else {
      getFigureData().then((data: any) => {
        if (!data) {
          setErrorMessage(`No data returned by getFigureData()`)
          return
        }
        setData(data)
      }).catch((err: any) => {
        setErrorMessage(`Error getting figure data`)
        console.error(`Error getting figure data`, err)
      })
    }
  }, [])

  const opts = useMemo(() => ({}), [])

  if (!queryParams.figureId) {
    return (
      <div style={{padding: 20}}>
        <h2>This page is not being embedded as a figurl figure.</h2>
        <h3>Here are some examples.</h3>
        <div style={{padding: 20}}>
          <h2>Hyperlink</h2>
          <TestHyperlink />

          <h2>NiceTable</h2>
          <TestNiceTable />

          <h2>Progress</h2>
          <TestProgress />

          <h2>Scatter plot</h2>
          <TestScatterPlot />

          <h2>Scene 2d</h2>
          <TestScene2d width={800} height={250} />

          <h2>Splitter</h2>
          <TestSplitter />

          <h2>Tab widget</h2>
          <TestTabWidget />

          <h2>VerticalScrollView</h2>
          <VerticalScrollView width={800} height={200}>
            <div style={{position: 'absolute', width: 500, height: 700, background: 'orange'}}></div>
            <div style={{position: 'absolute', left: 50, width: 400, top: 200, height: 200, background: 'blue'}}></div>
          </VerticalScrollView>
        </div>
      </div>
    )
  }

  if (errorMessage) {
    return <div style={{color: 'red'}}>{errorMessage}</div>
  }

  if (!data) {
    return <div>Waiting for data</div>
  }

  return (
    <MuiThemeProvider theme={theme}>
      <RecordingSelectionContext.Provider value={{recordingSelection, recordingSelectionDispatch}}>
        <UnitSelectionContext.Provider value={{unitSelection, unitSelectionDispatch}}>
          <UnitMetricSelectionContext.Provider value={{unitMetricSelection, unitMetricSelectionDispatch}}>
          {/* <SetupAnnotations> */}
            <SetupUrlState>
              <SetupSortingCuration>
                <View
                  data={data}
                  opts={opts}
                  width={width - 10}
                  height={height - 5}
                />
              </SetupSortingCuration>
            </SetupUrlState>
          {/* </SetupAnnotations> */}
          </UnitMetricSelectionContext.Provider>
        </UnitSelectionContext.Provider>
      </RecordingSelectionContext.Provider>
    </MuiThemeProvider>
  )
}

startListeningToParent()

export default App;