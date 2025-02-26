import { Card, CardContent, CardMedia, Skeleton, Box, Typography } from "@mui/material";

const MovieCardSkeleton = () => {
    return (
        <Card>
            <Skeleton variant="rectangular" width="100%" height={300} />
            <CardContent>
                <Typography variant="h6">
                    <Skeleton width="80%" />
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <Skeleton width="40%" />
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    <Skeleton width="100%" height={40} />
                </Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} variant="rounded" width={60} height={24} />
                    ))}
                </Box>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Skeleton variant="rectangular" width={180} height={36} />
                    <Skeleton variant="circular" width={36} height={36} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default MovieCardSkeleton;
