# Creative Code Bristol

The website for Creative Code Bristol with info about the event,
upcoming dates, and a gallery of projects from previous attendees.

## How it works

The site is built from Markdown files in `src/content/`. Anyone can add a
project, person, or event by adding a new `.md` file and opening a pull
request. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the contributor
guide, or visit `/submit` on the live site.

## Stack

- [SvelteKit](https://svelte.dev/docs/kit)
- [mdsvex](https://mdsvex.pngwn.io/) - markdown parser with support for embedded
  Svelte components
- [zod](https://zod.dev/) - markdown frontmatter validation

## Develop

```sh
npm install
npm run dev
```

## Check & build

```sh
npm run check       # type-check
npm run build       # build static site to ./build
npm run preview     # preview the production build
```

## Project layout

```txt
src/
├── app.css                              # design tokens + global styles
├── app.html                             # HTML shell
├── lib/
│   ├── components/                      # cards, byline
│   └── content/                         # zod schemas, content loaders
├── routes/
│   ├── +layout.svelte                   # site shell (header/nav/footer)
│   ├── +page.svelte                     # home
│   ├── about/                           # about the jam
│   ├── events/[slug]/                   # event list + detail
│   ├── people/[slug]/                   # attendee list + detail
│   ├── projects/[slug]/                 # project list + detail
│   └── submit/                          # contributor guide
└── content/                             # EDIT THIS FOLDER to update the site
    ├── events/*.md
    ├── people/*.md
    └── projects/*.md
```

## Adding content

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the contributor guide, or
visit `/submit` on the live site for the same guide with examples.
