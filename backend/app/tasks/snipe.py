from datetime import datetime

from celery import shared_task


@shared_task
def snipe_listing(ebay_item_number: str, max_bid: int):
    print(f'sniping listing {ebay_item_number} for {max_bid}')
    