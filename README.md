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

- Lastly, add a dropdown option to ThemeSelector component at `src/renderer/components/writer/sidebar/ThemeSelector.vue`
