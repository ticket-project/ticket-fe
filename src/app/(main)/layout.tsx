import { MainHeader } from '@/components/layouts/header';
import { SkipLink } from '@/shared/ui/SkipLink';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SkipLink href="#main-content">본문으로 바로가기</SkipLink>
      <MainHeader />
      {children}
      <footer></footer>
      {/* Footer는 나중에 추가 예정 */}
    </>
  );
};

export default MainLayout;
