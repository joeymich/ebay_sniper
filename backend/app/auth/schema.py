from marshmallow import fields, validate

from app.extensions import ma


class SignUpRequestSchema(ma.Schema):
    email = fields.String(required=True, validate=validate.Length(max=254))
    password = fields.String(required=True, validate=validate.Length(min=8, max=255))
    
    
class SignUpResponseSchema(ma.Schema):
    id = fields.String()
    email = fields.String()
    created_at = fields.DateTime()
    
    
class LogInRequestSchema(ma.Schema):
    email = fields.String(required=True, validate=validate.Length(max=254))
    password = fields.String(required=True, validate=validate.Length(min=8, max=255))
    
    
class LogInResponseSchema(ma.Schema):
    id = fields.String()
    email = fields.String()
    email_verified = fields.Boolean()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    deleted_at = fields.DateTime()
    verification_code = fields.String()
    

from app.snipe.schema import SnipeSchema    

    
class UserSchema(ma.Schema):
    id = fields.String()
    email = fields.String()
    created_at = fields.DateTime()
    email_verified = fields.Boolean()
    ebay_username = fields.String()
    ebay_user_id = fields.String()
    ebay_refresh_token = fields.String()
    snipes = fields.List(fields.Nested(SnipeSchema()))
    
        