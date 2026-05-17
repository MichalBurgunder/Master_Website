# Blog Application

A full-stack blog platform with a Java Spring Boot backend, Angular frontend, and PostgreSQL database — each running in its own Docker container.

---

## Architecture

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   Frontend      │       │    Backend      │       │   PostgreSQL    │
│  Angular + Nginx│──────▶│  Spring Boot    │──────▶│   Database      │
│  Port: 80       │  /api │  Port: 8080     │       │  Port: 5432     │
└─────────────────┘       └─────────────────┘       └─────────────────┘
        ▲                          ▲
        │  browser requests        │  internal Docker network only
        │                          │
      User                     (Postgres never exposed to browser)
```

- **Frontend** (Nginx) proxies all `/api/*` requests to the backend container. The Angular app only ever talks to `/api` — it never has a direct route to the database.
- **Backend** (Spring Boot) is the sole client of PostgreSQL. It enforces all business rules and JWT authentication.
- **Database** (PostgreSQL) is on the private Docker bridge network and its port is not mapped to the host.

---

## Project Structure

```
blog-app/
├── docker-compose.yml          # Orchestrates all 3 containers
├── README.md
│
├── backend/                    # Spring Boot application
│   ├── Dockerfile              # Multi-stage Maven + JRE build
│   ├── pom.xml
│   └── src/main/java/com/blog/
│       ├── BlogApplication.java
│       ├── DataInitializer.java    # Seeds default admin + categories
│       ├── config/             # SecurityConfig, WebConfig (CORS)
│       ├── controller/         # REST endpoints
│       ├── dto/                # Request/response shapes
│       ├── model/              # JPA entities
│       ├── repository/         # Spring Data JPA interfaces
│       ├── security/           # JWT provider, filter, entry point
│       └── service/            # Business logic
│
└── frontend/                   # Angular application
    ├── Dockerfile              # Multi-stage Node build + Nginx serve
    ├── nginx.conf              # Serves SPA + proxies /api to backend
    ├── angular.json
    ├── package.json
    └── src/app/
        ├── components/         # navbar, blog, article-detail,
        │                       # image-pairs, login, admin
        ├── guards/             # AuthGuard (protects /admin)
        ├── interceptors/       # JwtInterceptor (attaches Bearer token)
        ├── models/             # TypeScript interfaces
        └── services/           # HTTP service wrappers
```

---

## Quick Start

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### Run

```bash
cd blog-app
docker compose up --build
```

The first build downloads Maven/Node dependencies and may take a few minutes.

| Service  | URL                        |
|----------|----------------------------|
| Blog     | http://localhost            |
| API      | http://localhost/api/...   |
| Backend  | http://localhost:8080 (direct, dev only) |

### Default credentials

| Username | Password  |
|----------|-----------|
| `admin`  | `admin123`|

Change these by editing `DataInitializer.java` before the first run, or update the record in the database afterward.

---

## API Reference

All endpoints are under `/api`.

### Auth
| Method | Path            | Auth | Description       |
|--------|-----------------|------|-------------------|
| POST   | /auth/login     | —    | Returns JWT token |

### Categories
| Method | Path               | Auth  | Description        |
|--------|--------------------|-------|--------------------|
| GET    | /categories        | —     | List all           |
| POST   | /categories        | JWT   | Create             |

### Articles
| Method | Path               | Auth  | Description                  |
|--------|--------------------|-------|------------------------------|
| GET    | /articles          | —     | List all (optional ?categoryId=) |
| GET    | /articles/{id}     | —     | Get single article           |
| POST   | /articles          | JWT   | Create                       |
| PUT    | /articles/{id}     | JWT   | Update                       |
| DELETE | /articles/{id}     | JWT   | Delete                       |

### Image Pairs
| Method | Path               | Auth  | Description  |
|--------|--------------------|-------|--------------|
| GET    | /image-pairs       | —     | List all     |
| POST   | /image-pairs       | JWT   | Create       |
| DELETE | /image-pairs/{id}  | JWT   | Delete       |

---

## Environment Variables

These are set in `docker-compose.yml`. Override them for production:

| Variable                   | Default                       | Description              |
|----------------------------|-------------------------------|--------------------------|
| `SPRING_DATASOURCE_URL`    | `jdbc:postgresql://postgres:5432/blogdb` | DB JDBC URL  |
| `SPRING_DATASOURCE_USERNAME` | `bloguser`                  | DB username              |
| `SPRING_DATASOURCE_PASSWORD` | `blogpassword`              | DB password              |
| `JWT_SECRET`               | *(see compose file)*          | **Change in production** |
| `JWT_EXPIRATION`           | `86400000` (24h in ms)        | Token lifetime           |

---

## Development (without Docker)

### Backend
```bash
cd backend
# Requires a local Postgres on port 5432 with blogdb/bloguser/blogpassword
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start   # serves on http://localhost:4200, proxies /api to localhost:8080
```

---

## Security Notes

- Passwords are hashed with BCrypt.
- JWTs are signed with HMAC-SHA256. **Replace `JWT_SECRET` before deploying.**
- The database port (`5432`) is deliberately not exposed to the host in `docker-compose.yml`.
- Admin-only endpoints (`POST/PUT/DELETE`) require a valid `Authorization: Bearer <token>` header.
