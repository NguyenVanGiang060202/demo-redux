import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    stage: 0,
    labels: ['Chọn vai trò', 'Thông tin cá nhân', 'Nội dung chia sẻ'],
    isStageValid: [false, false, false],
}

export const stageformSlice = createSlice({
    name: 'stageform',
    initialState,
    reducers: {
        prevStage: (state) => {
            if(state.stage > 0){
                state.stage -= 1
            }
        },
        nextStage: (state) => {
            if(state.stage < state.labels.length - 1 ){
                state.stage += 1
            }
        },
        goToStage: (state, action) =>{
            const target = action.payload
            if(target >= 0 && target < state.labels.length){
                state.stage = target
            }
        },
        setStageValid: (state, actiion) => {
            state.isStageValid[state.stage] = actiion.payload;
        },
    }
})

export const {prevStage, nextStage, goToStage, setStageValid} = stageformSlice.actions

export default stageformSlice.reducer