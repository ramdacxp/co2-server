###
### Raspberry Pi Version (ARM 32 v7)
###

### SDK -> https://hub.docker.com/_/microsoft-dotnet-sdk
### ============================================================================
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS sdk

### RESTORE
WORKDIR /server
COPY server/*.csproj .
RUN dotnet restore

### BUILD
COPY server .
RUN dotnet publish -c Release -o build

### RUNTIME
### ============================================================================
FROM --platform=linux/arm mcr.microsoft.com/dotnet/aspnet:5.0.1-buster-slim-arm32v7

### COPY PUBLISHED APP
WORKDIR /app
COPY --from=sdk server/build .

### CREATE AND COPY WWWROOT
WORKDIR /app/wwwroot
COPY --from=sdk server/wwwRoot .

### CREATE APP_DATA AND COPY SAMPLE DATA
WORKDIR /app/App_Data
COPY --from=sdk server/App_Data .

### TIME ZONE
ENV TZ=Europe/Berlin
ENV LANG de_DE.UTF-8
ENV LANGUAGE ${LANG}
ENV LC_ALL ${LANG}

### START SETTINGS
EXPOSE 80
EXPOSE 5000
EXPOSE 5001
ENV Co2Server__StoragePath="App_Data"
WORKDIR /app
ENTRYPOINT ["dotnet", "co2-server.dll"]