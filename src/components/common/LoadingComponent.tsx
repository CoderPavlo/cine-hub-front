import { Update } from "@mui/icons-material"
import { Box, CircularProgress, Typography, IconButton } from "@mui/material"
import { ReactNode } from "react"

interface LoadingComponentProps {
    loading: boolean,
    error: boolean,
    skeleton?: ReactNode,
    refetch: () => void,
    children: ReactNode,
    height?: string | number,
}
export default function LoadingComponent({ loading, error, skeleton, refetch, children, height }: LoadingComponentProps) {
    return (
        <>
            {loading ?
                <>
                    {skeleton ? skeleton :
                        <Box sx={{ display: 'flex', height: height ? height : '100px', flexDirection: 'column', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    }
                </> :
                error ?
                    <>
                        <Typography variant='h6' color='error' textAlign='center' display='flex' alignItems='center' height={height} justifyContent='center' >
                            <>
                                An error occurred while loading
                                <IconButton sx={{ marginLeft: 1 }} onClick={refetch}>
                                    <Update />
                                </IconButton>
                            </>
                        </Typography>
                    </> :
                    children
            }
        </>
    )
}
