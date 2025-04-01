# gds-limo-api

A Node.js TypeScript API that interacts with the GDS LIMO Web Service.

## Features

- REST API built with Express.js and TypeScript
- JWT Authentication with apiKey and secret
- Mission management (list, create)
- Callbacks for mission status changes
- CI/CD pipeline with GitHub Actions for Azure deployment

## Prerequisites

- Node.js (v18+)
- npm (v8+)
- Azure account (for deployment)
- GitHub account (for CI/CD)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sobhisobhi/gds-limo-api.git
cd gds-limo-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Set up your environment variables in the `.env` file

## Development

Start the development server:
```bash
npm run dev
```

The server will run on http://localhost:3000 (or the port specified in your `.env` file)

## Building

Build the application:
```bash
npm run build
```

## Testing

Run tests:
```bash
npm test
```

## API Documentation

### Authentication

```
POST /api/auth/login
```

Request body:
```json
{
  "apiKey": "your_gds_api_key",
  "secret": "your_gds_secret"
}
```

Response:
```json
{
  "status": "success",
  "token": "jwt_token",
}
```

### Missions

All mission endpoints require authentication. Add the JWT token to the Authorization header:
```
Authorization: Bearer your_jwt_token
```

#### Get Missions

```
GET /api/missions
```

Query parameters:
- `MIS_DATE_DEBUT_MIN`: Filter missions with start date >= specified date (format: YYYY-MM-DD)
- `MIS_DATE_DEBUT_MAX`: Filter missions with start date <= specified date (format: YYYY-MM-DD)

#### Create Mission

```
POST /api/missions
```

Request body:
```json
{
  "MIS_TSE_ID": "id_of_service_type",
  "MIS_TVE_ID": "id_of_vehicle_type",
  "MIS_DATE_DEBUT": "2023-10-20",
  "MIS_HEURE_DEBUT": "10:00",
  "MIS_HEURE_FIN": "11:30",
  "C_Gen_EtapePresence": [
    {
      "EPR_TRI": "0",
      "EPR_LIE_ID": {
        "LIE_TLI_ID": "3",
        "LIE_FORMATED": "123 Main St, Paris",
        "LIE_VILLE": "Paris",
        "LIE_CP": "75001",
        "LIE_PAY_ID": "1",
        "LIE_LAT": "48.856614",
        "LIE_LNG": "2.3522219"
      }
    }
  ]
}
```

#### Set Mission Callback

```
POST /api/missions/callback
```

Request body:
```json
{
  "mission_id": "mission_id",
  "callback_url": "https://your-callback-url.com",
  "events": ["status_change"]
}
```

## Deployment

The application is configured to automatically deploy to Azure via GitHub Actions when code is pushed to the main branch.

To set up the deployment:

1. Create an Azure Web App
2. Configure the following GitHub secrets:
   - `AZURE_WEBAPP_NAME`: The name of your Azure Web App
   - `AZURE_WEBAPP_PUBLISH_PROFILE`: The publish profile from Azure

## License

ISC