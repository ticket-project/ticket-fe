'use client';

import Link from 'next/link';
import { KeyboardEventHandler, MouseEventHandler } from 'react';

import { Box, Container } from '@mui/material';

import {
  BrandArea,
  BrandDescription,
  BrandTitle,
  BusinessHours,
  ContentWrapper,
  Copyright,
  FooterDivider,
  NavLink,
  NavList,
  NavSection,
  NavStack,
  NavTitle,
  PhoneLink,
  Root,
} from './Footer.styles';

const Footer = () => {
  const preventNav: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
  };

  const preventNavKeyDown: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
    }
  };

  return (
    <Root as="footer" id="footer" tabIndex={-1}>
      <Container>
        <ContentWrapper>
          <BrandArea>
            <BrandTitle as="h2">ONE TICKET</BrandTitle>
            <BrandDescription as="p">
              원 티켓은 모든 이들에게 즐거움을 전달하기 위해 최상의
              <br />
              공연 정보와 편리한 예매 서비스를 제공합니다.
            </BrandDescription>
          </BrandArea>
          <NavStack direction="row">
            <NavSection as="nav">
              <NavTitle as="h3">고객센터</NavTitle>
              <NavList as="ul">
                <Box component="li">
                  <PhoneLink href="tel:1544-1234">1544-1234</PhoneLink>
                </Box>
                <Box component="li">
                  <BusinessHours as="p">
                    평일{' '}
                    <Box component="time" dateTime="09:00">
                      09:00
                    </Box>{' '}
                    ~{' '}
                    <Box component="time" dateTime="18:00">
                      18:00
                    </Box>
                  </BusinessHours>
                </Box>
                <Box component="li">
                  <NavLink
                    as={Link}
                    href="/"
                    onClick={preventNav}
                    onKeyDown={preventNavKeyDown}
                  >
                    자주 묻는 질문
                  </NavLink>
                </Box>
              </NavList>
            </NavSection>
            <NavSection as="nav" aria-label="회사소개">
              <NavTitle as="h3">회사소개</NavTitle>
              <NavList as="ul">
                <Box component="li">
                  <NavLink
                    as={Link}
                    href="/"
                    onClick={preventNav}
                    onKeyDown={preventNavKeyDown}
                  >
                    이용약관
                  </NavLink>
                </Box>
                <Box component="li">
                  <NavLink
                    as={Link}
                    href="/"
                    onClick={preventNav}
                    onKeyDown={preventNavKeyDown}
                  >
                    개인정보처리방침
                  </NavLink>
                </Box>
                <Box component="li">
                  <NavLink
                    as={Link}
                    href="/"
                    onClick={preventNav}
                    onKeyDown={preventNavKeyDown}
                  >
                    사업자 정보확인
                  </NavLink>
                </Box>
              </NavList>
            </NavSection>
          </NavStack>
        </ContentWrapper>
        <FooterDivider />
        <Copyright as="small">
          © 2024 ONE TICKET CORP. ALL RIGHTS RESERVED.
        </Copyright>
      </Container>
    </Root>
  );
};

export default Footer;
