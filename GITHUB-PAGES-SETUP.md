# Upload to the `insightstranslator` GitHub repository

1. Extract the ZIP.
2. Open your GitHub repository `insightstranslator`.
3. Delete or overwrite the previous root files.
4. Upload all files and folders from the extracted package. Do not upload the ZIP itself and do not add an extra containing folder.
5. Commit to `main`.
6. Go to **Settings → Pages**.
7. Choose **Deploy from a branch**.
8. Select branch `main` and folder `/(root)`.
9. Save.
10. After deployment, open the site once with a hard refresh. The new service worker uses cache version `v0.8.0` and removes older caches.

Expected repository root:

```text
index.html
app.js
styles.css
manifest.webmanifest
service-worker.js
.nojekyll
data/
icons/
docs/
tests/
```

Only fictional test profiles are included because a GitHub Pages site is publicly accessible.
