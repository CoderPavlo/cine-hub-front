import React from 'react'


import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Typography, alpha } from '@mui/material';

interface IMainCardProps{
    border: boolean,
  boxShadow?: boolean,
  contentSX?: object,
  darkTitle?: boolean,
  divider?: boolean,
  elevation: number,
  secondary?: React.ReactNode,
  shadow?: string,
  sx?: object,
  title?: string | React.ReactNode,
  codeHighlight?: boolean,
  content: boolean,
  children: React.ReactNode
}

const headerSX = {
    p: 2.5,
    '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
  };
  const MainCard =
    (
      {
        border = true,
        boxShadow,
        children,
        content = true,
        contentSX = {},
        darkTitle,
        elevation,
        secondary,
        shadow,
        sx = {},
        title,
        codeHighlight,
        ...others
      } : IMainCardProps,
    ) => {
      const theme = useTheme();

      return (
        <Card
          elevation={elevation || 0}
          {...others}
          sx={{
            border: border ? '1px solid' : 'none',
            borderRadius: 2,
            borderColor: theme.palette.divider,
            boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || `0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}` : 'inherit',
            ':hover': {
              boxShadow: boxShadow ? shadow || `0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}` : 'inherit'
            },
            '& pre': {
              m: 0,
              p: '16px !important',
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.75rem'
            },
            ...sx
          }}
        >
          {/* card header and action */}
          {!darkTitle && title && (
            <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />
          )}
          {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}
  
          {/* card content */}
          {content && <CardContent sx={contentSX}>{children}</CardContent>}
          {!content && children}
          {codeHighlight}
        </Card>
      );
    }

export default MainCard;