import './App.css';
import Navigation from './components/Navigation';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation/>
        <Welcome/>
      </header>
    </div>
  );
}

export default App;
