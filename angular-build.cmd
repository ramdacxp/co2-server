@ echo off
setlocal
pushd dashboard
rem npm run build:prod
set NODE_ENV=production
ng build --prod --output-path=../server/wwwRoot/app --base-href=/app
popd
endlocal
