import React from 'react';

interface ISnipe {
    max_bid: string;
    title: string;
    ebay_item_number: number;
    offset: number;
    status: string;
    current_bid: string;
    bid_count: number;
    seller: string;
    seller_feedback: number;
    images: string[];
}

interface Props {
    openDelete: boolean;
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
    snipe: ISnipe | undefined;
}

export const Delete = ({ openDelete, setOpenDelete, snipe }: Props) => {
    const handleCloseDelete = () => {
        setOpenDelete(false);
    }
    const handleDelete = () => {
        console.log('delete')
        setOpenDelete(false);
    }
    return (
        <>
            {openDelete && (
                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div
                        className='fixed inset-0 w-full h-full bg-black opacity-40'
                        onClick={handleCloseDelete}
                    ></div>
                    <div className='flex items-center min-h-screen'>
                        <div className='relative w-full max-w-md mx-auto bg-white rounded-md shadow-lg'>
                            {/*header*/}
                            <div className='p-5'>
                                <h3 className='text-xl font-semibold'>
                                    Delete Snipe
                                </h3>
                            </div>
                            <hr className='mx-3' />
                            {/*body*/}
                            <div className='p-6 flex-auto'>
                                <p>body</p>
                            </div>
                            {/*footer*/}
                            <hr className='mx-3' />
                            <div className='flex items-center justify-end p-6 gap-4'>
                                <button
                                    className='px-6 py-2 text-red-500 font-bold uppercase text-sm hover:bg-slate-100 rounded-md transition-all'
                                    type='button'
                                    onClick={handleCloseDelete}
                                >
                                    Cancel
                                </button>
                                <button
                                    className='px-6 py-2 bg-indigo-700 font-bold uppercase hover:bg-indigo-800 rounded-md text-white text-sm transition-all'
                                    type='button'
                                    onClick={handleDelete}
                                >
                                    Delete Snipe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}