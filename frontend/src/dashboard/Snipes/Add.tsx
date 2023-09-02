import { useState } from 'react';
import httpClient from '../../httpClient';

interface IOffset {
    value: string;
    text: string;
}

const offsets: IOffset[] = [
    {
        value: '1',
        text: '1',
    },
    {
        value: '2',
        text: '2',
    },
    {
        value: '3',
        text: '3',
    },
    {
        value: '4',
        text: '4',
    },
    {
        value: '5',
        text: '5',
    },
    {
        value: '6',
        text: '6',
    },
    {
        value: '7',
        text: '7 (default)',
    },
    {
        value: '8',
        text: '8',
    },
]

export const Add = ({ openAdd, setOpenAdd }: any) => {
    const [ebayItemNumber, setEbayItemNumber] = useState<string>('');
    const [bid, setBid] = useState<string>('');
    const [offset, setOffset] = useState<string>('7');

    const [loading, setLoading] = useState<boolean>(false);

    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log('handle add')

            console.log(`${ebayItemNumber} - ${bid} - ${offset}`)
        } catch (e: any) {
            console.error(e);
        }
        handleCloseAdd();
    }

    const handleCloseAdd = () => {
        setOpenAdd(false);
    }

    return (
        <>
            {openAdd && (
                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div
                        className='fixed inset-0 w-full h-full bg-black opacity-40'
                        onClick={handleCloseAdd}
                    ></div>
                    <div className='flex items-center min-h-screen'>
                        <div className='relative w-full max-w-md mx-auto bg-white rounded-md shadow-lg'>
                            <form onSubmit={handleAdd}>
                                {/*header*/}
                                <div className='p-5'>
                                    <h3 className='text-xl font-semibold'>
                                        Add Snipe
                                    </h3>
                                </div>
                                <hr className='mx-3' />
                                {/*body*/}
                                <div className='p-6 flex-auto'>
                                    <div className='mb-3'>
                                        <label
                                            className='block text-gray-700 text-sm font-bold mb-2'
                                            htmlFor='ebayItemNumber'
                                        >
                                            eBay Item Number
                                        </label>
                                        <input
                                            disabled={loading}
                                            className='shadow-sm appearance-none border rounded-xl w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            placeholder='123412341234'
                                            type='text'
                                            value={ebayItemNumber}
                                            onChange={(e) => setEbayItemNumber(e.target.value)}
                                            id='ebayItemNumber'
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label
                                            className='block text-gray-700 text-sm font-bold mb-2'
                                            htmlFor='bid'
                                        >
                                            Max Bid
                                        </label>
                                        <input
                                            disabled={loading}
                                            className='shadow-sm appearance-none border rounded-xl w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            placeholder='100'
                                            type='text'
                                            value={bid}
                                            onChange={(e) => setBid(e.target.value)}
                                            id='bid'
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className='block text-gray-700 text-sm font-bold mb-2'
                                            htmlFor='offset'
                                        >
                                            Offset
                                        </label>
                                        <select
                                            disabled={loading}
                                            id='offset'
                                            value={offset}
                                            onChange={e => setOffset(e.target.value)}
                                            className='shadow-sm appearance-none border rounded-xl w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        >
                                            {offsets.map((offset) => (
                                                <option key={offset.value} value={offset.value}>{offset.text}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {/*footer*/}
                                <hr className='mx-3' />
                                <div className='flex items-center justify-end p-6 gap-4'>
                                    <button
                                        className='px-6 py-2 text-red-500 font-bold uppercase text-sm hover:bg-slate-100 rounded-md transition-all'
                                        type='button'
                                        onClick={handleCloseAdd}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='px-6 py-2 bg-indigo-700 font-bold uppercase hover:bg-indigo-800 rounded-md text-white text-sm transition-all'
                                        type='submit'
                                    >
                                        Add Snipe
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

    return (
        <>
            {openAdd && (
                <>
                    <div
                        className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
                        onClick={() => setOpenAdd(false)}
                    >
                        <div className='w-auto my-6 mx-auto max-w-3xl'>
                            {/*content*/}
                            <div className='border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none'>
                                {/*header*/}
                                <div className='p-5'>
                                    <h3 className='text-3xl font-semibold'>
                                        Add Snipe
                                    </h3>
                                </div>
                                <hr className='mx-3' />
                                {/*body*/}
                                <div className='p-6 flex-auto'>

                                </div>
                                {/*footer*/}
                                <hr className='mx-3' />
                                <div className='flex items-center justify-end p-6 gap-4'>
                                    <button
                                        className='px-6 py-2 text-red-500 font-bold uppercase text-sm hover:bg-slate-100 rounded-md transition-all'
                                        type='button'
                                        onClick={() => setOpenAdd(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className='px-6 py-2 bg-indigo-700 font-bold uppercase hover:bg-indigo-800 rounded-md text-white text-sm transition-all'
                                        type='button'
                                        onClick={() => setOpenAdd(false)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
                </>
            )}
        </>
    )
}