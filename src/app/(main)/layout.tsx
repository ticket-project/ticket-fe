const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Headers/> */}
      헤더
      {children}
      푸터
      {/* <Footer/> */}
    </>
  );
};

export default MainLayout;
