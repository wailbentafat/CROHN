from flask import Blueprint

medical_bp = Blueprint('medical', __name__)

from . import routes
from . import function