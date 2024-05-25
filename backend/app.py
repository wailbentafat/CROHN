from flask import Flask 
from extension import bcrypt, jwt, db, migrate
from auth import auth_blueprint
from config import Config
from services import medical_bp
from flask_cors import CORS
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
bcrypt.init_app(app)
jwt.init_app(app)


db.init_app(app)
migrate.init_app(app)

app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(medical_bp, url_prefix='/medical')


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)