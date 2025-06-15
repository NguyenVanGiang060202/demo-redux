import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';


export default function Steppers({ stage, setStage, labels, isStageValid, setIsStageValid }) {

    const { handleSubmit, getValues, formState: { isValid, errors } } = useFormContext()

    useEffect(() => {
        const newValid = [...isStageValid];
        newValid[stage] = isValid;
        setIsStageValid(newValid)
    }, [isValid])

    const handleGoTo = (index) => {
        if (isStageValid[index]) {
            if (index >= 0 && index < labels.length) {
                setStage(index)
            }
        }
    }
    return (
        <div className="w-full h-fit flex justify-center items-center flex-col">
            <Stepper activeStep={stage} connector={<></>} className='w-full h-fit flex justify-between items-center space-x-4'>
                {labels.map((label, index) => (
                    <Step key={index} value={index} className={`bg-white w-full h-full p-2 border-b-4 ${stage >= index && ' border-indigo-800 !bg-violet-100'} hover:cursor-pointer`} onClick={() => { handleGoTo(index) }}>
                        <StepLabel StepIconComponent={() => <></>} sx={{ display: 'inline-block' }}>
                            <div className="w-full h-full flex justify-center items-center gap-2">
                                <Typography variant='subtitle1' className='!text-2xl !font-bold !text-indigo-800'>Bước {index + 1}</Typography>
                                {isStageValid[index] && (
                                    <CheckCircleIcon className="text-green-400" fontSize="medium" />
                                )}
                            </div>
                        </StepLabel>
                        <div className="font-medium text-slate-500">{label}</div>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}
