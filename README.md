# Laboratoire SoMA — website

The site for **Scales of Microbial Architectonics (SoMA)**, live at
**https://soma-labo.github.io/**.

You write text in Markdown and simple lists; GitHub turns them into the site
with [Jekyll](https://jekyllrb.com/) every time you push. There is nothing to
install to publish. The look — colours, type, layout — lives in one file,
`assets/css/style.css`, and never needs touching to change content.

---

## Where everything is

| To change…                          | Edit                          |
|-------------------------------------|-------------------------------|
| Text on a page                      | `index.md`, `research.md`, `team.md`, `teaching.md`, `join.md`, `contact.md` |
| News on the home page               | `_data/news.yml`              |
| Publications                        | `_data/publications.yml`      |
| People on the Team page             | `_people/` — one file each    |
| Alumni                              | `_data/alumni.yml`            |
| Research strands (text and figures) | `_strands/` — one file each   |
| Courses / workshops                 | `_data/courses.yml`, `_data/workshops.yml` |
| Positions on the Join page          | the top of `join.md`          |
| Footer address, email, nav, links   | `_config.yml`                 |
| Postal address on the Contact page  | `_includes/contact-grid.html` |
| Flags the Team page knows about     | `_data/countries.yml`         |

Every one of those files explains its own format at the top. The folders
starting with `_layouts` and `_includes` are the page templates; you
shouldn't need to open them.

---

## Everyday edits

### Page text

Pages are Markdown. The block at the top between the two `---` lines holds the
page's title and opening paragraph (`lede`); below it is the page itself.

**Each `## Heading` starts a new section**, and the heading becomes the small
label in the left-hand column:

```markdown
## Openings

We are new, but will soon be looking for students and postdocs…

[Read more and get in touch →](join.html)
```

Markdown you'll use: `*italics*`, `**bold**`, `[link text](https://…)`, a
blank line between paragraphs, `- ` at the start of a line for a bullet.

Lines like `{% include news.html %}` pull in a list from `_data/` — leave them
where they are.

### Adding a paper

Copy a block in `_data/publications.yml`, paste it at the top of the list,
and edit it:

```yaml
- year: 2026
  title: "Title as published, with *Genus species* in italics"
  authors: "Shoemaker, W.R., and J. Grilli"
  venue: "mSystems, 11(3):e01221-25"
  journal: https://doi.org/10.1128/msystems.01221-25
  code: https://github.com/wrshoemaker/sojourn_macroeco
```

Leave out any of `journal`, `preprint`, `data`, `code` you don't have. Lab
members are bolded automatically — add a new member's name spellings to
`lab_members` in `_config.yml`.

### Adding a news item

At the top of `_data/news.yml`:

```yaml
- date: 2026-10
  text: "*Talk.* Title of the talk. Venue, City, Country."
```

A year shows as "2026"; a month or day shows as "Oct 2026".

### Adding a person

Copy `_people/_template.md`, name the copy with its place in the list and the
person's name — `02-rossi.md` — and fill it in. Put their photo in
`assets/img/people/`. Flags are written as country codes, `flags: [IT]`; the
codes are in `_data/countries.yml`.

### Adding a research figure

Put the image in `assets/img/` (about 1400px wide; WebP or PNG), then in the
strand's file in `_strands/`:

```yaml
figure: assets/img/research-04.webp
alt: >
  What the figure shows, for someone who can't see it.
caption: >
  A sentence of caption.
```

### Hiding something without deleting it

- An item in a `_data/` list, a person, or a strand: add `hidden: true`.
- A section of a page: the hidden sections in `teaching.md` and `join.md`
  show the pattern — the section sits between a `{% comment %}` line and a
  `{% endcomment %}` line. Delete those two lines to bring it back.

### Two things that trip people up

- **Indentation matters in the `.yml` files and the `---` block.** Use spaces,
  not tabs, and line things up with the entry above.
- **Put text in `"double quotes"`** when it contains a colon followed by a
  space, or starts with `*`, `[`, or a number. The files already do this for
  the fields where it's likely.

If a push breaks the build, GitHub emails you, and the **Actions** tab of the
repository shows the line it choked on. The live site keeps the last good
version in the meantime.

---

## Publishing

```bash
git add -A
git commit -m "What you changed"
git push
```

The site updates a minute or two later.

## Previewing locally (optional)

Without a local preview, push and look at the live site. To preview first,
install Jekyll once:

```bash
brew install ruby                       # macOS's own Ruby is too old
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
# open a new terminal, then, in this folder:
bundle install
```

Then, whenever you want to preview:

```bash
bundle exec jekyll serve
```

and open http://localhost:4000. It rebuilds as you save; changes to
`_config.yml` need a restart. The `Gemfile` pins the exact Jekyll version
GitHub uses, so what you see is what will go live.

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

Colours are CSS custom properties at the top of `style.css`: a light palette
(`--l-*`) and a dark one (`--d-*`), each hex written once. The typeface is
[Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans); to change
it, edit `--face` in `style.css` and the font `<link>` in
`_includes/head.html`.

### Light and dark

The site follows the visitor's system setting. The small circle at the right of
the header overrides it, and the choice is remembered in `localStorage` under
`soma-theme`. Three pieces make that work and all three have to stay:
`assets/js/theme.js`; the one-line script in `_includes/head.html` that reads
the stored choice before the first paint (moving it into theme.js would make
every page flash the wrong theme); and the `<button class="theme-toggle"
hidden>` in `_includes/header.html`, which theme.js reveals, so visitors with
JavaScript off aren't shown a switch that can't work.

`favicon.svg` follows the system setting rather than the toggle — browsers
don't expose the page's theme to a favicon.

### Templates, for reference

`_layouts/default.html` is the page skeleton: head, header, footer.
`_layouts/page.html` adds the title and lede; `_layouts/home.html` adds the
opening and the sculpture. `_includes/sections.html` is what turns each
`## Heading` into a labelled section. The other files in `_includes/` each
render one list.
