import { forwardRef } from 'react';

import { Fade, Box, Grow } from '@mui/material';

interface ITransitionProps {
    children: React.ReactNode,
    type: 'grow' | 'fade',
}
const Transitions = forwardRef(({ children, type = 'grow', ...others }: ITransitionProps, ref) => {
    let positionSX = {
        transformOrigin: '0 0 0'
    };
    return (
        <Box ref={ref}>
            {type === 'grow' && (
                <Grow {...others}>
                    <Box sx={positionSX}>{children}</Box>
                </Grow>
            )}
            {type === 'fade' && (
                <Fade
                    {...others}
                    timeout={{
                        appear: 0,
                        enter: 300,
                        exit: 150
                    }}
                >
                    <Box sx={positionSX}>{children}</Box>
                </Fade>
            )}
        </Box>
    )
})

export default Transitions;