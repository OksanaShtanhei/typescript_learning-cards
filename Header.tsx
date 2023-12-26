import React, {useState} from 'react';
import {Typography, Stack, Box, Button, Badge} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BasicModal from './BasicModal';


type CounterProps = {
    counter: number
    removeItem: (id: string) => void;
}
export const Header = ({counter, removeItem}: CounterProps, ) => {
    const [openVocabulary, setOpenVocabulary] = useState <boolean>(false)

    const handleOpen = () => {
        setOpenVocabulary(true)
    }

    return (
        <Box sx={{ bgcolor: 'text.primary', color: 'background.paper', p: 2}} >
            <Stack direction='row' justifyContent='space-between'>
                <Typography variant='h4' gutterBottom>
                    Learning cards
                </Typography>
                <BasicModal open={openVocabulary} setOpen={setOpenVocabulary} removeItem={removeItem}/>
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <Button onClick={handleOpen}>
                        <Badge badgeContent={counter} color="primary">
                            <ListAltIcon/>
                        </Badge>
                    </Button>
                </Box>
            </Stack>
        </Box>
    )
}


