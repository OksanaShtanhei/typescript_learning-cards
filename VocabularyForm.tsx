import { ListItemButton, ListSubheader, ListItem, ListItemText, Grid} from '@mui/material';
import { useContext} from 'react';
import { WordContext } from './WordContext';
import { Response } from './App'
import ClearIcon from '@mui/icons-material/Clear';

type VocabularyProps = {
    removeItem: (id: string) => void;
}

export const VocabularyForm = ({removeItem}: VocabularyProps) => {
    const vocabularyCntxt = useContext(WordContext)

    return <>   
                <ListSubheader component="h3" id="nested-list-subheader">
                    Saved words
                </ListSubheader>
                {vocabularyCntxt.vocabulary.map((el: Response, index: number) => {
                    return <ListItem key={index}>
                                <ListItemButton >
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <ListItemText primary={el.word} />
                                        </Grid> 
                                        <Grid item xs={3}>   
                                            <ListItemText primary={el.phonetic} />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <ListItemText primary={el.translation} />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <ClearIcon onClick={() => removeItem(el.word)}/>
                                        </Grid>
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                })}
            </>
}