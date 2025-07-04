FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only the backend project
COPY ["MoneyGer.Server.csproj", "."]
RUN dotnet restore "MoneyGer.Server.csproj"

COPY . .
RUN dotnet build "MoneyGer.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MoneyGer.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MoneyGer.Server.dll"]