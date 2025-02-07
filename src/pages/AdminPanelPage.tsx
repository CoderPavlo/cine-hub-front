import { Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react'
import CinemasTab from '../components/adminPanel/CinemasTab';
import HallsTab from '../components/adminPanel/HallsTab';
import SessionsTab from '../components/adminPanel/SessionsTab';

const tabList = [
    {
        name: 'Cinemas',
        Tabpanel: <CinemasTab />,
    },
    {
        name: 'Halls',
        Tabpanel: <HallsTab />,
    },
    {
        name: 'Sessions',
        Tabpanel: <SessionsTab />,
    },
]

export default function AdminPanelPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <Box sx={{ my: 4 }}>
            <Tabs value={selectedTab} onChange={(e, value) => setSelectedTab(value)} centered aria-label="tabs">
                {tabList.map((item, index) =>
                    <Tab label={item.name} key={index} />
                )}
            </Tabs>
            {tabList[selectedTab].Tabpanel}
        </Box>
    )
}
