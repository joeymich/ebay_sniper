import { FiEdit, FiCopy, FiTrash2, FiPlus } from 'react-icons/fi';

interface ISnipe {
    title: string;
    image: string;
    ebay_item_number: number;
    offset: number;
    status: string;
    current_bid: string;
    bid_count: number;
    seller: string;
    seller_feedback: number;
}

const snipes: ISnipe[] = [
    {
        title: 'Size 9 - Jordan 1 Retro x Fragment Design x Travis Scott Low Blue',
        image: 'https://i.ebayimg.com/images/g/0jIAAOSwa1Nk5~Ag/s-l1600.jpg',
        ebay_item_number: 374899603497,
        offset: 8,
        status: 'SCHEDULED',
        current_bid: '$1,300.00',
        bid_count: 9,
        seller: 'raygb5',
        seller_feedback: 8,
    },
    {
        title: 'Lot of 10 50c Barber Silver Half Dollars',
        image: 'https://i.ebayimg.com/images/g/aNAAAOSw59Fk5zBL/s-l1600.jpg',
        ebay_item_number: 394834818522,
        offset: 7,
        status: 'SCHEDULED',
        current_bid: '$123.73',
        bid_count: 10,
        seller: 'jcsgold',
        seller_feedback: 47610,
    },
    {
        title: 'Size 9 - Jordan 1 Retro x Fragment Design x Travis Scott Low Blue',
        image: 'https://i.ebayimg.com/images/g/0jIAAOSwa1Nk5~Ag/s-l1600.jpg',
        ebay_item_number: 374899603497,
        offset: 8,
        status: 'SCHEDULED',
        current_bid: '$1,300.00',
        bid_count: 9,
        seller: 'raygb5',
        seller_feedback: 8,
    },
    {
        title: 'Lot of 10 50c Barber Silver Half Dollars',
        image: 'https://i.ebayimg.com/images/g/aNAAAOSw59Fk5zBL/s-l1600.jpg',
        ebay_item_number: 394834818522,
        offset: 7,
        status: 'SCHEDULED',
        current_bid: '$123.73',
        bid_count: 10,
        seller: 'jcsgold',
        seller_feedback: 47610,
    },
]

export function Snipes() {
    return (
        <div className='w-full'>
            <div className=' md:block rounded-lg overflow-auto'>
                <div className='flex bg-white p-3 justify-between'>
                    <div className=''>
                        <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600 mr-3'>
                            <FiEdit size={20} />
                        </button>
                        {/* <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600 mr-3'>
                            <FiCopy size={20} />
                        </button> */}
                        <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-red-600'>
                            <FiTrash2 size={20} />
                        </button>
                    </div>
                    <button className='flex items-center p-2 bg-indigo-700 hover:bg-indigo-800 rounded-md text-white'>
                        <p className='mr-2 text-sm'>Add Snipe</p>
                        <FiPlus size={20} />
                    </button>
                </div>
                <table className='w-full rounded-b-md rounded-b-md'>
                    <thead className='bg-white border-b-2 border-gray-200'>
                        <tr>
                            <th className='pl-8 pr-6 text-left'>
                                <input className='text-indigo-600 cursor-pointer w-5 h-5 border rounded border-gray-400 focus:ring-transparent' type='checkbox' />
                            </th>
                            <th className='w-32 p-3 text-sm font-semibold tracking-wide text-left'></th>
                            <th className='w-20 p-3 text-sm font-semibold tracking-wide text-left'>eBay Item Number</th>
                            <th className='min-`w-36 p-3 text-sm font-semibold tracking-wide text-left'>Title</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Seller</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Offset</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Current Bid</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'># Bids</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y rounded-b-md'>
                        {snipes.map((snipe, i) => (
                            <tr
                                key={i}
                                className='bg-white p-3 rounded-b-md'
                            >
                                <td className='pl-8 pr-6'>
                                    <input type='checkbox' className='text-indigo-600 cursor-pointer w-5 h-5 border rounded border-gray-400 focus:ring-transparent' />
                                </td>
                                <td className='p-5 text-sm text-gray-700'>
                                    <img className='object-cover h-20 w-20 rounded' src={snipe.image} />
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
                                <td className='p-3 text-sm text-gray-700'>{snipe.seller} ({snipe.seller_feedback})</td>
                                <td className='p-3 text-sm text-gray-700'>{snipe.offset}</td>
                                <td className='p-3 text-sm text-gray-700'>
                                    <span className='bg-orange-100 p-2 rounded-md'>
                                        {snipe.status}
                                    </span>
                                </td>
                                <td className='p-3 text-sm text-gray-700'>{snipe.current_bid}</td>
                                <td className='p-3 text-sm text-gray-700'>{snipe.bid_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {snipes.map((snipe, i) => (
                    <div className='bg-white space-y-3 p-4 rounded-lg shadow'>
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
    )
}