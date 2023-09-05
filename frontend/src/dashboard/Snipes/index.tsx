import { useState, useEffect } from 'react';

import { api } from '../../api/api';

import { SnipeTable } from './Table';
import { Add } from './Add';
import { Edit } from './Edit';
import { Delete } from './Delete';

import { ISnipe } from './types';

const example_snipes: ISnipe[] = [
    {
        id: '1234',
        image_url: 'https://i.ebayimg.com/images/g/0jIAAOSwa1Nk5~Ag/s-l1600.jpg',
        max_bid: 150000,
        title: 'Size 9 - Jordan 1 Retro x Fragment Design x Travis Scott Low Blue',
        ebay_item_number: 374899603497,
        offset: 8,
        status: 'SCHEDULED',
        current_bid: 130000,
        bid_count: 9,
        seller: 'raygb5',
        seller_feedback: 8,
        // images: [
        //     'https://i.ebayimg.com/images/g/0jIAAOSwa1Nk5~Ag/s-l1600.jpg',
        // ],
    },
    // {
    //     max_bid: '$125.00',
    //     title: 'Lot of 10 50c Barber Silver Half Dollars',
    //     ebay_item_number: 394834818522,
    //     offset: 7,
    //     status: 'SCHEDULED',
    //     current_bid: '$123.73',
    //     bid_count: 10,
    //     seller: 'jcsgold',
    //     seller_feedback: 47610,
    //     images: [
    //         'https://i.ebayimg.com/images/g/aNAAAOSw59Fk5zBL/s-l1600.jpg',
    //     ],
    // },
    // {
    //     max_bid: '$184.00',
    //     title: 'Bape Hoodie (Authentinc) (Worn Once)',
    //     ebay_item_number: 175874981734,
    //     offset: 7,
    //     status: 'SCHEDULED',
    //     current_bid: '$126.00',
    //     bid_count: 1,
    //     seller: 'yukha_66',
    //     seller_feedback: 6,
    //     images: [
    //         'https://i.ebayimg.com/images/g/UNgAAOSwdGNk6TXj/s-l500.jpg'
    //     ],
    // },
    // {
    //     max_bid: '$127.00',
    //     title: 'Size 12 Adidas Yeezy Boost 350 V2 Low Bred without Box Great Condition',
    //     ebay_item_number: 166301403660,
    //     offset: 7,
    //     status: 'SCHEDULED',
    //     current_bid: '$152.50',
    //     bid_count: 2,
    //     seller: '2014flaks',
    //     seller_feedback: 26,
    //     images: [
    //         'https://i.ebayimg.com/images/g/E4IAAOSw4Dlk64Dm/s-l1600.jpg',
    //     ],
    // },
]

const getInitialState = async () => {
    const resp = await api.get<ISnipe[]>('/snipe/');
    const json = resp.data;
    return json;
}

export const Snipes = () => {
    const [snipes, setSnipes] = useState<ISnipe[]>(example_snipes);

    useEffect(() => {
        getSnipes().catch(console.error);
    }, []);

    const getSnipes = async () => {
        const resp = await api.get<ISnipe[]>('/snipe/');
        const json = resp.data;
        console.log(json);
        setSnipes(json);
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

    return (
        <div>
            <SnipeTable
                snipes={snipes}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
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
        </div>
    )
}