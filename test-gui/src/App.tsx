import './App.css';
import TestHyperlink from './testComponents/TestHyperlink';
import TestNiceTable from './testComponents/TestNiceTable';
import TestProgress from './testComponents/TestProgress';

function App() {
  return (
    <div>
      <h2>Hyperlink</h2>
      <TestHyperlink />

      <h2>NiceTable</h2>
      <TestNiceTable />

      <h3>Progress</h3>
      <TestProgress />

    </div>
  );
}

export default App;
