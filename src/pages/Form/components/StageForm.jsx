import { Box } from '@mui/material'
import Form2 from './Form2';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ChangeStageButton from './ChangeStageButton';
import Form1 from './Form1';
import SimpleAutocomplete from './Form3';
import { yupResolver } from '@hookform/resolvers/yup'
import { fullSchema } from './schema'
import Steppers from './Stepper'
import ShowInfoUpload from './ShowInfoUpload';

export default function StageForm() {
    const { stage, labels } = useSelector((state) => state.stageform)
    const methods = useForm({
        resolver: yupResolver(fullSchema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            role: 'mentor',
            fullname: '',
            email: '',
            phonenumber: '',
            linkedln: '',
            social: '',
            gender: 'Anh',
            menteeTarget: [],
            shareContent: [],
            experience: 0,
            expertise: [],
            resume: null,
        },
    });


    return (
        <div className='flex flex-col justify-center items-center w-full h-full space-y-10'>
            <FormProvider {...methods}>
                {!methods.formState.isSubmitSuccessful &&
                    <>
                        <Steppers />
                        <Box
                            component="form"
                            sx={{
                                width: '100%',
                                margin: 'auto',
                            }}
                            className='space-y-8 flex justify-between items-end w-full h-full flex-col'
                        >
                            {stage === 0 && <Form1 />}
                            {stage === 1 && <Form2 />}
                            {stage === 2 && <SimpleAutocomplete />}
                            <ChangeStageButton />
                        </Box>
                    </>
                }
                {methods.formState.isSubmitSuccessful && (() => {
                    const data = methods.getValues();
                    return (
                        <ShowInfoUpload infoUser={data} />
                    );
                })()}
            </FormProvider>
        </div >
    )
}
