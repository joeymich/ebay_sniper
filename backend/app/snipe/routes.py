from flask import session, request

from app.decorators import session_required
from app.utils import validate_request_body
from app.extensions import db
from . import snipe
from .model import Snipe
from .schema import SnipeSchema


@snipe.route('/', methods=['GET'])
@session_required
def get():
    
    user_id = session.get('user_id')
    
    snipes = Snipe.query.filter(Snipe.user_id == user_id)
    
    return SnipeSchema(many=True).dump(snipes)


@snipe.route('/', methods=['POST'])
@session_required
def post():
    
    data = validate_request_body(SnipeSchema())
    
    user_id = session.get('user_id')
    
    new_snipe = Snipe(user_id=user_id, **data)
    
    db.session.add(new_snipe)
    db.session.commit()
    
    return SnipeSchema().dump(new_snipe)


@snipe.route('/<id>', methods=['GET'])
def get_by_id(id):
    pass


@snipe.route('/<id>', methods=['DELETE'])
def delete(id):
    snipe = Snipe.query.filter(Snipe.id == id).first()
    if not snipe:
        return []
    db.session.delete(snipe)
    db.session.commit()
    return [id]


@snipe.route('/<id>', methods=['PUT'])
def put(id):
    pass
