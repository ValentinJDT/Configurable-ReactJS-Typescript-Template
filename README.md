# ReactJS Typescript Template

## Local start

Command `npm run start` or `npm run dev`

## Change default path

Edit `homepage` in package.json.<br />
Edit browser router `basename` in App.ts.<br />
Edit `try_files` path in nginx.conf.<br />
Edit `/usr/share/nginx/html/<frontend>` in Dockerfile.<br />

## Configuration

Edit/add default configuration files in `/public/default`.
If the edited configuration(s) doesn't/don't exist, it falls back to the default configuration(s).

If you want to add configuration file, add json file in `/public/default`, and add filename in `CONFIG_FILES` array in `/src/contexts/ConfigContext.ts`. If anyone wants to automate this step, do a pull request !

Use `useConfig` to acces to configuration.

## Build prod

Command `npm run build:prod`

## Docker image

Create image : `npm run build:docker`<br />
Push image : `npm run publish:docker`
