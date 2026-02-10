import SearchIcon from '@mui/icons-material/Search';
import { SxProps } from '@mui/material';

import { Search, SearchButton, StyledInputBase } from './SearchBar.styles';

interface SearchBarProps {
  sx?: SxProps;
}

const SearchBar = ({ sx }: SearchBarProps) => {
  return (
    <Search role="search" onSubmit={(e) => e.preventDefault()} sx={sx}>
      <label htmlFor="header-search" className="sr-only">
        검색
      </label>
      <StyledInputBase
        id="header-search"
        type="search"
        aria-label="검색어 입력"
        placeholder="Highlight 왔다, 에블바디 뛰어 !"
      />
      <SearchButton type="submit" aria-label="검색">
        <SearchIcon />
      </SearchButton>
    </Search>
  );
};

export default SearchBar;
