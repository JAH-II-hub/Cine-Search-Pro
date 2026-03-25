## Important: API Keys Required
This project requires your own API keys from The Movie Database (TMDB).

### Step 1: Get Your API Keys
1. Go to [themoviedb.org](https://www.themoviedb.org/) and create a free account.
2. Navigate to your account **Settings** > **API**.
3. Generate an **API Key (v3 auth)** and copy both the **API Key** and the **Access Token**.

### Step 2: Create Your Configuration File
Since `config.js` is ignored by Git for security, you must create it locally.

1. Create a new file named `config.js` in the root folder (same level as `index.html`).
2. Paste the following template into the file and replace the placeholders with your actual keys:

```javascript
// config.js
const CONFIG = {
  API_KEY: 'YOUR_API_KEY_HERE',
  ACCESS_TOKEN: 'YOUR_ACCESS_TOKEN_HERE',
  BASE_URL: 'https://api.themoviedb.org/3',
  IMG_BASE: 'https://image.tmdb.org/t/p'
};
```

### Step 3: Run the Project
1. Open `index.html` in your web browser.
2. Type a movie title in the search bar.
   - Results will appear in the sidebar; press up or down arrow keys to navigate results or press `Enter` to view details.