from app.oauth import oauth


@oauth.route('/authorize/ebay', methods=['GET'])
def ebay_authorize_oauth2():
    pass


@oauth.route('/callback/ebay', methods=['GET'])
def ebay_callback_oauth2():
    pass


@oauth.route('/authorize/google', methods=['GET'])
def google_authorize_oauth2():
    pass


@oauth.route('/callback/google', methods=['GET'])
def google_callback_oauth2():
    pass
