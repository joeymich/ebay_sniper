import requests
from bs4 import BeautifulSoup
from flask import session


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
    
    
import functools
from flask import current_app, session
from requests.auth import HTTPBasicAuth
from app.auth.model import User
    
class TokenAuth(requests.auth.AuthBase):
    def __init__(self, token):
        self.token = token
        
    def __call__(self, r):
        r.headers['Authorization'] = f'Bearer {self.token}'
        return r
    
    
def refresh_ebay_access_token(refresh_token):
    provider_data = current_app.config.get('OAUTH2_PROVIDERS').get('ebay')
            
    response = requests.post(
        'https://api.ebay.com/identity/v1/oauth2/token',
        auth=HTTPBasicAuth(
            provider_data.get('client_id'),
            provider_data.get('client_secret'),
        ),
        data={
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'scope': ' '.join(provider_data.get('scopes', []))
        },
    )
    
    access_token = response.json().get('access_token')
    session['ebay_access_token'] = access_token
    
    
def refresh_access_token(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        try:
            response = f(*args, **kwargs)
        except:
            user: User = User.query.get(session.get('user_id'))
            refresh_ebay_access_token(user.ebay_refresh_token)
            response = f(*args, **kwargs)
            
        return response
    
    return wrapper
    

@refresh_access_token
def get_by_legacy_id(id):
    
    if id == '0':
        id = '364448707331'

    response = requests.get(
        url='https://api.ebay.com/buy/browse/v1/item/get_item_by_legacy_id',
        params={
            'legacy_item_id': id,
        },
        auth=TokenAuth(session.get('ebay_access_token')),
        # auth=TokenAuth('1234'),
        headers={
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
        },
    )
    
    if response.status_code == 401:
        raise Exception(response.json().get('errors')[0].get('longMessage'))
    
    data = response.json()
    
    # conditional
    additional_images = data.get('additionalImages', [])
    for i, additional_image in enumerate(additional_images):
        # always
        additional_images[i] = additional_image.get('imageUrl')
    
    # conditional: only for auctions
    bid_count = data.get('bidCount')
    
    # conditional: only for auctions
    current_bid = data.get('currentBidPrice', {}).get('value')
    
    # always
    description = data.get('description')
    
    # conditional
    delivery_options = []
    estimated_availabilities = data.get('estimatedAvailabilities', [])
    for estimated_availability in estimated_availabilities:
        # SHIP_TO_HOME | SELLER_ARRANGED_LOCAL_PICKUP | IN_STORE_PICKUP | PICKUP_DROP_OFF | DIGITAL_DELIVERY
        delivery_options = estimated_availability.get('deliveryOptions', [])
        for delivery_option in delivery_options:
            pass
            
    #always
    image: str = data.get('image', {}).get('imageUrl')
    
    # conditional: ?? | utc format 
    item_creation_date: str = data.get('itemCreationDate')
    
    # conditional: ?? | utc format
    item_end_date: str = data.get('itemEndDate')
    
    # always
    item_id: str = data.get('itemId')
    
    # always
    legacy_item_id: str = data.get('legacyItemId')
    
    # if 'FIXED_PRICE' in 'buyingOptions'
    buy_it_now_price: str = data.get('price', {}).get('value')
    
    # always
    seller = data.get('seller', {})
    
    seller_feedback_percentage: str = seller.get('feedbackPercentage')
    seller_feedback_score: int = seller.get('feedbackScore')
    seller_username: str = seller.get('username')
    
    shipping_cost = None
    if 'SHIP_TO_HOME' in delivery_options:
        shipping_options = data.get('shippingOptions')
        if (len(shipping_options) != 0):
            shipping_cost = shipping_options[0].get('shippingCost', {})
            shipping_currency: str = shipping_cost.get('currency')
            shipping_cost: str = shipping_cost.get('value')
    
    title = data.get('title')
    
    unique_bidder_count: int = data.get('uniqueBidderCount', 0)
    
    top_rated_buying_experience: bool = data.get('topRatedBuyingExperience')
    
    data = {
        'additional_images': additional_images,
        'bid_count': bid_count if bid_count else 0,
        'current_bid': int(float(current_bid) * 100) if current_bid else None,
        # 'description': description,
        'image': image,
        'item_creation_date': item_creation_date,
        'item_end_date': item_end_date,
        'item_id': item_id,
        'legacy_item_id': legacy_item_id,
        'buy_it_now_price': buy_it_now_price,
        'seller_feedback_percentage': seller_feedback_percentage,
        'seller_feedback_score': seller_feedback_score,
        'seller_username': seller_username,
        'shipping_cost': int(float(shipping_cost) * 100) if shipping_cost else None,
        'title': title,
        'top_rated_buying_experience': top_rated_buying_experience,
        'unique_bidder_count': unique_bidder_count,
    }
    
    import json
    print(json.dumps(data, sort_keys=True, indent=4))
    
    return {
        'seller': seller_username,
        'seller_feedback': seller_feedback_score,
        'image_url': image,
        'additional_images': additional_images,
        'title': title,
        'current_bid': int(float(current_bid) * 100) if current_bid else None,
        'bid_count': bid_count if bid_count else 0,
        'ending_at': item_end_date,
        'description': description,
    }