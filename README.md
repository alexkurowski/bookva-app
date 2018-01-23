# Bookva

> Writing application

### Build Preparations

- Install `slim-lang` gem

- Install `pandoc`

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test
```

---

### How to add new color schemes

- Define colors at `src/renderer/assets/stylesheets/variables.sass`

- Add a scheme class using `scheme` mixin at `src/renderer/assets/stylesheets/writer.sass`

- Lastly, add a dropdown option to Configurations component at `src/renderer/components/writer/sidebar/Configurations.vue`

- If scheme is dark, make sure to add its name at `src/renderer/App.vue` in darkSchemes array

### How to add new fonts

- Create a new folder at `src/renderer/assets/fonts/` and add there files for regular, bold, italic and bolditalic

- Add a new font-face at `src/assets/stylesheets/fonts.sass` for each font variant in the same order mentioned above

- Add a new `&.font-family-*new-font-name-here* > .medium-editor` rule at `src/assets/stylesheets/appearance.sass` with your font-family that matches font-face defined in previous step

- Lastly, add a dropdown option to Configurations component at `src/renderer/components/writer/sidebar/Configurations.vue`
