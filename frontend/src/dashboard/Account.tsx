import { FaEbay, } from 'react-icons/fa';
import httpClient from '../httpClient'

interface Redirect {
    url: string;
}

export function Account() {
    const handleEbayOAuth = async () => {
        const resp = await httpClient.get<Redirect>('oauth/authorize/ebay')
        window.location.href = resp.data.url;
    }
    return (
        <div>
            <h1 className=''>Account</h1>
            <button
                className="flex items-center justify-center bg-white border hover:bg-slate-100 font-bold py-2 px-3 rounded-xl focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleEbayOAuth}
            >
                <div
                    className='px-2'
                >
                    <FaEbay />
                </div>
                Connect to eBay Account
            </button>
            <p>eBay Account: {'tcgcardsandlots'}</p>
            <p>Expires: </p>
        </div>
    )
}