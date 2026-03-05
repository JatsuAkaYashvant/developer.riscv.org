# RISC-V Developer Portal
The hope for all things technical, nerdy, and deeply developer focused in the RISC-V Ecosystem. 

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator. This site is deployed at https://developer.riscv.org/.

The developer portal has 3 user personas, each with their own section on the portal.
- ISA Developers - for those working on the spec, microarchitecture, and simulating cores (from microcode to assembly to verilog)
- Hardware Developer - for those who use physical hardware, care about I/O, and are building systems (from System C to linux Drivers)
- Software Develoepr - For those building applications on top of the RISC-V Profiles (from linux drivers to high level language support

In addition the developer portal has the following features
- Technical Blog - for the hard core nerdery
- Device Directory - a centralized listing of RISC-V hardware devices and their specs (and where to find more information)
- Design Directory - A centralized listing of RISC-V cores / IP (both open and paid) that you can use to create your hardare

## Installation
There are two seperate websites that operate together. The Docusaurus Developer portal, and the Antora PDF->HTML portal. They are built and updated seperately. To update the Antora site first build Antora, then build Docusaurus to see the changes get picked up. 

### Install / build Docusaurus 
```shell
yarn install
yarn build
```

### Install / run Antora
```shell
cd antora
npx antora --fetch antora-playbook.yml
```

Note: there are specific overrides for the Antora build process in `antora/supplimental-ui/partials`, if you are seeing weird behavior address these files first. 

### Local Development

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.
```shell
yarn start
```

To stop the server press `ctrl+c`


#### Local Search
To run the site with search run the following 2 commands:

```shell
npm run docusaurus build
npm run docusaurus serve
```

NOTE: if you do not do this and instead just use `npm start` then the search bar will not build. 

#### Debug
If something has gone wrong, try running `yarn clear; yarn build; yarn start`

If you still have a problem, delete the `node_modules folder`, then run `yarn clear; yarn install; yarn build; yarn start`. 

This will fix 99% of problems. 

## Blog
The blog content is markdown files under the `/blog/` folder. You can create a new blog post by simply adding markdown files here. Take note of the header in the markdown files to specify author, date, post types,...etc. 

## Boards / Reference Design section
To submit a new board/reference design, please open a PR and follow the template. 
For detailed instructions, see the [add a new board to device directory](https://github.com/riscv/developer.riscv.org/wiki/Boards-Directory#add-a-device) guide.
