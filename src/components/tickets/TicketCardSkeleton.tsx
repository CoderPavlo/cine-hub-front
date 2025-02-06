import { Card, CardContent, Skeleton, Box } from "@mui/material";
import { StyledCard } from "../home/MovieCard";
import { StyledBadge } from "./TicketCard";

export default function TicketCardSkeleton() {
    return (
        <StyledCard>
            <StyledBadge badgeContent={<Skeleton variant="text" width="30px" height='25px' />} 
            slotProps={{
                badge: {
                    style: {border: 'none'}
                }
            }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="text" width="80%" height={20} />
                    <Skeleton variant="text" width="50%" height={20} />

                    <Box sx={{ mt: 2, display: "flex", gap: 1, width: '100%' }}>
                        <Skeleton variant="rectangular" width={64} height={64} />
                        <Box display='flex' flexDirection='row' gap={1}>
                            <Skeleton variant="circular" width={30} height={30} />
                            <Skeleton variant="circular" width={30} height={30} />
                        </Box>
                        <Box display="flex" alignItems="end" justifyContent='end' flex={1}>
                            <Skeleton variant="text" width={80} height={30} />
                        </Box>
                    </Box>
                </CardContent>
            </StyledBadge>
        </StyledCard>
    );
}