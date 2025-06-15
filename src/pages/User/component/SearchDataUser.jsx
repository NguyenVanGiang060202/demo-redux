import { Button, FormControl, Input, InputAdornment, TextField } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';


export default function SearchDataUser() {
    return (
        <div className="w-full h-fit flex justify-between items-center py-4">
            <div className="flex justify-center items-center border-2 p-2 w-fit h-fit gap-1 rounded-full">
                <AccountCircle />
                {/* <FormControl variant="standard">
                    <TextField
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                                ''
                            },
                        }}
                        size="small"
                        placeholder="Search customer"
                    />
                </FormControl> */}
            </div>
            <div className="w-fit h-fit space-x-2">
                <Button size="small" variant="outlined">Sort</Button>
                <Button size="small" variant="outlined">Setting</Button>
            </div>
        </div>
    )
}
