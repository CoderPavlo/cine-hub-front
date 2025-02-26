import { SxProps, Typography } from '@mui/material'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const ErrorDisplay = ({error, sx}: {error? : FetchBaseQueryError | SerializedError, sx?:SxProps}) => {
  return (
    <>
    {error &&
        <Typography sx={sx} variant='body1' color='error'>{"data" in error && error.data ? (error.data as { message?: string }).message || "Unknown error" : "Network error"}</Typography>
    }
    </>
  )
}

export default ErrorDisplay