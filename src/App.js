import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Main from './pages/Main';

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
        <Route path="/ebooks" element={<Main />} />
        <Route path="/elibs" element={<Main />} />
        <Route path="/elibs/settings" element={<Main />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
