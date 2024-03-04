import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import AppHeader from './components/AppHeader'
import { Flex } from 'antd';

function App() {
  return (
    <>
      <Flex vertical justify='center' align='center'>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Flex>
    </>
  );
}

export default App;
