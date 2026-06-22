# Submit content

This site is built from Markdown files in a Git repository. To add a new project
, person, or event, fork the repo, add a file, and open a pull request.

## 1. Fork the repo

Use the **Fork** button on GitHub to make your own copy. Clone it, create a
branch (e.g. `add-my-project`), and you're ready to edit.

## 2. Add a file

Pick the right folder based on what you're adding:

- `src/content/events/` - a new jam date
- `src/content/people/` - your bio (the filename is your URL slug)
- `src/content/projects/` - something you made
- `src/content/sketches/` - a p5.js sketch for the home page hero

The filename becomes the URL slug so it needs to be short and URL-friendly.
Examples: `2025-07-12-summer-jam.md`, `ada.md`, `webgl-experiment.md`

## 3. Fill in the frontmatter

Markdown files (events, people, projects) start with a block of YAML
between `---` markers. Sketches are `.js` files with a different shape — see below.

### Event

```yaml
---
title: August 25
date: 2025-08-12
rsvp: https://example.com/rsvp
---
```

### Person

```yaml
---
name: Ada Lovelace
links:
  - label: Website
    url: https://example.com
pronouns: she/her
---
I've been making generative art for about three years and love p5.js. Outside of
code I do ceramics.
```

The filename is your slug and your URL: `ada.md` becomes `/people/ada`. `name`
is optional, omit it to be known only by your slug. Set `displayHandle: true`
to show `@slug` in place of your name everywhere on the site (e.g. on project
cards and bylines).

### Project (attributed)

```yaml
---
title: p5.js Experiments
event: august-25
author: ada
tags: [p5.js, generative art]
links:
  - label: Live demo
    url: https://example.com/art
image: https://example.com/cover.png
---
A series of sketches exploring different particle behaviours.
```

### Project (anonymous)

To post anonymously, just leave out the `author` field.

```yaml
---
title: WebGL Test
event: august-25
tags: [webgl]
---
A WebGL experiment.
```

### Sketch (.js file)

The hero on the home page shows a random p5.js sketch. A sketch is a single
`.js` file that exports a default function (the p5 instance-mode sketch) plus
an optional `meta` object with `title` and `author`. Prefix all p5 calls with `p.`:

```js
export const meta = {
	title: 'My cool sketch',
	author: 'your-slug' // optional, links to /people/your-slug
};

export default function sketch(p) {
	p.setup = () => {
		p.createCanvas(400, 400);
		p.background(255);
	};

	p.draw = () => {
		p.fill(0);
		p.circle(p.random(400), p.random(400), 20);
	};
}
```

`title` is shown ontop of the hero. If `author` matches a person file in
`src/content/people/`, their profile is linked. Omit `author` to post anonymously.

## 4. Write the body

Below the frontmatter, write the body in Markdown. It's parsed with
[mdsvex](https://mdsvex.pngwn.io/) so you can embed images, videos and Svelte components.

To embed a video, use a raw `<video>` tag with absolute paths under
`/assets/content/...` (mirroring the folder structure under `static/`):

```html
<video controls>
	<source src="/assets/content/projects/your-slug/clip.mp4" />
</video>
```

## 5. Open a pull request

Push your branch and open a PR. GitHub Actions will run a build to make sure
your frontmatter is valid. If something's off, the PR will show an error. A
maintainer will review and merge when ready.

Once your PR merges, the site rebuilds and your work is live.

## Tips

- Projects **require** an `event`. This must match the project slug (the
  filename minus `.md`) of a defined event or the build will fail
- Dates are `YYYY-MM-DD`.
- If you're unsure of anything, just reach out to one of the
  [organisers](/people) who will be able to help!
