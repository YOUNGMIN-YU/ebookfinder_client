import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import AppHeader from './components/AppHeader';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="Main">
        <Routes>
          <Route path="/" element={<Main />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
