import React, { useContext, createContext} from 'react'
import {Response} from './App'

export type ContextProps = {
    vocabulary: Response[]
    setVocabulary: React.Dispatch<React.SetStateAction<Response[]>>
    completedWord: Response[]
    setCompletedWord: React.Dispatch<React.SetStateAction<Response[]>>
}
export const WordContext = createContext<ContextProps >({
    vocabulary: [],
    setVocabulary: () => {},
    completedWord: [],
    setCompletedWord: () => {}
})
export const useGlobalWordContext = () => useContext(WordContext)