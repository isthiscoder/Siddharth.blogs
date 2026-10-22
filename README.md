# Siddharth.blogs

The source for isidd.com (Jekyll, built by GitHub Actions).

## How the site is laid out

- **Home**: split like isidd.dev. The left side stays put: name, one-line intro (`description` in `_config.yml`), menu and social icons. The right side scrolls: About (from `about.md`), then the newest 5 Writings, Images, Videos and Updates, each with an "Open more" link.
- **Writings and Updates**: 12 per page.
- **Images**: 60 photos per page, 3 across (20 rows). Tap any photo to open the viewer.
- **Videos**: 60 per page, 3 across.

New pages (`/writings/page2/`, `/images/page3/` …) appear by themselves as you add posts. The file `_plugins/section_pager.rb` does this. There's nothing to copy or edit.

## Settings

| What | Where |
|---|---|
| Newest items per section on the home page | `home_count:` in `_config.yml` |
| Items per page | `per_page:` in `writings.html`, `images.html`, `videos.html`, `updates.html` |
| Menu order | `sections:` in `_config.yml` |
| Social links | `social:` in `_config.yml` |

## Adding posts

Make a file in `_posts/` named `YYYY-MM-DD-title.md`. Set `category:` to one of `writings`, `images`, `videos` or `updates`.

- **Writings and updates**: `title:`, an optional `subtitle:`, then the text.
- **Images**: a `photos:` list, where each photo has a `src:` and a `title:`.
- **Videos**: `video:` (a YouTube, Instagram or other link), `thumbnail:` and an optional `duration:`.

## Fonts

EB Garamond only, upright. There are no italics anywhere on the site.
