# Private (password-locked) project

The last card in "Selected work" is the Community Health Profiles Redesign. Its
name and screenshot show openly, but the write-up, tech stack, impact line, and
the live prototype URL are AES-GCM encrypted in `assets/locked-project.json`.
Entering the password on the site derives a key (PBKDF2-SHA256) in the browser
and decrypts those details client-side; the prototype URL is never in the page
source until someone unlocks it.

The visible screenshot is `assets/chp-redesign.png` (a crop of the prototype's
"at a glance" view). Swap it for a newer shot any time; it carries nothing secret.

## Current password

`(kept out of the repo; ask Morgan)`

## To change the content or password

1. Serve the repo locally: `python3 -m http.server` (from the repo root).
2. Open `http://localhost:8000/tools/encrypt.html`.
3. Edit the JSON, set the password, click **Generate**.
4. Paste the output over `assets/locked-project.json`.
5. Commit both files.

## Security note

This keeps the project out of search engines and casual view, and the URL is
genuinely unrecoverable without the password. It is *not* bank-grade: the
ciphertext is public, so a short or guessable password can be brute-forced
offline. Use a longer passphrase if the prototype is sensitive, and rotate it
after the job search. `tools/encrypt.html` contains no secrets and can be
deleted or kept.
