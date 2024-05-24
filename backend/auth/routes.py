from flask import request, jsonify
from flask_bcrypt import generate_password_hash, check_password_hash
from models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from extension import db
from . import auth_blueprint

@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password =generate_password_hash(data.get('password'))
    age=data.get('age')
    sex=data.get('sex')
    first_name=data.get('first_name')
    second_name=data.get('second_name')
    username = data.get('username')
    password = data.get('password')

    if not username or not password or not sex:
        return jsonify({'message': 'donnee required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password , age=age,first_name=first_name,second_name=second_name,sex=sex)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    if not password or not email :
        return jsonify({'message': 'Username and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity={'id': user.id, 'username': user.username})
        return jsonify({'access_token': access_token}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

@auth_blueprint.route("/check", methods=["GET"])
@jwt_required()
def checked():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
