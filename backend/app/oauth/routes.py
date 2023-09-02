import secrets
from urllib.parse import urlencode

from flask import session, current_app, request, redirect
import requests
from requests.auth import HTTPBasicAuth

from app.oauth import oauth
from app.decorators import session_required
from app.auth.model import User
from app.extensions import db


@oauth.route('/authorize/ebay', methods=['GET'])
@session_required
def ebay_authorize_oauth2():
    
    session['oauth2_state'] = secrets.token_urlsafe(16)
    
    provider_data = current_app.config.get('OAUTH2_PROVIDERS').get('ebay')
    
    qs = urlencode({
        'client_id': provider_data.get('client_id'),
        'redirect_uri': provider_data.get('redirect_uri'),
        'response_type': 'code',
        'scope': ' '.join(provider_data.get('scopes', [])),
        'state': session['oauth2_state'],
    })
    
    url = provider_data.get('authorize_url') + '?' + qs
        
    return {
        'url': url,
    }


@oauth.route('/callback/ebay', methods=['GET'])
@session_required
def ebay_callback_oauth2():
    
    provider_data = current_app.config.get('OAUTH2_PROVIDERS').get('ebay')
    
    if 'state' not in request.args:
        return {
            'error': 'State not in request args.'
        }
    
    if request.args.get('state') != session.get('oauth2_state'):
        return {
            'error': 'State does not match.'
        }
        
    if 'code' not in request.args:
        return {
            'error': 'Code not in request args.'
        }
        
    response = requests.post(
        provider_data.get('token_url'),
        auth=HTTPBasicAuth(
            provider_data.get('client_id'),
            provider_data.get('client_secret'),
        ),
        data={
            'code': request.args.get('code'),
            'grant_type': 'authorization_code',
            'redirect_uri': provider_data.get('redirect_uri'),
        },
        headers={
            'Accept': 'application/json',
        },
    )
    
    """
    {
        'access_token': '',
        'expires_in': 7200,
        'refresh_token': '',
        'refresh_token_expires_in': 47304000,
        'token_type': 'User Access Token',
    }
    """
    
    if response.status_code != 200:
        return {'error': 'Token url did not return 200.'}
    
    oauth2_token = response.json().get('access_token')
    
    if oauth2_token is None:
        return {'error': 'No access_token.'}
    
    print(response.json())
    
    refresh_token = response.json().get('refresh_token')
    
    response = requests.get(
        provider_data.get('userinfo').get('url'),
        headers={
            'Authorization': f'Bearer {oauth2_token}',
            'Accept': 'application/json',
        },
    )
    
    """
    {
        'userId': '007IND2xyeBay',
        'username': 'ebayindividualuser',
        'accountType': 'INDIVIDUAL',
        'registrationMarketplaceId': 'EBAY_US',
        'individualAccount': {
            'email': 'ebayuser@ebay.com'
        }
    }
    """
    
    if response.status_code != 200:
        return {'error': 'Use data request did not return 200'}
    
    print(response.json())
    
    data = response.json()
    
    user = User.query.filter_by(id=session.get('user_id')).first()
    
    ebay_user_id = data.get('userId')
    ebay_username = data.get('username')
    
    user.ebay_user_id = ebay_user_id
    user.ebay_refresh_token = refresh_token
    user.ebay_username = ebay_username
    
    db.session.commit()
    # email = provider_data.get('userinfo').get('email')(response.json())
    
    # redirect to frontend
    return redirect('http://localhost:3000/dashboard')
        

@oauth.route('/authorize/google', methods=['GET'])
def google_authorize_oauth2():
    pass


@oauth.route('/callback/google', methods=['GET'])
def google_callback_oauth2():
    pass
