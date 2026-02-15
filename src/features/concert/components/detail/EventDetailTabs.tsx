'use client';

import { useState } from 'react';

import { Box, Tab } from '@mui/material';

import EventInfoTab from './EventInfoTab';
import EventSaleTab from './EventSaleTab';

import { StyledTabs } from './EventDetail.styles';

const EventDetailTabs = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'sale'>('info');

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: 'info' | 'sale'
  ) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ mt: 7 }}>
      <StyledTabs value={activeTab} onChange={handleTabChange}>
        <Tab label="공연정보" value="info"></Tab>
        <Tab label="판매정보" value="sale"></Tab>
      </StyledTabs>
      <Box sx={{ pt: 7.5 }}>
        {activeTab === 'info' && <EventInfoTab />}
        {activeTab === 'sale' && <EventSaleTab />}
      </Box>
    </Box>
  );
};

export default EventDetailTabs;
