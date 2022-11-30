# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `pnpm i` , start a development server:

```bash
pnpm dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

---

## Basic Project Setting

See the [SvelteKit documentation](https://kit.svelte.dev/docs) for more information.

### Tailwind

#### Installation

[tailwind - svelte docs](https://tailwindcss.com/docs/guides/sveltekit)

**step 1:** install tailwind

```bash
pnpm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

**step 2:** create tailwind and PostCSS config files

```bash
npx tailwindcss init tailwind.config.cjs -p
```

**step 3:** inside `svelte.config.cjs` file add the following:

```js
	preprocess: [
		preprocess({
			postcss: true
		})
	],
```

result should look like this:

```js
const config = {
  preprocess: [
    preprocess({
      postcss: true
    })
  ],

  kit: {
    adapter: adapter()
  }
};
```

**step 4:** add paths to all template files inside `tailwind.config.cjs` file - add the following:

```js
  content: ['./src/**/*.{html,js,svelte,ts}'],
```

result should look like this:

```js
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: []
};
```

**step 5:** create a app.css inside `src` directory `./src/app.css` file and add the following:

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**step 6:** create `+layout.page` file inside `src` directory and add the following:

```js
<script>
  import "../app.css";
</script>

<slot />
```

### Fonts

Go to google fonts website choose your font and copy the link tag and paste it inside `src/app.css` file before tailwind imports.

```css
/* app.css */
@import url('https://fonts.googleapis.com/css2?family=Kalam&family=Source+Code+Pro:wght@400;700&family=Source+Sans+Pro:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
```

open `tailwind.config.cjs` file and add the following:

```js
/* tailwind.cjs */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  // when we add new font directly to `theme` we owerwrite the default tailwind font family - good for branding use ONLY brand fonts
  theme: {
    fontFamily: {
      sansSerif: ['Source Sans Pro', 'sans-serif'],
      mono: ['Source Code Pro', 'monospace'],
      handwriting: ['Kalam', 'cursive']
    },
    extend: {
      // we can add `fontFamily` here if we would like to have access to tailwind predefined font families like `sans` and `serif`
      // https://tailwindcss.com/docs/font-family

      // we can also add some custom collors here
      colors: {
        lavenderIndigo: '#8657e1',
        daisyBush: '#4714a5',
        goldenFizz: '#feff40',
        whisper: '#f9f4f9',
        pastelPurple: '#b2a1bb',
        purple: '#7209b7',
        robinEggBlue: '#00e9c0',
        blueGem: '#3813a0',
        caribbeanGreen: '#1CC6A0',
        scarlet: '#f72f45',
        monsoon: '#777878',
        silver: '#c0c0c0',
        gallery: '#efeaf2',
        caribbeanGreen: '#00ca9e',
        fog: '#decaec',
      },
    },
  plugins: []
};
```

---

### Linting

!!! install prettier tailwind plugin **new version**

[prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

**step 1:** uninstall old version of prettier

```bash
pnpm uninstall prettier-plugin-svelte
```

**step 2:** install new version of prettier

```bash
pnpm install -D prettier prettier-plugin-tailwindcss
```

**step 3:** rename `.prettierrc` to `.prettier.config.cjs` _(or create a new file and delete `.prettierrc`)_ file inside root directory and add the following:

```js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.cjs',
  useTabs: true,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 100,
  pluginSearchDirs: ['.']
  //overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
```

files `.prettierrc` and `.prettier.config.cjs` are identical only difference is in code syntax

now tailwind classes will automatically sort on save

---

<!-- **step 7:** create `+global.css` file inside `src` directory and add the following:

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
``` -->

now run the following command to start dev server:

```bash
pnpm dev
```

### Additional Libraries

[date-fns](https://www.npmjs.com/package/date-fns)
[svelte-markdown](https://www.npmjs.com/package/svelte-markdown)
