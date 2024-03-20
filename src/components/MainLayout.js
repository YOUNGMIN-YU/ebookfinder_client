import { Outlet } from 'react-router-dom';
import Headroom from 'react-headroom';
import AppHeader from './AppHeader';
import styled from 'styled-components'

export const MainLayout = () => {
  return (
    <>
      <Layout>
        <HeadroomWrapper>
          <Headroom disableInlineStyles>
            <AppHeader />
          </Headroom>
        </HeadroomWrapper>
      </Layout>
      <Outlet />
    </>
  );
}

export default MainLayout;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 100%;
  position: relative;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style:none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
      display: none; /* Chrome , Safari , Opera */
  }
`

const HeadroomWrapper = styled.div`
.headroom {
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: #fff;
    width: 100%;
    min-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .headroom--unfixed {
    position: fixed;
  }
  .headroom--scrolled {
    transition: transform 200ms ease-in-out;
  }
  .headroom--unpinned {
    position: fixed;
    transform: translateY(-37%);
  }
  .headroom--pinned {
    position: fixed;
    transform: translateY(0%);
  }
`