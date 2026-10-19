---
title: "How to write a post on this blog"
subtitle: "Words, pictures and films — everything this theme can do, in one place."
category: writings
cover: /assets/images/sample-1.jpg
cover_caption: "The cover image comes from `cover:` in the front matter."
---

Every post is a Markdown file in the `_posts` folder, named `YEAR-MONTH-DAY-title.md`. Write normally — paragraphs, **bold**, *italics*, [links](https://jekyllrb.com) — and push to GitHub. The site rebuilds itself in about a minute.

<!--more-->

## Sections

Add `category:` to the front matter to choose where a post appears: `writings`, `images`, `videos` or `updates`. Every post also shows on the home page, newest first.

## Images

Put pictures in `assets/images/`, then drop one in with a caption:

{% include figure.html src="/assets/images/sample-2.jpg" caption="A normal image sits inside the text column." %}

Want more drama? Add `width="wide"` to break out of the column, or `width="full"` to go edge to edge.

{% include figure.html src="/assets/images/sample-3.jpg" width="wide" caption='`width="wide"` — for photographs that deserve room.' %}

Click any image to see it full screen.

## Galleries

For a set of photographs, list them separated by commas:

{% include gallery.html images="/assets/images/sample-1.jpg, /assets/images/sample-2.jpg, /assets/images/sample-3.jpg, /assets/images/sample-4.jpg, /assets/images/sample-5.jpg, /assets/images/sample-6.jpg" caption='Six images, three to a row. Add `columns="2"` for bigger tiles.' %}

## Video

Videos are never hosted here. Each one is a card that shows a thumbnail with a play button and opens the video where it really lives: YouTube, Vimeo, Instagram, anywhere.

{% include video.html url="https://www.youtube.com/watch?v=UF8uR6Z6KLc" thumb="/assets/images/thumb-talk.jpg" duration="15:04" caption="A thumbnail card. YouTube links get their thumbnail automatically if you leave out `thumb`." %}

Want movement instead of a still? Add `loop=` with a short silent clip (2–5 seconds, under 3 MB) and it plays on repeat like a boomerang:

{% include video.html url="https://instagram.com/yourhandle" loop="/assets/videos/sample-loop.mp4" thumb="/assets/images/thumb-loop.jpg" duration="0:58" caption="A looping teaser that links out to Instagram." %}

## Words

Quotes, lists and code all look after themselves.

<p class="pull">“Real artists ship.”</p>

1. Write the draft in one sitting.
2. Cut a third of it.
3. Publish before you feel ready.

```python
def compound(skill, days=365, rate=0.01):
    return skill * (1 + rate) ** days   # 1% better a day ≈ 37×
```

---

That's the whole toolkit. Now delete this post and write your own.
