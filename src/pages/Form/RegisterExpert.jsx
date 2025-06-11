
import Header from '../components/Header'

import StageForm from './components/StageForm'

export default function RegisterExpert() {
    return (
        <div className='w-dvw h-dvh flex justify-center items-start flex-col px-32'>
            <Header />
            <div className="w-full h-full flex flex-col justify-center items-center ">
                <div className="w-4/5 h-full flex justify-between items-center flex-col space-y-12 py-6 ">
                    <h1 className='font-bold text-3xl '>Trở thành chuyên gia của Edtronaut</h1>
                    <StageForm />
                </div>
            </div>
        </div>

    )
}
