# Solid-ts-windi-ssr template

Simple Solid template supporting TypeScript, WindiCSS powered by Vite with SSR plugin.

## Development
Template use express server to handle SSR rendering. Node is required
```
pnpm run dev
#OR
npm run dev
#OR
yarn dev
```

## Building
Project can be build to ssr 
```
npm run build
#Test server
server:prod
```
And prerender with
```
npm run prerender
```

# Side palette
<style>
  .box {
    --color: white;
    display: inline-block;
    height: 1rem; 
    width: 1rem;
    background-color: var(--color);
  }
</style>

* <div class="box" style="--color: #390099"></div> blue
* <div class="box" style="--color: #9E0059"></div> purple 
* <div class="box" style="--color: #FF0054"></div> fuchsia (main)
* <div class="box" style="--color: #FF5400"></div> orange 
* <div class="box" style="--color: #FFBD00"></div> yellow 

