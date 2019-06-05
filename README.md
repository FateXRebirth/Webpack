# Webpack 4 Boilerplate

There is Webpack 4 template you can build the project by it.<br>
This Webpack tool is suitable for combination of multiple small projects.

## Features
- automatic minify JS, CSS and HTML
- automatic minify and copy images
- automatic clean the output folder
- use preprocessor such as `Babel`, `Scss/Sass`, `Postcss` and `Autoprefixer`
- a superset of JS that compiles to clean JS output `TypeScript`
- linting utility for JS and JSX `ESLint`
- static files use `Hash` filename to avoid the cache
- use devServer - hot reload for JS, CSS and HTML
- have many **custom variables** for CLI, using on the npm scripts

\# Custom variables: `name`, `entry`, `template`, `image`, `output`, `publicPath`

## Requirements

You only need Node.js pre-installed.

## Setup

Install plugin dependencies by: ```$ npm install```

## Development

Run the local webpack-dev-server with livereload by: ```$ npm run start```

Auto-compile on [http://localhost:8000/](http://localhost:8000/) and use the default project `src`.


## Building project
You can build the default project `src` by: ```$ npm run build```

## Create new project
1. Add your folder with the project name, and put it under the basic directory like `example`.

2. Add the main JS file (default name: `index.js`) and HTML template file (default name: `index.html`).

3. Add your npm script content on the package.json `scripts`:
   - On development node, you can write like `"dev:example": "webpack-dev-server --mode development --evn.name=example"`

   - On production node, you can write like `"build:example": "NODE_ENV=production webpack --mode production --evn.name=example"`

   - Otherwise you can set `--env.{variable}={value}` config, there are 5 variables: **name, entry, template, image, output, publicPath**. ( see `webpack.config.js` to get more details )

4. Start your project coding now.

