import { Dialog, dialogClasses, styled } from '@mui/material'

export const DialogStyled = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'fullHeight'
})<{ fullHeight?: boolean }>(({ fullHeight, theme }) => ({
  [`& .${dialogClasses.paper}`]: {
    height: fullHeight ? '100%' : 'unset',
    borderRadius: 10,
    margin: theme.spacing(6, 4)
  }
}))
