import { Card, CardContent, Stack, Skeleton } from "@mui/material";

const SessionCardSkeleton = () => {
    return (
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}>
            <Skeleton variant="rectangular" height='100%' sx={{ aspectRatio: "2/3", width: { md: '50%' } }} />
            <CardContent component={Stack} direction='column' spacing={2} flexGrow={1}>
                <Skeleton variant="text" width="60%" height={40} sx={{ mx: 'auto' }} />
                <Stack direction='row' spacing={1} alignItems='center' justifyContent={{ xs: 'center', md: 'left' }}>
                    <Skeleton variant="rectangular" width={30} height={20} />
                    <Skeleton variant="rectangular" width={50} height={20} />
                    <Skeleton variant="rectangular" width={50} height={20} />
                </Stack>
                <Skeleton variant="text" width="40%" height={30} />
                <Stack spacing={2} direction='row'>
                    <Skeleton variant="rectangular" width="50%" height={97} />
                    <Skeleton variant="rectangular" width="50%" height={97} />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default SessionCardSkeleton;
