# Siddharth Singh — blog

Black-on-white, Svbtle-style Jekyll theme. EB Garamond (self-hosted), sections for Writings, Images, Videos and Updates.

## Go live in 5 minutes
1. Create a GitHub repo named **`yourname.github.io`**.
2. Upload everything in this folder (keep the hidden `.github` folder).
3. Repo **Settings → Pages → Source: GitHub Actions**.
4. Edit `_config.yml` (social links, email, `url`). Commit. Site appears at `https://yourname.github.io`.

## Write a post
Create `_posts/2026-10-20-my-title.md`:

```markdown
---
title: "My title"
subtitle: "One-line summary"        # optional
category: writings                   # writings | images | videos | updates
cover: /assets/images/my-cover.jpg   # optional
---

First paragraph (shown on the home page).

<!--more-->

The rest of the post…
```

## Media cheat-sheet
| What | Snippet |
|---|---|
| Image | `{% include figure.html src="/assets/images/a.jpg" caption="Words" %}` |
| Wide image | add `width="wide"` |
| Edge-to-edge | add `width="full"` |
| Gallery | `{% include gallery.html images="/assets/images/a.jpg, /assets/images/b.jpg" columns="2" %}` |
| Video card (links out) | `{% include video.html url="https://youtube.com/watch?v=ID" caption="…" %}` |
| Own thumbnail | add `thumb="/assets/images/t.jpg"` (YouTube gets one automatically) |
| Looping teaser | add `loop="/assets/videos/teaser.mp4"` (2–5 s, silent, under 3 MB) |
| Length badge | add `duration="12:04"` |
| Pull quote | `<p class="pull">“Big idea here.”</p>` |

## Photo posts
Give every photo a title by listing them in the front matter. They appear in the post *and* on the Images page, where visitors can browse every photo you've ever posted with the arrows.

```yaml
---
title: "A week in photographs"
category: images
cover: /assets/images/a.jpg
photos:
  - src: /assets/images/a.jpg
    title: "The river before sunrise"
  - src: https://res.cloudinary.com/you/image/upload/b.jpg
    title: "First boats of the day"
---
{% include gallery.html %}
```

Clicking any photo on the site opens the viewer: arrows (or ← → keys, or swipe) move through the photos on that page, with the title, date and count underneath.

## Video posts
Videos are never hosted on the site. A video post links out:

```yaml
---
title: "My film"
category: videos
video: https://www.youtube.com/watch?v=ID   # or Vimeo, Instagram, any link
thumbnail: /assets/images/my-thumb.jpg     # optional for YouTube
loop: /assets/videos/teaser.mp4            # optional boomerang
duration: "8:30"
---
{% include video.html %}
```

Tips: resize photos to ~1600px wide before uploading (use squoosh.app). Keep long videos on YouTube; GitHub rejects files over 100 MB.

## Preview on your computer (optional)
Install Ruby, then: `bundle install` and `bundle exec jekyll serve` → http://localhost:4000

## Customise
- Menu items: `sections:` in `_config.yml`
- Fonts / spacing: `assets/css/main.css` (top of file)
- Favicon & app icon: `favicon.ico`, `assets/images/favicon-32.png`, `apple-touch-icon.png` — replace with your own anytime
- Link preview: `og_image` in `_config.yml`. Posts automatically use their `cover`, `thumbnail`, YouTube thumbnail or first photo; add `image:` to a post to pick a specific one
- Icons: Font Awesome Free (CC BY 4.0). Font: EB Garamond (SIL OFL, see assets/fonts/OFL.txt)
