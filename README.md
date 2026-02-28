# Tag Extractor

A Chrome Extension that extracts tags from booru sites when viewing a **specific post page**.

## Supported Sites

- rule34.xxx  
- danbooru.donmai.us  
- gelbooru.com  

---

## Features

- Extracts tags only when viewing a valid post page (with an ID).
- Normalizes tags:
  - Unicode normalization (NFKC)
  - Removes special characters
  - Replaces spaces with `_`
- Merges all tags into a single space-separated string.
- Single button: **Extract & Copy**
- Automatically copies tags to clipboard.
- Minimal dark UI.
- Displays current domain.

---

## Valid Post URL Formats

The extension only works on specific post pages.

### Danbooru

```
https://danbooru.donmai.us/posts/{id}
```

### Gelbooru

```
https://gelbooru.com/index.php?page=post&s=view&id={id}
```

### Rule34

```
https://rule34.xxx/index.php?page=post&s=view&id={id}
```

If you are not on a valid post page, the extension will display:

```
You must open a specific post.
```

---

## Installation (Developer Mode)

1. Open Chrome
2. Go to:

```
chrome://extensions
```

3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the `tag-extractor` folder

---

## Project Structure

```
tag-extractor/
│── manifest.json
│── content.js
│── popup.html
│── popup.js
│── popup.css
```

---

## Usage

1. Open a specific post on rule34 / danbooru / gelbooru.
2. Click the extension icon.
3. Press **Extract & Copy**.
4. The button changes to **Copied ✓**.
5. Tags are copied to your clipboard.

---

## How It Works

- Uses `chrome.scripting.executeScript`
- Injects a content script into the active tab
- Queries DOM to extract tags
- Uses Clipboard API to copy tags
- No background service worker

---

## License

For personal use only.