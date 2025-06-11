import Header from '../components/Header';
import SearchDataUser from './component/SearchDataUser';
import TableDataUser from './component/TableDataUser';

export default function TableUser() {

    return (
        <div className="w-dvw h-dvh flex justify-center items-center bg-sky-50 p-24 overflow-hidden flex-col">
            <Header />
            <div className="w-fit h-fit flex justify-center items-center flex-col">
                <SearchDataUser/>
                <TableDataUser />
            </div>
        </div>
    );
}
