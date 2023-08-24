from marshmallow import ValidationError, Schema
from werkzeug.exceptions import BadRequest
from flask import request


def validate_request_body(schema : Schema) -> dict:
    try:
        return dict(schema.load(request.json))
    except ValidationError as e:
        raise BadRequest(e.messages)
