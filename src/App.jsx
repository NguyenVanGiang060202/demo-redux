
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TableUser from './components/TableUser';
import { useState } from 'react';
import { useGetAllUserQuery } from './services/userApi';
import { useSelector } from 'react-redux';
import { selectAllUsers } from './features/users/usersSlice';



function App() {



  const [value, setValue] = useState('pagination');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>

      <div className="w-dvw h-dvh flex items-center justify-center bg-sky-50">
        <div className="w-3/4 h-3/4 flex justify-center items-start ">
          <Box sx={{ width: '100%', typography: 'body1' }} className="w-full">
            <TabContext value={value} >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="bg-zinc-200 shadow-md rounded-lg !w-fit">
                <TabList onChange={handleChange} aria-label="lab API tabs example" className='!w-fit !p-2 !px-4' >
                  <Tab label="Pagination table" value="pagination" className={`!mr-2 ${value === 'pagination' && " !bg-white !rounded-lg"}`} />
                  <Tab label="React-Hook-Form" value="react-hook-form" className={`!ml-2 ${value === 'react-hook-form' && " !bg-white !rounded-lg"}`} />
                </TabList>
              </Box>
              <TabPanel value="pagination" className='w-full h-full flex justify-center items-center'>
                <TableUser />
              </TabPanel>
              <TabPanel value="react-hook-form">Item Two</TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>

    </>
  )
}

export default App
