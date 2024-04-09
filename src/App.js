import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Main from './pages/Main';
import Ebooks from './pages/Ebooks';
import Elibs from './pages/Elibs';
import { ConfigProvider } from 'antd';

const renderEmpty = () => (<></>); // 렌더링 될때 컴포넌트 기본 내장된 empty 컴포넌트 제거

function App() {
  return (
    <ConfigProvider
      renderEmpty={renderEmpty}
      theme={{
        token: {
          fontFamily: 'Pretendard-Regular',
        },
        components: {
          Collapse: {
            headerPadding: '6px 8px', contentPadding: '8px'
          },
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<MainLayout />} >
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/elibs" element={<Elibs />} />
          <Route path="/elibs/settings" element={<Elibs />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
