from marshmallow import ValidationError
from werkzeug.exceptions import BadRequest
from flask import request


def validate_request_body(schema):
    try:
        return schema.load(request.json)
    except ValidationError as e:
        raise BadRequest(e.messages)
