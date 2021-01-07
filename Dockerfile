### SDK -> https://hub.docker.com/_/microsoft-dotnet-sdk
### ============================================================================
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS sdk

### RESTORE
WORKDIR /Server
COPY Server/*.csproj .
RUN dotnet restore

### BUILD
COPY Server .
RUN dotnet publish -c Release -o build

### ASP.NET RUNTIME -> https://hub.docker.com/_/microsoft-dotnet-aspnet/
### ============================================================================
FROM mcr.microsoft.com/dotnet/aspnet:5.0

### COPY APP
WORKDIR /app
COPY --from=sdk Server/build .

### TIME ZONE
ENV TZ=Europe/Berlin
ENV LANG de_DE.UTF-8
ENV LANGUAGE ${LANG}
ENV LC_ALL ${LANG}

### START SETTINGS
EXPOSE 80
EXPOSE 5000
EXPOSE 5001
ENV Server__StoragePath="App_Data"
WORKDIR /app
ENTRYPOINT ["dotnet", "Server.dll"]
