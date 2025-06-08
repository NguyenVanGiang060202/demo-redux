import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router';



export default function Header() {
    return (
        <>
            <div className="absolute top-5 left-24 w-fit h-fit flex items-center justify-center bg-sky-50">
                <div className="w-full h-full flex justify-center items-start">
                    <nav className='w-full h-full flex justify-center items-center'>
                        <Box className="w-fit h-fit bg-zinc-200 flex justify-center items-center p-2 !rounded-lg space-x-2 shadow-md">
                            <Button className="w-fit !bg-white h-fit p-2 !rounded-lg shadow-md">
                                <NavLink to="/redux" end>PAGINATION TABLE</NavLink>
                            </Button>
                            <Button className="w-fit !bg-white h-fit p-2 !rounded-lg shadow-md">
                                <NavLink to="/form" end>REACT HOOK FORM</NavLink>
                            </Button>
                        </Box>
                    </nav>
                </div>
            </div>

        </>
    )
}

