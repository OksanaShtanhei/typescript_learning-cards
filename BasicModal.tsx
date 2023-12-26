import {Box, Modal, List }from '@mui/material';
import { Response } from './App'
import { WordForm } from './WordForm';
import { VocabularyForm } from './VocabularyForm';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  marginTop: 4,
  transform: 'translateX(-50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type ModalProps = {
  res?: Response[]
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  removeItem: (id: string) => void;
}
export default function BasicModal({ res, open, setOpen, removeItem }: ModalProps) {
  const handleClose = () => setOpen(false)

  return (
    <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: 'scroll'}}
        >
            <Box sx={style}>
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 5}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                {res === undefined && open === true ? <VocabularyForm removeItem={removeItem}/>
                :
                res !== undefined && <WordForm item={res}/>
                }    
                </List>
            </Box>
        </Modal>
    </>
  )
}