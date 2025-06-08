import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { setStageValid } from '../features/stageform/stageformSlice';
import { useDispatch } from 'react-redux';



const fieldsPerStep = {
    0: ['role'],
    1: ['fullname', 'gender', 'email', 'phonenumber', 'linkedln', 'social'],
    2: ['menteeTarget', 'shareContent', 'experienceYears', 'expertise']
};

export function useCheckValidStage(stage) {


    const { trigger, getValues, unregister, formState: { errors } } = useFormContext();
    // const fieldsToValidate = fieldsPerStep[stage];

    const role = getValues('role')
    const fieldsToValidate = (() => {
        if (stage === 2) {
            if (role === 'mentor') return ['menteeTarget', 'shareContent'];
            if (role === 'educator') return ['experienceYears', 'expertise', 'resume'];
            return [];
        }
        return fieldsPerStep[stage];
    })();
    const field = useWatch({ name: fieldsToValidate });
    const dispatch = useDispatch()
    

    useEffect(() => {
        const validate = async () => {
            const valid = await trigger(fieldsToValidate);
            dispatch(setStageValid(valid))
        }
        validate()
    }, [JSON.stringify(field)]);

    return;
}
