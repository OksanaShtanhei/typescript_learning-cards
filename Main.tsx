import { useContext, useEffect, useState} from 'react'
import {Response} from './App'
import { WordContext } from './WordContext'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Typography, Tooltip, Box} from '@mui/material/'

type MainProps ={
    status: boolean
    // vocabulary: Response[]
}

export const Main = (props: MainProps)=> {
    const vocabularyCntxt = useContext(WordContext).vocabulary
    const [rand, setRand] = useState<number>(0)
    const [current, setCurrent] = useState<Response | null>(null)
    const [tag, setTag] = useState<string>('')
 
    let message
    if(props.status === true){
        message = 'Fill your vocabulary'
    } else {
        message = 'Your vocabulary:'
    }
    function getRandom(){
        let randomNumber = Math.floor(Math.random() * vocabularyCntxt.length);
        setRand(randomNumber)
        let randomItem = vocabularyCntxt[rand]
        setCurrent(randomItem) 
    }
    useEffect(() => {
        getRandom()
    }, [vocabularyCntxt])
    const toggleCurrent = (tag: string) => {
        if(tag === 'Front'){
            if(rand >= vocabularyCntxt.length-1){
                setRand(0)
            } else {
                setRand(() => rand+1)
            }
            let next = vocabularyCntxt[rand]
            setCurrent(next)
        }
        if(tag === 'Back'){
            if(rand <= 0){
                setRand(vocabularyCntxt.length-1)
            } else{
                setRand(() => rand-1)
            }
            let prev = vocabularyCntxt[rand]
            setCurrent(prev)
        }
    }
    const handleClick = (item: any) => {
        console.log(item)
        if(item.tagName === 'svg') {
            setTag(item.ariaLabel)
        } else if(item.tagName === 'path'){
            setTag(item.parentNode.ariaLabel)
        } else if(item.tagName === 'div'){
            console.log(item.value)
        }
        toggleCurrent(tag)
    }
    return (
        <>
            <h2>{message}</h2>
            <Box
                sx={{ display: 'flex'}}
                onClick={(e) => handleClick(e.target)}
            >
                
                <Box >
                    <Tooltip title="Back" sx={{cursor: "pointer"}} >
                        <ArrowLeftIcon fontSize='large' />
                    </Tooltip>
                </Box>
                

                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" color="primary">
                        <Box sx={{ textAlign: 'center' }}>
                            {current != null ? current.word : 'null'}
                        </Box>  
                    </Typography>   
                </Box> 

                
                <Box >
                    <Tooltip title="Front" sx={{cursor: "pointer"}}>
                        <ArrowRightIcon fontSize='large'/>
                    </Tooltip>   
                </Box>
                
            </Box>
           
            <ol>
                {vocabularyCntxt.map((el, index) => {
                    let {word, phonetic, translation} = el
                    return ( 
                            <li key={index}>{word} - {phonetic} - {translation}</li>
                    )
                })}
            </ol>
        </>
    )
}