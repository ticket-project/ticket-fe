// 'use client';

// /**
//  * @file AuthHeader 컴포넌트
//  * @description 로그인/회원가입 페이지용 간소화된 헤더
//  */

// import { Container, Toolbar } from '@mui/material';

// import { LogoLink, LogoText, StyledAppBar } from './AuthHeader.styles';

// import type { AuthHeaderProps } from './AuthHeader.types';

// /** 헤더 설정 */
// const header_config = {
//   LOGO_TEXT: 'TICKET1',
//   ARIA_LABELS: {
//     HOME: '홈으로 이동',
//   },
// } as const;

// /**
//  * 인증 헤더 컴포넌트
//  * @description 로그인/회원가입 페이지에서 사용하는 간소화된 헤더
//  */
// const AuthHeader = ({ className }: AuthHeaderProps) => {
//   return (
//     <StyledAppBar component="header" elevation={0} className={className}>
//       <Container>
//         <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
//           <LogoLink href="/" aria-label={HEADER_CONFIG.ARIA_LABELS.HOME}>
//             <LogoText variant="h1">{HEADER_CONFIG.LOGO_TEXT}</LogoText>
//           </LogoLink>
//         </Toolbar>
//       </Container>
//     </StyledAppBar>
//   );
// };

// export default AuthHeader;
const AuthHeader = () => {
  return <></>;
};
export default AuthHeader;
