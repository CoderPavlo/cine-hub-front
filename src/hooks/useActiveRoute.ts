import { useLocation } from 'react-router-dom';

export function useActiveRoute() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return { isActive };
}