import { useState, useEffect } from 'react';

import { useAuth } from '../../hooks/useAuth';

import { OAuthAPI } from '../../api/OAuthAPI';
import { SnipeAPI } from '../../api/SnipeAPI';

import { SnipeTable } from './Table';
import { Add } from './Add';
import { Edit } from './Edit';
import { Delete } from './Delete';
import { Image } from './Image';

import { ISnipe } from './types';

export const Snipes = () => {

    const { isEbayConnected } = useAuth();

    const [snipes, setSnipes] = useState<ISnipe[] | null>(null);

    useEffect(() => {
        getSnipes().catch(console.error);
    }, []);

    const getSnipes = async () => {
        // const resp = await api.get<ISnipe[]>('/snipe/');
        // const json = resp.data;
        const data = await SnipeAPI.get();
        console.log(data);
        setSnipes(data);
    }

    const [snipe, setSnipe] = useState<ISnipe>();

    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const handleAdd = () => setOpenAdd(true);

    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const handleEdit = (snipe: ISnipe) => {
        setSnipe(snipe);
        setOpenEdit(true);
    }

    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const handleDelete = (snipe: ISnipe) => {
        setSnipe(snipe);
        setOpenDelete(true);
    }

    const [openImage, setOpenImage] = useState<boolean>(false);
    const handleImage = (snipe: ISnipe) => {
        setSnipe(snipe);
        setOpenImage(true);
    }

    const handleEbayOAuth = async () => {
        const data = await OAuthAPI.authorizeEbay();
        window.location.href = data.url;
    }

    return (
        <>
            {isEbayConnected() ? <>
                <SnipeTable
                    snipes={snipes}
                    handleAdd={handleAdd}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleImage={handleImage}
                />
                <Add
                    openAdd={openAdd}
                    setOpenAdd={setOpenAdd}
                    getSnipes={getSnipes}
                />
                <Edit
                    openEdit={openEdit}
                    setOpenEdit={setOpenEdit}
                    snipe={snipe}
                    getSnipes={getSnipes}
                />
                <Delete
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                    snipe={snipe}
                    getSnipes={getSnipes}
                />
                <Image
                    openImage={openImage}
                    setOpenImage={setOpenImage}
                    snipe={snipe}
                />
            </> : <>
                <div className='bg-white rounded-xl p-3'>
                    <h1>Connect your ebay account to get started</h1>
                    <button
                        className='flex items-center justify-center bg-white border hover:bg-slate-100 font-bold py-2 px-3 rounded-xl focus:outline-none focus:shadow-outline'
                        onClick={handleEbayOAuth}
                    >
                        Connect eBay Account
                    </button>
                </div>
            </>
            }
        </>
    )
}