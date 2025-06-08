import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function ShowUpload(data) {
    const file = data.data
    console.log("file ", file)
    if (file) {
        return (
            <div className='w-full h-full flex justify-start items-start bg-slate-300 p-4 rounded-2xl gap-4 flex-col '>
                <h3 className="font-semibold text-white flex items-center text-lg">
                    <InsertDriveFileIcon sx={{ color: 'white' }} className="w-4 h-4 mr-2 text-violet-500" />
                    Upload
                </h3>
                <div className="w-full h-full flex justify-center items-center">
                    {file && file.type.startsWith("image/") && (
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="border rounded h-full w-full aspect-square object-cover max-h-[400px] max-w-[400px]"
                        />
                    )}
                </div>
                <div className="w-full h-full flex justify-center items-center">
                    {file && file.type === "application/pdf" && (
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-700 w-full h-full rounded-2xl border-4 ">
                            <CloudUploadIcon />
                            <span>{file.name}</span>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
