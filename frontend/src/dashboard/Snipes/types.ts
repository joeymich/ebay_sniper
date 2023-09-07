export interface ISnipe {
    id: string;
    image: IImage;
    images: IImage[];
    max_bid: number;
    title: string;
    ebay_item_number: number;
    offset: number;
    status: string;
    current_bid: number;
    bid_count: number;
    seller: string;
    seller_feedback: number;
    ending_at: string;
    description: string;
}

export interface IImage {
    url: string;
}