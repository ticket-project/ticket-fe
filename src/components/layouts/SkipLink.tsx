'use client';

import { styled } from '@mui/material/styles';

const SkipLinkWrapper = styled('div')({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 9999,
  width: '100%',

  '& a': {
    position: 'absolute',
    left: '-9999px',
    top: 0,
    display: 'block',
    padding: '1rem',
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecoration: 'none',
    background: '#bbb',
  },

  '& a:focus, & a:focus-visible': {
    left: 0,
  },
});

const SkipLink = () => {
  return (
    <SkipLinkWrapper>
      <ul>
        <li>
          <a href="#gnb-menu">메뉴 바로가기</a>
        </li>
        <li>
          <a href="#main-content">본문 바로가기</a>
        </li>
        <li>
          <a href="#footer">하단정보바로가기</a>
        </li>
      </ul>
    </SkipLinkWrapper>
  );
};

export default SkipLink;
