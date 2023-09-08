import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';


import { ISnipe } from './types';

interface Props {
    openImage: boolean;
    setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
    snipe: ISnipe | undefined;
}

export const Image = ({ openImage, setOpenImage, snipe }: Props) => {
    const [index, setIndex] = useState<number>(0);
    const handleCloseImage = () => {
        setOpenImage(false);
        setIndex(0);
    }
    return (
        <>
            {openImage && snipe && (
                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div
                        className='fixed inset-0 w-full h-full bg-black opacity-40'
                        onClick={handleCloseImage}
                    ></div>
                    <div className='flex items-center min-h-screen'>
                        <div className='relative w-full max-w-2xl mx-auto bg-white rounded-md shadow-lg'>
                            {/*header*/}
                            <div className='p-5'>
                                <h3 className='text-xl font-semibold'>
                                    {snipe.title}
                                </h3>
                            </div>
                            <hr className='mx-3' />
                            {/*body*/}
                            <div className='p-6 flex-auto h-full'>
                                <div className='relative'>
                                    {/* circles */}
                                    <div
                                        className='absolute bottom-0 left-1/2'
                                        style={{ transform: 'translate(-50%, -50%)' }}
                                    >
                                        <div className='flex items-center gap-2 p-3 rounded-full bg-black/50'>

                                            {snipe.images.map((image, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-3 w-3 ${index === i ? 'bg-white/100 p-2' : 'bg-white/40'} hover:bg-white/100 hover:cursor-pointer rounded-full`}
                                                    onClick={() => setIndex(i)}
                                                >
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* image */}
                                    <div>
                                        {snipe.images.map((image, i) => (
                                            <img
                                                key={image.url}
                                                src={image.url}
                                                className={`${index === i ? '' : 'hidden'} 'rounded select-none`}
                                            />
                                        ))}
                                    </div>
                                    {/* left */}
                                    <div className='absolute left-0 top-1/2 translate-y-[-50%] translate-x-[50%]'>
                                        <button
                                            onClick={() => setIndex(index => index === 0 ? snipe.images.length - 1 : index - 1)}
                                            className='p-3 rounded-full bg-black/50 hover:bg-black/60 text-white'
                                        >
                                            <FiChevronLeft size={20} />
                                        </button>
                                    </div>
                                    {/* right */}
                                    <div className='absolute right-0 top-1/2 translate-y-[-50%] translate-x-[-50%]'>
                                        <button
                                            onClick={() => setIndex(index => index === snipe.images.length - 1 ? 0 : index + 1)}
                                            className='p-3 rounded-full bg-black/50 hover:bg-black/60 text-white'
                                        >
                                            <FiChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/*footer*/}
                            <hr className='mx-3' />
                            <div className='flex items-center justify-end p-6 gap-4'>
                                <button
                                    className='px-6 py-2 text-red-500 font-bold uppercase text-sm hover:bg-slate-100 rounded-md transition-all'
                                    type='button'
                                    onClick={handleCloseImage}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}