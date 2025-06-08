import { Box, Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { nextStage, prevStage, setStageValid } from '../../../features/stageform/stageformSlice';
import { useFormContext } from 'react-hook-form';
import { useCheckValidStage } from '../../../hook/useCheckValidStage';
import { useEffect } from 'react';






export default function ChangeStageButton() {
    const { stage, labels, isStageValid } = useSelector((state) => state.stageform)
    const dispatch = useDispatch()

    const { handleSubmit, formState: {isValid, errors} } = useFormContext()

    useCheckValidStage(stage);

    useEffect(()=>{
        console.log("Form total isValid: ", isValid)
        console.log(`Form stage ${stage} isValid: `, isStageValid[stage])
    }, [isValid])

    const handleNext = () => {
        if(isStageValid[stage]){
            dispatch(nextStage())
        }
    };


    const handleBack = () => {
        dispatch(prevStage())
    };

    const onSubmit = (data) => {
        console.log(errors)
        console.log("Submitted from SubmitButton", data);
    };


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
                        disabled={!isStageValid[stage]}
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
