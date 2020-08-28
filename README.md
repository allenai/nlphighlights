# NLP Highlights Website

## Fixing transcriptions

Transcribing technical discussions with non-native speakers is very challenging!  We worked closely
with our transcribers to try to make sure that all technical terms, names, etc., are correct, but we
surely did not catch everything.  We expect that there are lots of small mistakes, and we always
appreciate help correcting them.  Just open a PR to correct the markdown for whatever episode has an
error (find it in the `episodes/` directory).

## Maintaining the website

If you find yourself in the position of maintaining this website for whatever reason, here are some
instructions for doing so.

### Running the app locally

To start the local development server, install [Gatsby](https://gatsbyjs.org)
and then all other dependencies. This should serve up the app on
`localhost:8000`.

```bash
npm install -g gatsby-cli  # Install Gatsby globally
npm install                # Install dependencies
npm run dev                # Run the development server
```

### Episodes

Episodes are placed in [`/episodes`](/episodes) and are Markdown files consisting of a transcription
and some auxiliary information.  They should begin with a three-digit episode number (like
`012_title.md`); we'll worry about fixing this for episode numbers higher than 999 if we ever get
that high.  These markdown documents will be turned into pages.  In their frontmatter block at the
top of the file, they need to specify `type: episode`, as well as the following meta:

```yaml
---
title: The episode title
hosts: ["host", "names"]
guests: ["guest", "names"]
number: episode_num
tags: ["episode", "tags"]
type: episode
---
```

Tags are currently unused, but might be some day, for nicer website functionality.

### Formatting

This app uses REVIZ-preferred code formatting. To ensure components are formatted correctly, you can
run the following command to check and fixing linting issues before committing changes.

```
npm run lint:fix
```

### Mobile Development

If you're developing on a Mac and wish to test changes on an iPhone, the following command will
allow the Gatsby server running locally on your machine to be accessed by any device connected to
the same Wi-fi network:

```
gatsby develop -H $(hostname) -p 8000
```

Look for the web address and port that the Gatsby server exposes. It should look something like
`http://YOUR-COMPUTER-NAME.local:8000/`.

### Dependencies

#### Back-end

This app is deployed via [Skiff](https://github.com/allenai/skiff).

#### Front-end

Like most AI2 web apps, the front-end is powered by the
[Varnish](https://github.com/allenai/varnish) UI component library and its dependencies
([React](https://reactjs.org/), [Ant Design](https://ant.design/), and [Styled
Components](https://styled-components.com/)).

Unlike most AI2 web apps, package management is handled via [NPM](https://www.npmjs.com/) instead of
Yarn, and the routing and static site generation is driven by [Gatsby](http://gatsbyjs.org/) instead
of NextJS. This app also does not use TypeScript, as it was not included in the template that this
app was forked from.

See [`package.json`](https://github.com/allenai/allennlp-guide/blob/master/package.json) for list of
all packages used in this app.

### Static assets

All files added to `/static` will become available at the root of the deployed site. For example,
`/static/diagram.svg` can be referenced in the website as `/diagram.svg`.
