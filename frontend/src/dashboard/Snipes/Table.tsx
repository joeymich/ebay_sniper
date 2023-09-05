import { FiEdit, FiCopy, FiTrash2, FiPlus } from 'react-icons/fi';
import { formatter } from '../../utils/formatter';

import { ISnipe } from './types';

interface ISnipeTable {
    snipes: ISnipe[];
    handleAdd: any;
    handleEdit: any;
    handleDelete: any;
}

export const SnipeTable = ({ snipes, handleAdd, handleEdit, handleDelete }: ISnipeTable) => {
    return (
        <div>
            <div className='w-full'>
                <div className='hidden lg:block rounded-lg overflow-auto'>
                    <div className='flex bg-white p-5 justify-between'>
                        <div className='font-bold text-xl'>
                            <h1>Snipes</h1>
                        </div>
                        <button
                            onClick={handleAdd}
                            className='flex items-center p-2 bg-indigo-700 hover:bg-indigo-800 rounded-md text-white'
                        >
                            <p className='mr-2 text-sm'>Add Snipe</p>
                            <FiPlus size={20} />
                        </button>
                    </div>
                    <table className='w-full rounded-b-md rounded-b-md'>
                        <thead className='bg-white border-b-2 border-gray-200'>
                            <tr>
                                {/* <th className='pl-8 pr-6 text-left'>
                                    <input className='text-indigo-600 cursor-pointer w-5 h-5 border rounded border-gray-400 focus:ring-transparent' type='checkbox' />
                                </th> */}
                                <th className='w-32 p-3 text-sm font-semibold tracking-wide text-left'></th>
                                <th className='w-20 p-3 text-sm font-semibold tracking-wide text-left'>eBay #</th>
                                <th className='min-`w-36 p-3 text-sm font-semibold tracking-wide text-left'>Title</th>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Seller</th>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Offset</th>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Max Bid</th>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Current Bid</th>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'># Bids</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='divide-y rounded-b-md'>
                            {snipes.map((snipe) => (
                                <tr
                                    key={snipe.id}
                                    className='bg-white rounded-b-md'
                                >
                                    {/* <td className='pl-8 pr-6'>
                                        <input type='checkbox' className='text-indigo-600 cursor-pointer w-5 h-5 border rounded border-gray-400 focus:ring-transparent' />
                                    </td> */}
                                    <td className='p-5 text-sm text-gray-700'>
                                        <img className='object-cover h-20 w-20 rounded' src={snipe.image_url} />
                                    </td>
                                    <td className='p-3 text-sm text-gray-700'>
                                        <a
                                            href={`https://www.ebay.com/itm/${snipe.ebay_item_number}`}
                                            target='_blank'
                                            className='font-bold text-blue-500 hover:underline'
                                        >
                                            {snipe.ebay_item_number}
                                        </a>
                                    </td>
                                    <td className='p-3 text-sm text-gray-700'>{snipe.title}</td>
                                    <td className='p-3 text-sm text-gray-700'>
                                        <a
                                            href={`https://www.ebay.com/usr/${snipe.seller}`}
                                            target='_blank'
                                            className='text-blue-500 hover:underline'
                                        >
                                            {snipe.seller}
                                        </a>
                                        <span> </span>
                                        (
                                        <a
                                            href={`https://www.ebay.com/fdbk/feedback_profile/${snipe.seller}`}
                                            target='_blank'
                                            className='text-blue-500 hover:underline'
                                        >
                                            {snipe.seller_feedback}
                                        </a>
                                        )
                                    </td>
                                    <td className='p-3 text-sm text-gray-700'>{snipe.offset}</td>
                                    <td className='p-3 text-sm text-gray-700'>
                                        <span className='bg-orange-100 p-2 rounded-md'>
                                            {snipe.status}
                                        </span>
                                    </td>
                                    <td className='p-3 text-sm text-gray-700'>{formatter.format(snipe.max_bid / 100)}</td>
                                    <td className='p-3 text-sm text-gray-700'>{formatter.format(snipe.current_bid / 100)}</td>
                                    <td className='p-3 text-sm text-gray-700'>{snipe.bid_count}</td>
                                    <td className='p-5'>
                                        <div className='flex flew-row items-center'>
                                            <button
                                                onClick={() => handleEdit(snipe)}
                                                className='p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600 mr-3'
                                            >
                                                <FiEdit size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(snipe)}
                                                className='p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-red-600'
                                            >
                                                <FiTrash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:hidden">
                    {snipes.map((snipe) => (
                        <div key={snipe.id} className='bg-white space-y-3 p-4 rounded-lg shadow'>
                            <div className='flex items-center space-x-2 text-sm'>
                                <div>
                                    <a href='#' className='text-blue-500 font-bold hover:underline'>{snipe.ebay_item_number}</a>
                                </div>
                                <div>
                                    {snipe.current_bid}
                                </div>
                                <div>
                                    {snipe.bid_count}
                                </div>
                            </div>
                            <div>
                                {snipe.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}