import { useState, useEffect } from 'react';
import { api } from '../../api/api';
import { SnipeAPI } from '../../api/SnipeAPI';

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

interface EditProps {
    openEdit: any;
    setOpenEdit: any;
    snipe: any;
    getSnipes: () => {};
}

export const Edit = ({ openEdit, setOpenEdit, snipe, getSnipes }: EditProps) => {
    const [ebayItemNumber, setEbayItemNumber] = useState<string>('');
    const [bid, setBid] = useState<string>('');
    const [offset, setOffset] = useState<string>('7');

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const maxBid = parseFloat(bid) * 100;
        console.log('handle add');
        const data = await SnipeAPI.put(snipe.id, {
            max_bid: maxBid,
            offset: offset,
        });
        // const data = await api.put(`/snipe/${snipe.id}`, {
        //     max_bid: maxBid,
        //     offset: offset,
        // });
        console.log(data);
        getSnipes();
        handleCloseEdit();
    }

    const handleCloseEdit = () => {
        setEbayItemNumber('');
        setBid('');
        setOffset('7');
        setOpenEdit(false);
    }

    useEffect(() => {
        if (snipe) {
            setEbayItemNumber(snipe.ebay_item_number);
            setBid((snipe.max_bid / 100).toString());
            setOffset(snipe.offset);
        }
    }, [snipe])
    return (
        <>
            {openEdit && (
                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div
                        className='fixed inset-0 w-full h-full bg-black opacity-40'
                        onClick={handleCloseEdit}
                    ></div>
                    <div className='flex items-center min-h-screen'>
                        <div className='relative w-full max-w-md mx-auto bg-white rounded-md shadow-lg'>
                            <form onSubmit={handleEdit}>
                                {/*header*/}
                                <div className='p-5'>
                                    <h3 className='text-xl font-semibold'>
                                        Edit Snipe
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
                                            disabled
                                            className='shadow-sm appearance-none border rounded-xl w-full p-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline'
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
                                        onClick={handleCloseEdit}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='px-6 py-2 bg-indigo-700 font-bold uppercase hover:bg-indigo-800 rounded-md text-white text-sm transition-all'
                                        type='submit'
                                    >
                                        Edit Snipe
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}