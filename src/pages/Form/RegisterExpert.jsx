import Header from '../components/Header'
import mentorImage from '../../assets/mentor_image.jpg'
import { useSelector } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { SchemaInfoExpert, SchemaRole, SchemaMentorEducationDetails } from './components/SchemaRegisterExpert/schemaRegUser'
import Steppers from './components/components/Stepper'
import { Box } from '@mui/material'
import SelectRoleForm from './components/SelectRoleForm/SelectRoleForm';
import MentorEducatorDetailsForm from './components/MentorEducatorDetailsForm/MentorEducatorDetailsForm';
import ChangeStageButton from './components/components/ChangeStageButton'
import InforExpertForm from './components/InfoExpertForm/InforExpertForm'
import { useEffect, useState } from 'react'
import ShowInfoUpload from './components/components/ShowInfoUpload'

const roleData = [{
    role: 'mentor',
    image: mentorImage,
    label: 'Mentor',
},
{
    role: 'educator',
    image: mentorImage,
    label: 'Giảng viên',
}]


const schemaStage = [SchemaRole, SchemaInfoExpert, SchemaMentorEducationDetails]


export default function RegisterExpert() {


    const [stage, setStage] = useState(0)
    const labels = ['Chọn vai trò', 'Thông tin cá nhân', 'Nội dung chia sẻ']
    const [isStageValid, setIsStageValid] = useState([false, false, false])
    const getAllSchema = schemaStage.slice(0, stage + 1)
    const mergedSchema = getAllSchema.reduce((acc, schema) => {
        return acc.concat(Yup.object().shape(schema.fields));
    }, Yup.object());
    const methods = useForm({
        resolver: yupResolver(mergedSchema),
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
            certificate: [],
        },
    });

    
    // useEffect(() => {
    //     methods.reset(schemaStage[stage].defaultValues)
    // }, [stage])

    return (
        <div className='max-w-screen min-h-screen w-full h-full flex justify-center items-center flex-col '>
            <Header />
            <div className="w-full flex flex-col justify-center items-center px-4">
                <div className="w-full max-w-[80vw] h-full flex justify-between items-center flex-col space-y-12">
                    <h1 className='font-bold text-3xl '>Trở thành chuyên gia của Edtronaut</h1>
                    <FormProvider {...methods}>
                        {!methods.formState.isSubmitSuccessful &&
                            <>
                                <Steppers stage={stage} setStage={setStage} labels={labels} isStageValid={isStageValid} setIsStageValid={setIsStageValid} />
                                <Box
                                    component="form"
                                    sx={{
                                        width: '100%',
                                        margin: 'auto',
                                    }}
                                    className='space-y-8 flex justify-between items-end w-full h-full min-h-[30rem] flex-col'
                                >
                                    {stage === 0 && <SelectRoleForm roleData={roleData} />}
                                    {stage === 1 && <InforExpertForm />}
                                    {stage === 2 && <MentorEducatorDetailsForm />}
                                    <ChangeStageButton stage={stage} setStage={setStage} labels={labels} isStageValid={isStageValid} setIsStageValid={setIsStageValid} />
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
                </div>
            </div>
        </div>

    )
}
