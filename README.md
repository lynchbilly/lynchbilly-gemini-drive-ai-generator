# Gemini Drive AI Generator

Welcome to the **Gemini Drive AI Generator**!  
This project helps you use the Gemini Pro API to generate content, and save one or multiple files to Google Drive in a tree format, using a clean, professional front-end.

---

## 🗂️ Tutorial Overview

```
Gemini Drive AI Generator
│
├── 1. Setup
│    ├── 1.1 Clone the repository
│    ├── 1.2 Install dependencies
│    └── 1.3 Start the project
│
├── 2. Gemini Pro API Integration
│    ├── 2.1 Get API Key
│    └── 2.2 Configure API Key
│
├── 3. Google Drive API Integration
│    ├── 3.1 Create Google Cloud Project
│    ├── 3.2 Enable Google Drive API
│    ├── 3.3 Create OAuth Credentials
│    ├── 3.4 Add credentials to your project
│    ├── 3.5 Install Google API Client Library
│    └── 3.6 Authenticate and connect
│
├── 4. Professional Front-End Usage
│    ├── 4.1 Generate files via Gemini Pro
│    ├── 4.2 Organize files/folders in tree structure
│    └── 4.3 Save to Google Drive
│
├── 5. Code Samples
│
└── 6. Troubleshooting
```

---

## 1. Setup

### 1.1 Clone the repository
```bash
git clone https://github.com/lynchbilly/lynchbilly-gemini-drive-ai-generator.git
```

### 1.2 Install dependencies
```bash
npm install
# or
yarn install
```

### 1.3 Start the project
```bash
npm start
# or
yarn start
```

---

## 2. Gemini Pro API Integration

### 2.1 Get API Key
- Sign up at Gemini Pro and obtain your API key.

### 2.2 Configure API Key
Create a file called `config.js`:
```javascript
const CONFIG = {
  GEMINI_API_KEY: 'your_gemini_pro_api_key_here',
};
export default CONFIG;
```
Use it in your API calls:
```javascript
import CONFIG from './config';
// Use CONFIG.GEMINI_API_KEY
```

---

## 3. Google Drive API Integration

### 3.1 Create Google Cloud Project
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project

### 3.2 Enable Google Drive API
- Go to "APIs & Services" > "Library"
- Search for "Google Drive API" and enable it

### 3.3 Create OAuth Credentials
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth 2.0 Client IDs"
- Configure the consent screen (use "External" for most cases)
- Download the credentials JSON file

### 3.4 Add credentials to your project
- Place the credentials file in your project (e.g., `credentials.json`)

### 3.5 Install Google API Client Library
```bash
npm install googleapis
```

### 3.6 Authenticate and Connect
Use the credentials to authenticate and connect to Google Drive:
```javascript
const { google } = require('googleapis');
const drive = google.drive({ version: 'v3', auth: oAuth2Client });

// List files in Drive
drive.files.list({}, (err, res) => {
  if (err) return console.log('API error: ' + err);
  const files = res.data.files;
  if (files.length) {
    files.forEach((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  } else {
    console.log('No files found.');
  }
});
```

---

## 4. Professional Front-End Usage

### 4.1 Generate files via Gemini Pro
- Use the front-end to trigger file/content generation with your API key.

### 4.2 Organize files/folders in tree structure
- Select files and folders, see your Drive layout as a tree.
- Drag and drop to organize.

### 4.3 Save to Google Drive
- Upload one or multiple files to selected folders.
- Monitor progress and get feedback.

---

## 5. Code Samples

**Uploading a file to Google Drive:**
```javascript
async function uploadFile(file) {
  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: file.name,
        mimeType: file.type,
      }),
    }
  );
  const data = await response.json();
  console.log('File uploaded successfully:', data);
}
```

---

## 6. Troubleshooting

- **API key issues**: Double-check your Gemini Pro API key and permissions.
- **Google Drive auth issues**: Verify OAuth credentials and consent screen config.
- **File upload errors**: Check file size limits and required scopes/permissions.
- **Front-end errors**: Review browser console, ensure all dependencies are installed.

---

## Conclusion

Thank you for using the Gemini Drive AI Generator!  
For more info, check official documentation for Gemini Pro and Google Drive API.

**Maintainer:** [@lynchbilly](https://github.com/lynchbilly)

Feel free to contribute or open issues!