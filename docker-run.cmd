@ echo off
start http://localhost:1234
docker run -p 1234:80 -it --rm ramdac/co2-server
