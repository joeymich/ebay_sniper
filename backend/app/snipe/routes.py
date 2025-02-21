from flask import session, request

from app.decorators import session_required
from app.utils import validate_request_body
from app.extensions import db
from . import snipe
from .model import Snipe, Image
from .schema import SnipeSchema
from ..ebay import scrape_listing, get_by_legacy_id


@snipe.route('/', methods=['GET'])
@session_required
def get():
    
    user_id = session.get('user_id')
    
    snipes = Snipe.query.filter(Snipe.user_id == user_id).order_by(Snipe.created_at)
    
    return SnipeSchema(many=True).dump(snipes)


@snipe.route('/', methods=['POST'])
@session_required
def post():
    
    data = validate_request_body(SnipeSchema())
    
    ebay_item_number = data.get('ebay_item_number')
    # ebay_data = scrape_listing(ebay_item_number)
    ebay_data = get_by_legacy_id(ebay_item_number)
    print(ebay_data)
    
    image = ebay_data.pop('image_url')
    additional_images = ebay_data.pop('additional_images', [])
    
    data = data | ebay_data
    
    user_id = session.get('user_id')
    
    new_snipe = Snipe(user_id=user_id, **data)
    db.session.add(new_snipe)
    db.session.commit()
    
    new_image = Image(url=image)
    new_snipe.image = new_image
    db.session.add(new_image)
    db.session.commit()
    
    for additional_image in additional_images:
        new_image = Image(snipe_id=new_snipe.id, url=additional_image)
        db.session.add(new_image)
        
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
    data = validate_request_body(SnipeSchema())
    snipe = Snipe.query.get(id)
    print(snipe)
    if not snipe:
        return []
    snipe.update(data)
    db.session.commit()
    return SnipeSchema().dump(snipe)
