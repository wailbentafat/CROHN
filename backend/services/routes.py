
from flask import request, jsonify, current_app, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from extension import db
from models import RadiologyReport, DoctorAdvice
from . import medical_bp
import os
from datetime import date,datetime

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

@medical_bp.route('/put_files', methods=['POST'])
@jwt_required()
def create_radiology_report():
        user_id = get_jwt_identity()['id']
        print(user_id)
     

        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']
        description = request.form.get('description')
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            date1=date.today()
            new_report = RadiologyReport(user_id=user_id, description=description, radiopath=file_path , date1=date1)
            db.session.add(new_report)
            db.session.commit()

            return jsonify({'message': 'File and description uploaded successfully', 'filename': filename}), 201
        else:
            return jsonify({'error': 'File type not allowed'}), 400
    

@medical_bp.route('/advices', methods=['POST'])
@jwt_required()
def add_doctor_advice():
    user_id = get_jwt_identity()['id']
    data = request.json
    new_advice = DoctorAdvice(user_id=user_id, advice=data['advice'], date=datetime.strptime(data['date'], '%Y-%m-%d'))

    db.session.add(new_advice)
    db.session.commit()
    return jsonify({'message': 'New doctor advice added'}), 201

@medical_bp.route('/get_all', methods=['GET'])
@jwt_required()
def get_radiology_reports():
    try:
        user_id = get_jwt_identity()['id']
        reports = RadiologyReport.query.filter_by(user_id=user_id).all()

        if not reports:
            return jsonify({"message": "No radiology reports found."}), 404

        report_data = [
            {
                'report': report.description if report.description else '',
                'radiopath': request.host_url + 'medical/report_image/' + os.path.basename(report.radiopath) if report.radiopath else ''
            }
            for report in reports
        ]

        return jsonify(report_data), 200
    except Exception as e:
        return jsonify({"message": "An error occurred while fetching reports.", "error": str(e)}), 500

    #app.route('/ai integer', methode=[GET])
    #@jwt_required()
   #def #get_messages():
    ###messages=request.json

