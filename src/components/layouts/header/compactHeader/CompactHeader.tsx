import { Box, Toolbar } from '@mui/material';

const CompactHeader = () => {
  return (
    <Box sx={{ px: 2 }}>
      <Toolbar disableGutters variant="dense" sx={{ width: '100%' }}>
        <nav aria-label="메뉴" id="gnb-menu" tabIndex={-1}>
          <Box component="ul" sx={{ display: 'flex' }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <NavButton
                  {...{
                    component: Link,
                    href: item.href,
                  }}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </NavButton>
              </li>
            ))}
          </Box>
        </nav>
        {isScrolled && <SearchBar sx={{ ml: 1 }} />}
        {isScrolled && <AuthButtons />}
      </Toolbar>
    </Box>
  );
};
