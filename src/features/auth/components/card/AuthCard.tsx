'use client';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Box, Divider, Stack } from '@mui/material';

import { SocialProvider } from '../../types';

import { GoogleIcon, KakaoIcon } from '@/components/icons';

import {
  Root,
  StyledCard,
  KakaoButton,
  GoogleButton,
  LogoTitle,
  StyledCardContent,
  AuthTitle,
  AuthSubtitle,
  ErrorText,
  FooterText,
  FooterLink,
  BackHomeLink,
} from './AuthCard.styles';

interface AuthCardProps {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
  onClick: (provider: SocialProvider) => void;
  isPending: boolean;
  errorMessage: string | null;
}

const AuthCard = ({
  title,
  subtitle,
  footerText,
  footerLinkHref,
  footerLinkLabel,
  onClick,
  isPending,
  errorMessage,
}: AuthCardProps) => {
  return (
    <Root>
      <LogoTitle>
        <Box component="span" sx={{ color: 'primary.main' }}>
          ONE
        </Box>{' '}
        <Box component="span">원티켓</Box>
      </LogoTitle>

      <StyledCard>
        <StyledCardContent>
          <Box>
            <Stack spacing={4.8}>
              <Stack spacing={1.5} textAlign="center">
                <AuthTitle>{title}</AuthTitle>
                <AuthSubtitle>{subtitle}</AuthSubtitle>
              </Stack>
              <Stack spacing={2.2}>
                <KakaoButton
                  fullWidth
                  variant="contained"
                  startIcon={<KakaoIcon size={24} />}
                  disabled={isPending}
                  onClick={() => onClick('kakao')}
                >
                  카카오로 {title}하기
                </KakaoButton>
                <GoogleButton
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon size={24} />}
                  disabled={isPending}
                  onClick={() => onClick('google')}
                >
                  Google로 {title}하기
                </GoogleButton>
              </Stack>
              {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
            </Stack>

            <Divider sx={{ borderColor: 'grey.200', my: 3.8 }} />

            <FooterText>
              {footerText}
              <FooterLink href={footerLinkHref}>{footerLinkLabel}</FooterLink>
            </FooterText>
          </Box>
        </StyledCardContent>
      </StyledCard>
      <BackHomeLink href="/main">
        <ArrowBackRoundedIcon sx={{ fontSize: 20 }} />
        홈으로 돌아가기
      </BackHomeLink>
    </Root>
  );
};

export default AuthCard;
