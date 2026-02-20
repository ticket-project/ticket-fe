'use client';

import Link from 'next/link';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';

import { GoogleIcon, KakaoIcon } from '@/components/icons';

const Login = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        px: 2,
        py: { md: 12, xs: 6 },
      }}
    >
      <Typography
        sx={{
          fontSize: { md: 34, xs: 28 },
          fontWeight: 800,
          mb: 4,
          lineHeight: 1,
        }}
      >
        <Box component="span" sx={{ color: 'primary.main' }}>
          ONE
        </Box>{' '}
        <Box component="span">원티켓</Box>
      </Typography>

      <Card
        sx={{
          borderRadius: 5,
          boxShadow: '0px 10px 26px rgba(17, 24, 39, 0.1)',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <CardContent
          sx={{
            p: { md: 5, xs: 3 },
            '&:last-child': { pb: { md: 5, xs: 3 } },
          }}
        >
          <Box>
            <Stack spacing={4.8}>
              <Stack spacing={1.5} textAlign="center">
                <Typography
                  sx={{
                    fontSize: 26,
                    fontWeight: 800,
                    lineHeight: 1.2,
                  }}
                >
                  로그인
                </Typography>
                <Typography
                  sx={{ color: 'grey.500', fontSize: 16, fontWeight: 500 }}
                >
                  원티켓의 즐거운 공연 세상을 만나보세요.
                </Typography>
              </Stack>
              <Stack spacing={2.2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<KakaoIcon size={24} />}
                  sx={{
                    backgroundColor: '#fee500',
                    boxShadow: 'none',
                    borderRadius: 2.5,
                    fontSize: 16,
                    fontWeight: 700,
                    minHeight: 54,
                    '&:hover': {
                      backgroundColor: '#feec4d',
                      boxShadow: 'none',
                    },
                  }}
                >
                  카카오로 로그인하기
                </Button>
                {/* <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon size={24} />}
                  sx={{
                    border: '1px solid #d1d5db',
                    borderRadius: 2.5,
                    fontSize: 16,
                    fontWeight: 700,
                    minHeight: 54,
                    '&:hover': {
                      backgroundColor: '#f9fafb',
                      borderColor: '#c7ced8',
                    },
                  }}
                >
                  Google로 로그인하기
                </Button> */}
              </Stack>
            </Stack>

            <Divider sx={{ borderColor: 'grey.200', my: 3.8 }} />

            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                color: 'grey.500',
                fontSize: 15,
                lineHeight: 1,
              }}
            >
              아직 계정이 없으신가요?
              <MuiLink
                component={Link}
                href="/signup"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                회원가입
              </MuiLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <MuiLink
        component={Link}
        href="/"
        sx={{
          alignItems: 'center',
          color: 'grey.400',
          display: 'inline-flex',
          fontSize: 14,
          fontWeight: 600,
          gap: 1.25,
          mt: { md: 4, xs: 3 },
          textDecoration: 'none',
        }}
      >
        <ArrowBackRoundedIcon sx={{ fontSize: 20 }} />
        홈으로 돌아가기
      </MuiLink>
    </Box>
  );
};

export default Login;
