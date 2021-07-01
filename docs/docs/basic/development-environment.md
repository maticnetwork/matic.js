---
sidebar_position: 2
---

# Setting up for dev environment

**Setup**

```bash
npm install
```

**Lint**

```bash
# To check lint errors
npm run lint

# To fix most common lint errors
# Note that it might not fix all errors, some need manual intervention
npm run lint:fix
```

**Transpile typescript files**

```bash
npm run build
```

**Generate distribution files**

```bash
npm run build:webpack
```

**NPM publish**

Before running publish script, make sure you have updated version properly.

Note that `prepublishOnly` script will be automatically called while publishing. It will check lint, clean dist/lib folders and build fresh distribution files before it executes `npm publish`.

```bash
npm publish
```
