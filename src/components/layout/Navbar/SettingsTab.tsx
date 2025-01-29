import {
    ToggleButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    ToggleButtonGroup,
} from "@mui/material";

import { ExpandLess, ExpandMore, Contrast, SettingsBrightness, DarkMode, LightMode, Help, Security, Feedback } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { setMode, TMode } from '../../../store/slices/theme';
import { IListEl } from './ProfileTab';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
interface StyledToggleButtonGroupProps {
    value: any,
    onChange: (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => void,
    children: React.ReactNode,
}

const StyledToggleButtonGroup = ({ value, onChange, children }: StyledToggleButtonGroupProps) => {
    return (
        <ToggleButtonGroup
            color="primary"
            value={value}
            exclusive
            onChange={onChange}
            aria-label="Platform"
            sx={{ width: "100%", marginTop: "5px", marginBottom: "5px" }}
        >
            {children}
        </ToggleButtonGroup>
    );
};

const themeModes = [
    { value: 'light', icon: <LightMode /> },
    { value: 'system', icon: <SettingsBrightness /> },
    { value: 'dark', icon: <DarkMode /> }
];

const list: IListEl[] = [
    {
        Icon: Help,
        primary: 'Support',
        link: '/support',
    },
    {
        Icon: Security,
        primary: 'Privacy Center',
        link: '/privacy',
    },
    {
        Icon: Feedback,
        primary: 'Feedback',
        link: '/feedback',
    }

]

export default function SettingsTab() {
    const { mode } = useAppSelector(state => state.themeReducer);
    const navigate = useNavigate();
    const [collapse, setCollapse] = useState(false);
    const dispath = useAppDispatch();
    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, } }}>
            {list.map((item, index) =>
                <ListItemButton key={index} onClick={() => navigate(item.link)}>
                    <ListItemIcon>
                        <item.Icon />
                    </ListItemIcon>
                    <ListItemText primary={item.primary} />
                </ListItemButton>
            )}
            <ListItemButton onClick={() => setCollapse((value) => !value)}>
                <ListItemIcon>
                    <Contrast />
                </ListItemIcon>
                <ListItemText primary="Theme" />
                {collapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={collapse} timeout="auto" unmountOnExit>
                <ListItem>
                    <StyledToggleButtonGroup
                        value={mode}
                        onChange={(e, value) => { if (value && value != mode) dispath(setMode(value as TMode)); }}
                    >
                        {themeModes.map((item, index) =>
                            <ToggleButton key={index} value={item.value} sx={{ width: item.value === 'system' ? '40%' : '30%', display: 'flex', justifyContent: 'space-around' }}>
                                {item.icon}
                                {item.value}
                            </ToggleButton>
                        )}
                    </StyledToggleButtonGroup>
                </ListItem>
            </Collapse>
        </List>
    )
}