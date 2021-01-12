# CO² Dashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6
and is based on the following components:

## Angular 11

```cmd
npm install -g @angular/cli
ng new --routing --skip-tests --style=scss dashboard
```

**Hint** Do not enable strict checks as this leads to compile errors with echarts@5.0.0 (which are fixed in RC of 5.0.1).

## Tailwind CSS Styling

```cmd
cd dashboard
ng add ngx-tailwind
```

More info [here](https://notiz.dev/blog/tailwindcss-purge-optimize-angular-for-production#shortcut-aka-angular-schematics).

## eCharts Angular Wrapper ngx-echarts

```cmd
npm install echarts -S
npm install ngx-echarts -S
npm install resize-observer-polyfill -D
```

More info  [here](https://www.npmjs.com/package/ngx-echarts#getting-started).
