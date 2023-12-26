import {Header} from './Header'
import {ButtonComponent} from './Button'
import {Input} from './Input'
import {Main} from './Main'
import { useEffect, useState} from 'react'
import {Stack, Box} from '@mui/material'
import { FetchWord } from './actions/fetchWord'
import {WordContext} from './WordContext';
import BasicModal from './BasicModal';

type Meanings = {
    definitions?: {
        definition: string,
    }[],
    synonyms?: string[],
    antonyms?: string[],
    partOfSpeech?: string,
}
export type Response = {
    id: string,
    phonetic?: string,
    word: string,
    phonetics?: {
        audio: string,
    }[],
    audio?: string,
    translation: string,
    meanings: Meanings[],
}

const App = () => {
    const [wordInput, setWordInput] = useState('')
    const [translate, setTranslate] = useState('')
    const [vocabulary, setVocabulary] = useState<Response[]> ([])//all meanings
    const [status, setStatus] = useState<boolean>(true)
    const [counter, setCounter] = useState<number>(0)
    const [res, setRes] = useState<Response[]>([])
    const [completedWord, setCompletedWord] = useState<Response[]>([])
    const [open, setOpen] = useState <boolean>(false)
    
    const handleOpen = () => setOpen(true);

    const handleClick = async() => {
        const post = await FetchWord(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`)
        setRes(post)
        handleOpen()
    }

    const makeUniq= (word: string) => {
        let filtered: Response[] = []
        vocabulary !== undefined && vocabulary.map((el, index) => {
            if(el.word === word){
                filtered = vocabulary.splice(index, 1)
                setVocabulary(filtered) 
            } 
        })
    }

    const removeItem = (id: string): void => {
        setVocabulary(vocabulary.filter(item => item.id !== id))
    }

    useEffect(() => {
        res !== undefined && res.map((el: Response) => {
            const {word, phonetic, phonetics, meanings, translation} = el
            let current: string | undefined
            if(phonetics !== undefined){
                for(let i = 0; i < phonetics?.length; i++) {
                    if(phonetics[i]?.audio !== '') {
                        current = phonetics[i]?.audio
                        break;
                    }
                }
            }
            let audio = current
            let id = word
            setCompletedWord([{
                id,
                word,
                phonetic,
                audio,
                meanings, 
                translation
            }]) 
        })   
    }, [res])

    useEffect(() => {
        if(completedWord.length > 0){
            const {word} = completedWord[0]
            makeUniq(word)
            setVocabulary([...vocabulary, ...completedWord])
        }
    }, [completedWord])

    useEffect(() => {
        if(vocabulary.length > 0) {
            setStatus(false)
            localStorage.setItem('vocabulary', JSON.stringify(vocabulary))
            setWordInput('')
            setTranslate('')
            
        }
        let countW: number = 0
            for(let i=0; i<=vocabulary.length; i++){
                setCounter(() => countW+i)
            }
    }, [vocabulary])

    return (
        <Stack spacing={3} >
            <WordContext.Provider value={{vocabulary, setVocabulary, completedWord, setCompletedWord}}>
                <Header counter={counter} removeItem={removeItem}/>   
                <Box sx={{width:'100%'}}>
                    <Input value={wordInput} 
                        handleChange={((event) => {
                            setWordInput(event.currentTarget.value)})}
                        styles={{padding: '20px', width: '75%', marginBottom: '20px'}}
                        />
                    <ButtonComponent handleClick={handleClick} title="Submit a word" width="25%"/> 
                </Box>
                <Main status={status}/> 
                <BasicModal open={open} setOpen={setOpen} res={res} removeItem={removeItem}/>
            </WordContext.Provider>
        </Stack>    
    )
}
export default App;
