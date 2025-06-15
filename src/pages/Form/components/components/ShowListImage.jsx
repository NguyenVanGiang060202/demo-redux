import { Box, Modal } from '@mui/material';
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from "motion/react";
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';







export default function ShowListImage({ previews, imageActive }) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (open) {
            setActive(imageActive);
        }
    }, [open, imageActive]);


    const handleNext = () => {
        setActive((prev) => (prev + 1) % previews.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + previews.length) % previews.length);
    };

    const isActive = (index) => {
        return index === active;
    };

    const randomRotateY = () => {
        return Math.floor(Math.random() * 21) - 10;
    };

    if (!previews) return null;

    return (
        <div className="mx-auto px-4 py-20 font-sans antialiased md:px-8 lg:px-12 w-full h-full">
            <div className='flex justify-between items-center w-full space-x-10 h-full '>
                <button
                    onClick={handlePrev}
                    className="group/button flex size-16 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                    <ArrowBackIcon
                        className="size-10 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
                </button>
                <div className="relative w-full aspect-square">
                    <AnimatePresence>
                        {previews.map((preview, index) => (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                    z: -100,
                                    rotate: randomRotateY(),
                                }}
                                animate={{
                                    opacity: isActive(index) ? 1 : 0.7,
                                    scale: isActive(index) ? 1 : 0.95,
                                    z: isActive(index) ? 0 : -100,
                                    rotate: isActive(index) ? 0 : randomRotateY(),
                                    zIndex: isActive(index)
                                        ? 40
                                        : previews.length + 2 - index,
                                    y: isActive(index) ? [0, -80, 0] : 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    z: 100,
                                    rotate: randomRotateY(),
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 origin-bottom ">
                                {preview.file.type.startsWith("image/") && (
                                    <img
                                        src={preview.previewUrl}
                                        alt="Image user upload"
                                        width={50}
                                        height={50}
                                        draggable={false}
                                        className="h-full w-full rounded-3xl object-contain bg-gray-950" />
                                )}
                                {preview.file.type === "application/pdf" && (
                                    <div className="relative flex items-center justify-center gap-2 text-sm text-gray-700 w-full h-full rounded-3xl bg-gray-950">
                                        <CloudUploadIcon className='text-gray-100' />
                                        <span className='text-gray-100 text-2xl'>{preview.file.name}</span>
                                    </div>
                                )}

                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <button
                    onClick={handleNext}
                    className="group/button flex size-16 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                    <ArrowForwardIcon
                        className="size-10 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
                </button>
            </div>
        </div>
    )
}
