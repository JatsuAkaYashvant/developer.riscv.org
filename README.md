# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator. This site is deployed at https://developer.riscv.org/.

### Installation

Install Docusaurus 
```shell
yarn install
```

Install / run antora
```shell
cd antora
npx antora --fetch antora-playbook.yml
```

Note: there are specific overrides for the antorra build process in `antora/supplimental-ui/partials`, if you are seeing weird behavior address these files first. 

### Local Development

run it with yarn. `yarn clear; yarn build; yarn start` is the ultimate hack, it will fix almost anything. 

If this is your first time installing then run
```shell
yarn install
yarn build
yarn start
```

to stop the local build press `ctrl+c`

After your first time running the install you can just use `yarn start`

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

#### Local Search
To run the site with search run the following 2 commands:

```shell
npm run docusaurus build
npm run docusaurus serve
```

NOTE: if you do not do this and instead just use `npm start` then the search bards will not build. 

#### Debug
If something has gone wrong, try running `yarn clear; yarn build; yarn start`

If you still have issues remove the `node_modules folder`, then run `yarn clear; yarn install; yarn build; yarn start`. 

This will fix 99% of problems. 

## Blog
The blog content are markdown files under the `blog/` folder. You can create a new blog post by simply adding markdown files here. Take note of the header in the markdown files to specify author, date, post types,...etc. 

## Boards section
Work in Progress...