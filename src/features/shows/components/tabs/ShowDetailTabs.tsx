'use client';

import { useState } from 'react';

import { Box, Tab } from '@mui/material';

import { Performances } from '@/features/shows/types';

import ShowInfoTab from './ShowInfoTab';
import ShowSaleTab from './ShowSaleTab';

import { StyledTabs } from './ShowDetailTabs.styles';

type TabValue = 'info' | 'sale';

interface TabPanelProps {
  value: TabValue;
  activeTab: TabValue;
  children: React.ReactNode;
}

interface ShowDetailTabsProps {
  performanceDates: Performances[];
  posterUrl: string;
}

const TabPanel = ({ value, activeTab, children }: TabPanelProps) => {
  const isActive = value === activeTab;

  return (
    <Box
      id={`show-tabpanel-${value}`}
      role="tabpanel"
      aria-labelledby={`show-tab-${value}`}
      hidden={!isActive}
      sx={{ pt: 7.5 }}
    >
      {isActive && children}
    </Box>
  );
};

const a11yProps = (name: TabValue) => ({
  id: `show-tab-${name}`,
  'aria-controls': `show-tabpanel-${name}`,
});

const ShowDetailTabs = ({
  performanceDates,
  posterUrl,
}: ShowDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState<'info' | 'sale'>('info');

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: 'info' | 'sale'
  ) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ mt: 7 }}>
      <StyledTabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="상세 정보 탭"
      >
        <Tab label="공연정보" value="info" {...a11yProps('info')} />
        <Tab label="판매정보" value="sale" {...a11yProps('sale')} />
      </StyledTabs>

      <TabPanel value="info" activeTab={activeTab}>
        <ShowInfoTab
          performanceDates={performanceDates}
          posterUrl={posterUrl}
        />
      </TabPanel>

      <TabPanel value="sale" activeTab={activeTab}>
        <ShowSaleTab />
      </TabPanel>
    </Box>
  );
};

export default ShowDetailTabs;
