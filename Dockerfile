FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR "/OfficeAutomationSocietie.Api/OA.WebApi"
RUN dotnet restore "OA.WebApi/OA.WebApi.csproj"
RUN dotnet build "OA.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
WORKDIR "/OfficeAutomationSocietie.Api/OA.WebApi"
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "OA.WebApi.csproj" -c $BUILD_CONFIGURATION /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR "/OfficeAutomationSocietie.Api/OA.WebApi"
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OA.WebApi.dll"]
