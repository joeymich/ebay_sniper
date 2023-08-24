from app.auth import auth


@auth.route('/signup', methods=['POST'])
def signup():
    pass


@auth.route('/login', methods=['POST'])
def login():
    pass


@auth.route('/logout', methods=['DELETE'])
def logout():
    pass


@auth.route('/resend', methods=['GET'])
def resend():
    pass


@auth.route('/reset-link', methods=['GET'])
def reset_link():
    pass


@auth.route('/protected', methods=['GET'])
def protected():
    pass
