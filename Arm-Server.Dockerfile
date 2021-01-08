### SDK
### ============================================================================
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS sdk

### RESTORE
WORKDIR /server
COPY server/*.csproj .
RUN dotnet restore

### BUILD
COPY server .
RUN dotnet publish -c Release -o build

### RUNTIME
### ============================================================================
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1.1-buster-slim-arm32v7

### COPY APP
WORKDIR /app
COPY --from=sdk server/build .

### TIME ZONE
#RUN echo "Europe/Berlin" > /etc/timezone
#RUN dpkg-reconfigure -f noninteractive tzdata
ENV TZ=Europe/Berlin
ENV LANG de_DE.UTF-8
ENV LANGUAGE ${LANG}
ENV LC_ALL ${LANG}

### START SETTINGS
EXPOSE 80
EXPOSE 5000
ENV ConnectionStrings__NumericStore="Server=localhost;Port=3307;User ID=dbuser;Password=dbpasswd;Database=mydb"
WORKDIR /app
ENTRYPOINT ["dotnet", "server.dll"]
