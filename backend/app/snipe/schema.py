from marshmallow import fields, validate

from app.extensions import ma


class SnipeSchema(ma.Schema):
    
    id = fields.UUID()
    
    max_bid = fields.Integer()
    offset = fields.Integer()
    status = fields.String()
    
    # image_url = fields.String()
    ebay_item_number = fields.String()
    title = fields.String()
    seller = fields.String()
    seller_feedback = fields.Integer()
    current_bid = fields.Integer()
    bid_count = fields.Integer()
    shipping_cost = fields.Integer()
    ending_at = fields.DateTime()
    # description = fields.String()
    
    user_id = fields.UUID()
    
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    deleted_at = fields.DateTime()
    
    class ImageSchema(ma.Schema):
        url = fields.String()
    
    image = fields.Nested(ImageSchema())
    images = fields.List(fields.Nested(ImageSchema()))
    
    
