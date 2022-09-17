import './App.css';
import { VerticalScrollView } from './package';
import TestHyperlink from './testComponents/TestHyperlink';
import TestNiceTable from './testComponents/TestNiceTable';
import TestProgress from './testComponents/TestProgress';
import TestScatterPlot from './testComponents/TestScatterPlot';
import TestScene2d from './testComponents/TestScene2d';
import TestSplitter from './testComponents/TestSplitter';
import TestTabWidget from './testComponents/TestTabWidget';

function App() {
  return (
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
  );
}

export default App;
