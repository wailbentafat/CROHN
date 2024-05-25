from flask import request, jsonify
from flask_bcrypt import generate_password_hash, check_password_hash
from models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from extension import db
from . import auth_blueprint

@auth_blueprint.route("/token-info")
@jwt_required()
def token_info():
    data = dict(get_jwt_identity())
    print(data)

    user = User.query.get(data["id"])
    return jsonify({
        'first_name': user.first_name,
        'second_name': user.second_name,
        'email': user.email,
        'age': user.age,
        'sex': user.sex
    })

@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    age=data.get('age')
    sex=data.get('sex')
    first_name=data.get('first_name')
    second_name=data.get('second_name')
   

    if not email or not password or not sex:
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

    print(f"Email: {email}")
    print(f"Password: {password}")

    if not password or not email:
        return jsonify({'message': 'email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    print(f"User: {user}")

    if user:
        print(f"Stored password hash: {user.password}")
        if check_password_hash(user.password, password):
            access_token = create_access_token(identity={'id': user.id, 'email': user.email})
            
        user_info = {
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.second_name,
            'age':user.age,
            'gender':user.sex,
            'email':user.email
        }

        response_data = {
            'user': user_info,
            'access_token': access_token
        }

        return jsonify(response_data), 200
          

    return jsonify({'message': 'Invalid credentials'}), 401

