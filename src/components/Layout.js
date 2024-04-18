import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$locationPath === '/ebooks' ? 'center' : 'unset'};
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