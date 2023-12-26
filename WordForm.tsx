import React, { useState, useContext, useEffect } from 'react'
import {FormControl, FormControlLabel, Radio, RadioGroup, Typography, Box, FormLabel, TextField} from '@mui/material';
import {Response} from './App'
import { WordContext } from './WordContext';

type WordFormProps = {
    item: Response[]
}
  
export const WordForm = ({item}: WordFormProps) => {
    const [radio, setRadio] = useState<string>('')
    const cmpltdCntxt = useContext(WordContext)

    const name =cmpltdCntxt.completedWord[0].word
    const audio = cmpltdCntxt.completedWord[0].audio
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadio((event.target as HTMLInputElement).value)
    }
    
    useEffect(() => {
        if(radio !== ''){
            cmpltdCntxt.completedWord.map(el => {
                el.translation = radio
            })
        }
    }, [radio])
    return (
        <Box>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                    <Typography variant="h5" style={{ textAlign: 'center' }} gutterBottom>
                        {name}
                    </Typography>
                    
                    <figure>
                        <audio
                        controls
                        src={audio}
                        >
                            <a href={audio}>
                                Download audio
                            </a>
                        </audio>
                    </figure> 
                </FormLabel>
                <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        onChange={handleChange}
                >
                    <Box>
                        <FormControlLabel value={radio} control={<Radio />} label=''/>
                        <TextField id="outlined-basic" label="Your choise" variant="outlined" size="small" value={radio} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setRadio(event.target.value);
  }}/> 
                    </Box>         
                    {item.map((el: Response, index: number) => {
                        return <Box key={index}>
                                    <Typography >{el.phonetic}</Typography>
                                    {el.meanings.map((meaning, index: number) => {
                                        return <Box key={index}>
                                                    {meaning.definitions?.map((definition, index: number)=> {
                                                        return <FormControlLabel sx={{width: '100%'}} key={index} value={definition.definition} control={<Radio />} label={definition.definition}/>
                                                    })}
                                                </Box>
                                    })}  
                                </Box>
                    })}
                </RadioGroup>
            </FormControl>
        </Box>
    ) 
}


