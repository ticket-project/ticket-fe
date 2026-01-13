import { MainHeader } from '@/components/layouts/header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      {children}
      {/* Footer는 나중에 추가 예정 */}
    </>
  );
};

export default MainLayout;
