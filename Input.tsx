import React from "react";

export type InputProps={
    value: string
    styles: React.CSSProperties
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = (props: InputProps) => {
    return <input type='text' value={props.value} onChange={props.handleChange} style={props.styles}/>
}