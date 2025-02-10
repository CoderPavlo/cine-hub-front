import { Edit, Inbox, Logout, Wallet, } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { clearTokens } from '../../../store/slices/auth';
export interface IListEl {
    primary: string,
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
    link: string,
}


export default function ProfileTab() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const list: IListEl[] = [
        {
            Icon: Edit,
            primary: 'Edit',
            link: '/edit',
        },
        {
            Icon: Inbox,
            primary: 'Booking',
            link: '/booking',
        },
        {
            Icon: Wallet,
            primary: 'Payment',
            link: '/payment',
        },
        {
            Icon: Logout,
            primary: 'Log out',
            link: '/',
        },
    ];
    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, } }}>
            {list.map((item, index) =>
                <ListItemButton key={index} onClick={()=>{
                    if(item.link==='/')
                        dispatch(clearTokens());
                    navigate(item.link)
                    }}>
                    <ListItemIcon>
                        <item.Icon/>
                    </ListItemIcon>
                    <ListItemText primary={item.primary} />
                </ListItemButton>
            )}
        </List>
    )
}