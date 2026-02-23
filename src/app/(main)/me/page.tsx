'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { deleteMember } from '@/features/auth/api';
import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/store/authStore';

const MyPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    if (isDeleting) {
      return;
    }

    setIsDeleteDialogOpen(false);
  };

  const deleteMemberMutation = useMutation({
    mutationFn: () => deleteMember(accessToken),
    onSuccess: () => {
      clearAuth();
      enqueueSnackbar('회원탈퇴가 완료되었습니다.', { variant: 'success' });
      router.replace('/');
      router.refresh();
    },
    onError: (error) => {
      console.error('회원탈퇴 API 호출에 실패했습니다.', error);
      enqueueSnackbar('회원탈퇴 처리 중 오류가 발생했습니다.', {
        variant: 'error',
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      setIsDeleteDialogOpen(false);
    },
  });

  const isDeleting = deleteMemberMutation.isPending;

  const handleDeleteAccount = () => {
    deleteMemberMutation.mutate();
  };

  return (
    <Container sx={{ py: { md: 8, xs: 4 } }}>
      <Box sx={{ maxWidth: 720, mx: 'auto' }}>
        <Typography
          variant="h2"
          sx={{ fontSize: { md: 30, xs: 24 }, fontWeight: 800, mb: 3 }}
        >
          마이페이지
        </Typography>

        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { md: 3.5, xs: 2.5 } }}>
            <Stack spacing={1.2}>
              <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                회원탈퇴
              </Typography>
              <Typography sx={{ color: 'grey.600', fontSize: 14 }}>
                탈퇴 시 계정 정보는 복구할 수 없습니다. 신중하게 진행해 주세요.
              </Typography>
            </Stack>
          </CardContent>
          <CardActions sx={{ p: { md: 3.5, xs: 2.5 }, pt: 0 }}>
            <Button
              color="error"
              disabled={isDeleting}
              variant="outlined"
              onClick={handleOpenDeleteDialog}
            >
              회원탈퇴
            </Button>
          </CardActions>
        </Card>
      </Box>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>회원탈퇴 하시겠습니까?</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'grey.700', fontSize: 14 }}>
            탈퇴 후에는 계정을 복구할 수 없습니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={isDeleting} onClick={handleCloseDeleteDialog}>
            취소
          </Button>
          <Button
            color="error"
            disabled={isDeleting}
            variant="contained"
            onClick={handleDeleteAccount}
          >
            {isDeleting ? '처리 중...' : '탈퇴하기'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyPage;
