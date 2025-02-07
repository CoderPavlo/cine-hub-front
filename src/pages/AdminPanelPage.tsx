import { Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react'
import CinemasTab from '../components/adminPanel/CinemasTab';
import HallsTab from '../components/adminPanel/HallsTab';
import SessionsTab from '../components/adminPanel/SessionsTab';
import { useSearchParams } from 'react-router-dom';

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
const getTab = (tab: string | null) => {
    let result = Number(tab);
    if (isNaN(result) || result < 0 || result > tabList.length) result = 0;
    return result;
}
export default function AdminPanelPage() {
    const [searchParams] = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(getTab(searchParams.get('tab')));
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
