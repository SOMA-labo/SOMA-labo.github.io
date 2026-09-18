# Laboratoire SoMA — website

Static site for the **Scales of Microbial Architectonics (SoMA)**.
Plain HTML and one CSS file. No Jekyll, no build step. The only JavaScript is
the light/dark switch, about forty lines.

---

## Publishing it on GitHub Pages

The repository is `SOMA-labo/SOMA-labo.github.io`. The name has to match the
organisation account exactly — that is what makes Pages serve it at the root of
the domain rather than in a subfolder. It also has to be **public**; Pages on
org-owned private repos needs a paid plan.

If the folder is already a clone of that repo, committing and pushing is all it
takes:

```bash
git add -A
git commit -m "Initial site"
git push
```

If the folder is not a clone yet:

```bash
git init -b main
git add -A
git commit -m "Initial site"
git remote add origin git@github.com:SOMA-labo/SOMA-labo.github.io.git
git push -u origin main
```

Then, in the repository on github.com: **Settings → Pages → Build and
deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.

The site appears at **https://soma-labo.github.io/** within a minute or two —
GitHub lowercases the host, even though the repo is named with capitals. Every
later `git push` republishes it.

### Custom domain (optional)

Add a file called `CNAME` at the top level containing just your domain, e.g.
`soma-lab.org`, then point a `CNAME` DNS record at `soma-labo.github.io`. Set the
domain under Settings → Pages as well, and tick *Enforce HTTPS*.

---

## What is where

```
index.html          Home — statement, news
research.html       Four research strands, each with a figure slot
publications.html   Everything, grouped by year
team.html           PI, members, alumni, collaborators
teaching.html       Courses, workshops, supervision
join.html           Openings and how to write
contact.html        Address, links, what to email about
404.html            Shown for any missing URL
.nojekyll           Tells GitHub to serve the files as-is
assets/css/style.css   The whole design, commented by section
assets/js/theme.js     The light/dark switch — the only script on the site
assets/img/         Figures, portraits, logo, favicon
```

---

## Before you push: things to fill in

Every unfinished spot is wrapped in `<span class="todo">…</span>`, which renders
with a dashed orange underline so you cannot miss it on the page. Find them all
with:

```bash
grep -rn "todo" *.html
```

What is left:

- **Google Scholar URL** — the `?user=` link is still a stub, in every footer and
  on the contact and team pages.
- **Research figures** — four empty `.plate` slots in `research.html`.
- **Teaching** — the course and workshop entries are templates.
- **Join** — say whether postdoc positions are funded, and how PhD admissions
  work through the Paris-Saclay doctoral schools.
- One flagged item at the bottom of `publications.html`: the *Micrococcus* strain
  designation in the 2017 Genome Announcements entry was not on the personal
  site, so check it against the paper.
- Optional: `assets/img/og.jpg` at 1200×630, for link previews on social sites.

Already filled in: the affiliation and postal address, the email (written out as
`[at]` / `[dot]` rather than linked, so harvesters have to work for it), ORCID,
the map link, and the site URL in `og:url`.

Delete the `<span class="todo">` wrapper (keep the text inside) as you go.

---

## Editing

**Adding a paper.** Copy one `<li class="pub">` block in `publications.html`,
paste it at the top of the right year group, edit it. Wrap your own name in
`<b class="me">…</b>` so it is picked out. Delete any of the Journal / Data /
Code links you do not have. For a new year, copy a whole
`<section class="year-group">` block.

**Adding a news item.** Copy one `<li>` in the `<ul class="news">` on
`index.html`, newest at the top. The `datetime` attribute is for machines
(`2026-02-24` or `2026-02`); the visible text can say whatever you like. Six to
eight items is about right — let older ones fall off.

**Adding a person.** `team.html` renders one list, in rank order, with the PI
first and no other distinction. Two ready-made blocks sit in an HTML comment
below the list — copy one out, paste it into the `<ul class="roster">` where the
person belongs, and edit it. The Alumni section is in a comment too; uncomment it
when there are alumni. Three parts of a person block are optional and can be
deleted outright — the portrait, the flags, and the facts list. For the portrait,
replace

```html
<span class="person__portrait person__portrait--empty" aria-hidden="true"></span>
```

with

```html
<img class="person__portrait" src="assets/img/people/name.jpg" alt="">
```

Photos are cropped to 4:5 and desaturated slightly, so a set taken in different
places still sits together. 600×750px or larger is plenty.

Flags go in two places, both using the same span:

```html
<span class="person__flags" role="img" aria-label="Italy">🇮🇹</span>
```

Next to the **name**, for where the person is from, and after each **institution**
in the facts list, for where that institution is. Put two flags in one span
separated by a space, and name both countries in the `aria-label` — a screen
reader announces a bare flag emoji as two letters or not at all. Copy flags from
[emojipedia.org/flags](https://emojipedia.org/flags). Worth letting people pick
their own rather than assigning one.

For the lines under a name — degrees, previous posts, fellowships — use the
facts list, newest first, one line each:

```html
<ul class="person__facts">
  <li>PhD in Physics, Sapienza <span class="when">2021</span></li>
  <li>MSc in Ecology, Bologna</li>
</ul>
```

`<span class="when">` greys a year or place back. Delete the whole `<ul>` for
anyone who should just have the sentence of prose.

**Adding a figure.** In `research.html`, replace

```html
<figure class="plate plate--empty">
  <figcaption>…</figcaption>
</figure>
```

with

```html
<figure class="plate">
  <img src="assets/img/research-01.jpg" alt="Describe what the figure shows">
  <figcaption>A sentence of caption.</figcaption>
</figure>
```

Note the `plate--empty` class comes off. Export figures around 1600px wide.
`plate--offset` indents a figure on wide screens — it is used on alternating
strands to keep the page from settling into a column; keep that alternation if
you add more.

**The navigation and footer are repeated in every file.** That is the cost of
having no build step. If you change a nav item or the address, change it in all
eight HTML files — `grep -rn "site-nav" *.html` will find them.

---

## The design

The aesthetic is borrowed from Isamu Noguchi, which in practice means four rules:

1. **Mass and void.** Whitespace is the material. Content sits asymmetrically
   against it — a narrow label column on the left, content on the right — rather
   than being centred or boxed in cards.
2. **Materials, not decoration.** Warm mulberry-paper background, sumi ink text,
   stone grey for secondary information, and one warm Akari-lantern accent for
   links. No shadows, no gradients, no rounded boxes.
3. **Hairlines.** Structure is drawn with 1px rules, the way an Akari lamp is
   drawn with bamboo ribbing. The ribbed divider under each page title and the
   sculpture on the home page are the same idea.
4. **One sculptural object.** The form on the home page is mass, a void cut
   through it, a single light, and a base. It is the only ornament on the site.

All colours are CSS custom properties at the top of `style.css`, in two blocks:
light, and a dark set under `prefers-color-scheme: dark`. Changing the palette
means editing those ten lines and nothing else. The typeface is a single neo-grotesque
([Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans)) from Google Fonts, falling
back to Helvetica Neue and Arial. To change it, edit `--face` at the top of
`style.css` and the matching `<link>` in each page's `<head>`.

The layout is responsive down to phone width without any JavaScript: the
navigation simply wraps, the label columns collapse above their content, and the
sculpture shrinks.

### Light and dark

The site follows the visitor's system setting on its own. The small circle at the
right of the header lets them override it, and the choice is remembered in
`localStorage` under `soma-theme`.

Three pieces make that work, and all three have to stay:

1. `assets/js/theme.js`, loaded with `defer` at the end of each `<body>`.
2. A two-line inline script in every `<head>`, just before the stylesheet. It
   reads the stored choice before the first paint. Moving it into theme.js would
   make the page flash the wrong theme on every load, so it has to stay inline.
3. The `<button class="theme-toggle" hidden>` in each header. It starts hidden
   and theme.js reveals it, so with JavaScript off nobody is shown a switch that
   cannot work — the site still follows the system setting in that case.

Colours live in three blocks at the top of `style.css`: the two palettes, where
each hex appears exactly once, then a `prefers-color-scheme` block and a
`[data-theme]` block that only remap which palette is in use. To recolour the
site, edit the `--l-*` and `--d-*` values and nothing else.

One known gap: `favicon.svg` carries its own `prefers-color-scheme` rule, so the
tab icon follows the system rather than the toggle. Browsers do not expose the
page's theme to a favicon, so this cannot be fixed from here.

---

## Checks

Before pushing, opening the files locally is enough:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

Opening `index.html` directly with `file://` also works, links included.
