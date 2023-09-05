import requests
from bs4 import BeautifulSoup


def parse_seller(seller_info: str):
    seller = seller_info.split(' ')
    seller_name = seller[0]
    feedback_count = seller[1].strip('(').strip(')')
    if len(seller) > 3:
        feedback_percent = seller[2].strip('%')
    else:
        feedback_percent = None
    return seller_name, feedback_count, feedback_percent


def scrape_listing(item_number):
    url = f'https://www.ebay.com/itm/{item_number}'
    
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'lxml')
    
    title = soup.select_one('.x-item-title__mainTitle').text
    
    current_bid = soup.select_one('.x-price-primary')
    current_bid = ''.join(c for c in current_bid.text if c.isdigit() or c == '.')
    current_bid = int(float(current_bid)*100)
    
    bid_count = soup.select_one('.x-bid-count')
    bid_count = int(bid_count.text.split()[0])
    
    seller_content = soup.select_one('.ux-seller-section__content').text # ex -- "delusion28 (64) 100% Positive feedback"
    seller, feedback_count, feedback_percent = parse_seller(seller_content)
    feedback_count = int(feedback_count)

    images = soup.select_one('.ux-image-carousel')
    image_urls = []
    for image in images.select('.image'):
        image_item = image.select_one('img')
        if image_item.get('data-src'):
            image_urls.append(image_item.get('data-src'))
        else:
            image_urls.append(image_item.get('src'))
        
    image_url = None
    if image_urls:
        # print(image_urls)
        image_url = image_urls[0]
        
    return {
        'seller': seller,
        'seller_feedback': feedback_count,
        'image_url': image_url,
        # 'image_urls': image_urls,
        'title': title,
        'current_bid': current_bid,
        'bid_count': bid_count,
    }