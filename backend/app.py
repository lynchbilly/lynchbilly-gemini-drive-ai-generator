import os
from flask import Flask, request, jsonify
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import Flow

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this!

GOOGLE_CLIENT_SECRETS_FILE = 'credentials.json'
SCOPES = ['https://www.googleapis.com/auth/drive.file']

@app.route('/auth-url')
def auth_url():
    flow = Flow.from_client_secrets_file(
        GOOGLE_CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri='urn:ietf:wg:oauth:2.0:oob'
    )
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )
    return jsonify({'url': authorization_url})

@app.route('/tokens', methods=['POST'])
def tokens():
    code = request.json.get('code')
    flow = Flow.from_client_secrets_file(
        GOOGLE_CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri='urn:ietf:wg:oauth:2.0:oob'
    )
    flow.fetch_token(code=code)
    creds = flow.credentials
    return jsonify({'access_token': creds.token})

@app.route('/upload', methods=['POST'])
def upload():
    if 'access_token' not in request.form:
        return jsonify({'error': 'Missing access_token'}), 400
    access_token = request.form['access_token']
    creds = Credentials(token=access_token)
    drive_service = build('drive', 'v3', credentials=creds)
    files = request.files.getlist('file')
    if not files:
        return jsonify({'error': 'No files uploaded'}), 400
    uploaded_ids = []
    for file in files:
        file_metadata = {'name': file.filename}
        media = file.stream
        uploaded = drive_service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        ).execute()
        uploaded_ids.append({'name': file.filename, 'id': uploaded.get('id')})
    last = uploaded_ids[-1]
    return jsonify({'id': last['id'], 'name': last['name']})

if __name__ == '__main__':
    app.run(port=5000, debug=True)