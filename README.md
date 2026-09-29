# Naxo Timepieces — Website

Neo-vintage watch dealer website built with Next.js and React.

## 🚀 Deploy to Vercel (Step-by-Step)

### Step 1: Create a GitHub account (if you don't have one)
1. Go to **github.com** and sign up for a free account

### Step 2: Upload this project to GitHub
1. Log in to GitHub
2. Click the **+** button (top right) → **New repository**
3. Name it `naxotimepieces-website`
4. Keep it **Public** or **Private** (your choice)
5. Click **Create repository**
6. On the next page, click **"uploading an existing file"**
7. Drag and drop ALL the files and folders from this project into the upload area
8. Click **Commit changes**

### Step 3: Deploy on Vercel
1. Go to **vercel.com** and click **Sign Up** → **Continue with GitHub**
2. Once logged in, click **Add New → Project**
3. Find your `naxotimepieces-website` repo and click **Import**
4. Leave all settings as default — Vercel auto-detects Next.js
5. Click **Deploy**
6. Wait ~1 minute — your site is LIVE! 🎉

### Step 4: Add your custom domain (optional)
1. In your Vercel dashboard, go to your project → **Settings → Domains**
2. Type your domain (e.g., `naxotimepieces.com`) and click **Add**
3. Update your domain's DNS records as shown by Vercel
4. SSL certificate is automatic

## 📁 Project Structure

```
naxo-site/
├── app/
│   ├── globals.css      ← Global styles & fonts
│   ├── layout.js        ← HTML wrapper & meta tags
│   └── page.js          ← Entry point
├── components/
│   └── NaxoApp.jsx      ← Full website (all 6 pages)
├── public/
│   └── naxo-logo.png    ← Your logo
├── package.json         ← Dependencies
├── next.config.mjs      ← Next.js config
└── README.md            ← This file
```

## ✏️ How to Edit Content

All website content is in `components/NaxoApp.jsx`:

- **Watch listings**: Edit the `WATCHES` array (line ~10)
- **Articles**: Edit the `ARTICLES` array (line ~30)
- **Milestones**: Edit the `MILESTONES` array (line ~57)
- **Social links**: Search for `instagram.com`, `t.me`, `wa.me` and update URLs
- **Contact details**: Search for "Mu Templar" to find address references
- **Event details**: Search for "Retro Factory" to update event info

## 🎨 How to Customize

- **Colors**: Edit the `BRAND` object at the top of `NaxoApp.jsx`
- **Fonts**: Change in both `globals.css` and inline styles
- **Logo**: Replace `public/naxo-logo.png` with your updated logo
- **Images**: Replace Unsplash URLs with your actual watch photos

## 📸 Adding Your Own Watch Photos

Replace the Unsplash placeholder URLs in the `WATCHES` array with your actual photos.
You can either:
1. Host images on a service like Imgur or Cloudinary
2. Put them in the `public/` folder and reference as `/photo-name.jpg`

## 🔗 Connecting Social Links

Search for these placeholder URLs in `NaxoApp.jsx` and replace:
- `https://instagram.com/naxotimepieces` → your actual IG link
- `https://t.me/naxotimepieces` → your Telegram channel
- `https://wa.me/6500000000` → your WhatsApp (replace with real number)
- `https://carousell.sg/naxotimepieces` → your Carousell profile
- `hello@naxotimepieces.com` → your actual email
