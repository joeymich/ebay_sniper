import functools

from flask import Blueprint, session, current_app, Response
import requests
from requests.auth import HTTPBasicAuth
from werkzeug.exceptions import Unauthorized



from app.decorators import session_required
from app.auth.model import User

ebay_test = Blueprint('ebay_test', __name__)


def require_ebay_access_token(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        ebay_access_token = session.get('ebay_access_token')
        
        if ebay_access_token is None:
            raise Unauthorized('No access token.')
        
        # user = User.query.filter_by(id=user_id).first()
        
        # if user is None:
            # raise Unauthorized('Not logged in.')
        
        response: Response = f(*args, **kwargs)
        
        print(response)
        
        return response
    
    return wrapper


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


class TokenAuth(requests.auth.AuthBase):
    def __init__(self, token):
        self.token = token
        
    def __call__(self, r):
        r.headers['Authorization'] = f'Bearer {self.token}'
        return r


@ebay_test.route('/')
@session_required
def index():
    user: User = User.query.get(session.get('user_id'))
    
    return {
        'user_id': user.id,
        'ebay_id': user.ebay_user_id,
        'ebay_refresh_token': user.ebay_refresh_token,
        'access_token': session.get('ebay_access_token'),
    }
    
    
@ebay_test.route('/token')
@session_required
def token():
    return {
        'access token': session.get('ebay_access_token'),
    }
    
    
@ebay_test.route('/remove_token')
def remove_token():
    session.pop('ebay_access_token', None)
    return {'message': 'removed'}


@ebay_test.route('/refresh')
@session_required
def refresh():
    
    provider_data = current_app.config.get('OAUTH2_PROVIDERS').get('ebay')
    
    user: User = User.query.get(session.get('user_id'))
        
    response = requests.post(
        'https://api.ebay.com/identity/v1/oauth2/token',
        auth=HTTPBasicAuth(
            provider_data.get('client_id'),
            provider_data.get('client_secret'),
        ),
        data={
            'grant_type': 'refresh_token',
            'refresh_token': user.ebay_refresh_token,
            'scope': ' '.join(provider_data.get('scopes', []))
        },
    )
    
    """
    {
        "access_token": "",
        "expires_in": 7200,
        "token_type": "User Access Token",
    }
    """
    
    access_token = response.json().get('access_token')
    session['ebay_access_token'] = access_token
    
    if response.status_code == 200:
        return {
            'message': 'access token refreshed',
        }
    
    print(response.status_code)
    
    return response.json(), response.status_code


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
    
    """
    {
        "access_token": "",
        "expires_in": 7200,
        "token_type": "User Access Token",
    }
    """
    
    access_token = response.json().get('access_token')
    session['ebay_access_token'] = access_token
    
    # if response.status_code == 200:
    #     return {
    #         'message': 'access token refreshed',
    #     }
    
    # print(response.status_code)
    
    # return response.json(), response.status_code


@ebay_test.route('/lookup/<id>')
@session_required
@refresh_access_token
# @require_ebay_access_token
def lookup(id):
    
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
        raise Unauthorized(response.json().get('errors')[0].get('longMessage'))
    
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
    image = data.get('image', {}).get('imageUrl')
    
    # conditional: ?? | utc format 
    item_creation_date = data.get('itemCreationDate')
    
    # conditional: ?? | utc format
    item_end_date = data.get('itemEndDate')
    
    # always
    item_id = data.get('itemId')
    
    # always
    legacy_item_id = data.get('legacyItemId')
    
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
            shipping_currency = shipping_cost.get('currency')
            shipping_cost = shipping_cost.get('value')
    
    title = data.get('title')
    
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
        'seller_feedback_percentage': seller_feedback_percentage,
        'seller_feedback_score': seller_feedback_score,
        'seller_username': seller_username,
        'shipping_cost': int(float(shipping_cost) * 100) if shipping_cost else None,
        'title': title,
        'top_rated_buying_experience': top_rated_buying_experience,
    }
    
    import json
    print(json.dumps(data, sort_keys=True, indent=4))
    
    return response.json(), response.status_code
    return {}