import { Box, Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useFormContext } from 'react-hook-form';

import { useEffect } from 'react';
import { useCallback } from 'react';






export default function ChangeStageButton({ stage, setStage, labels, isStageValid, setIsStageValid }) {

    const { handleSubmit, getValues, formState: { isValid, errors } } = useFormContext()

    useEffect(() => {
        const newValid = [...isStageValid];
        newValid[stage] = isValid;
        setIsStageValid(newValid)
        console.log("error from button: ", errors)
    }, [isValid])


    



    const handleNext = () => {
        if (isStageValid[stage]) {
            if (stage < labels.length - 1) {
                setStage(stage + 1)
            }
        }
    };


    const handleBack = () => {
        if (stage > 0) {
            setStage(stage - 1)
        }
    };

    const onSubmit = (data) => {
        if (isValid) {
            console.log("Form values: ", getValues())
            console.log("Form errors: ", errors)
            console.log("Form total isValid: ", isValid)
            console.log("Form submitted data: ", data)
        }
    };

    const keyHandler = useCallback((e) => {
        if (e.key === 'Enter') {
            if (stage === labels.length - 1) {
                handleSubmit(onSubmit)();
            } else {
                handleNext();
            }
        }
    }, [stage, labels.length, handleNext, handleSubmit, onSubmit]);

    useEffect(() => {
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, [keyHandler]);


    return (
        <div className="w-full h-fit flex justify-between items-center">
            <Box className="w-full h-fit flex justify-between items-center">
                <Button
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1, border: 2, fontWeight: 700 }}
                    className={` ${stage <= 0 && '!invisible'} !p-2 !gap-2 !px-6 !text-indigo-800`}
                >
                    <ArrowBackIcon />
                    Trở về
                </Button>
                {stage === labels.length - 1
                    ? <Button
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        disabled={!isStageValid[stage] || !isValid}
                        sx={{
                            mt: 1, mr: 1, font: 'bold', fontWeight: 700,
                            '&.Mui-disabled': {
                                backgroundColor: '#94a3b8 !important',
                                color: '#ffffff',
                                cursor: 'not-allowed',
                            },
                        }}
                        className='!bg-indigo-800 !p-2 !gap-2 !px-6'
                    >
                        Đăng kí
                    </Button>
                    :
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={!isStageValid[stage]}
                        sx={{
                            mt: 1, mr: 1, font: 'bold', fontWeight: 700,
                            '&.Mui-disabled': {
                                backgroundColor: '#94a3b8 !important',
                                color: '#ffffff',
                                cursor: 'not-allowed',
                            },
                        }}
                        className='!bg-indigo-800 !p-2 !gap-2 !px-6 '
                    >
                        Tiếp tục
                        <ArrowForwardIcon />
                    </Button>
                }
            </Box>
        </div>
    )
}
