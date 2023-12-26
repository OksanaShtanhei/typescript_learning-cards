import {Button} from '@mui/material'

type ButtonProps ={
    handleClick: () => void
    title: string
    width: string
}

export const ButtonComponent = (props: ButtonProps) => {
    return <Button variant='contained' sx={{width: `{props.width}`, py: 2}} onClick={props.handleClick}>{props.title}</Button>
}