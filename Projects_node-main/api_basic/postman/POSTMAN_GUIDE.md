# Guía de Rutas API - Postman

**Base URL:** `http://localhost:3000/api_v1`

---

## MÓDULOS (module)

| Método | Endpoint | Descripción | Body (JSON) |
|--------|----------|-------------|-------------|
| GET | `/module` | Obtener todos los módulos | - |
| POST | `/module` | Crear módulo | `{"name": "Dashboard", "description": "Main dashboard", "route": "dashboard", "icon": "bi-speedometer", "submodule": 0, "parentModule": null}` |
| GET | `/module/:id` | Obtener módulo por ID | - |
| PUT | `/module/:id` | Actualizar módulo | `{"name": "Dashboard", "description": "Updated", "route": "dashboard", "icon": "bi-speedometer", "submodule": 0, "parentModule": null}` |
| DELETE | `/module/:id` | Eliminar módulo | - |

### Ejemplo POST:
```
POST http://localhost:3000/api_v1/module
Content-Type: application/json

{
    "name": "Dashboard",
    "description": "Main dashboard",
    "route": "dashboard",
    "icon": "bi-speedometer",
    "submodule": 0,
    "parentModule": null
}
```

---

## ROLE MODULE (rolo_module)

| Método | Endpoint | Descripción | Body (JSON) |
|--------|----------|-------------|-------------|
| GET | `/rolo_module` | Obtener todos los role_modules | - |
| POST | `/rolo_module` | Crear role_module | `{"modulesFk": 1, "rolesFk": 1}` |
| GET | `/rolo_module/:id` | Obtener role_module por ID | - |
| PUT | `/rolo_module/:id` | Actualizar role_module | `{"modulesFk": 2, "rolesFk": 1}` |
| DELETE | `/rolo_module/:id` | Eliminar role_module | - |
| GET | `/rolo_module/role/:id` | Obtener módulos por rol | - |

### Ejemplo POST:
```
POST http://localhost:3000/api_v1/rolo_module
Content-Type: application/json

{
    "modulesFk": 1,
    "rolesFk": 1
}
```

### Ejemplo GET by Role:
```
GET http://localhost:3000/api_v1/rolo_module/role/1
```

---

## PERFIL (profile)

| Método | Endpoint | Descripción | Body (JSON) |
|--------|----------|-------------|-------------|
| GET | `/perfil` | Obtener todos los perfiles | - |
| POST | `/perfil` | Crear perfil | `{"name": "Admin", "description": "Administrator"}` |
| GET | `/perfil/:id` | Obtener perfil por ID | - |
| PUT | `/perfil/:id` | Actualizar perfil | `{"name": "Admin", "description": "Updated"}` |
| DELETE | `/perfil/:id` | Eliminar perfil | - |

### Ejemplo GET All:
```
GET http://localhost:3000/api_v1/perfil
```

### Ejemplo POST:
```
POST http://localhost:3000/api_v1/perfil
Content-Type: application/json

{
    "name": "Admin",
    "description": "Administrator profile"
}
```

### Ejemplo GET by ID:
```
GET http://localhost:3000/api_v1/perfil/1
```

### Ejemplo PUT (Actualizar):
```
PUT http://localhost:3000/api_v1/perfil/1
Content-Type: application/json

{
    "name": "Admin",
    "description": "Updated description"
}
```

### Ejemplo DELETE:
```
DELETE http://localhost:3000/api_v1/perfil/1
```

---

## RUTAS EXISTENTES DEL PROYECTO

### USERS (user)
| Método | Endpoint |
|--------|----------|
| GET | `/user` |
| POST | `/user` |
| GET | `/user/:id` |
| PUT | `/user/:id` |
| DELETE | `/user/:id` |

### USER STATUS
| Método | Endpoint |
|--------|----------|
| GET | `/userStatus` |
| POST | `/userStatus` |
| GET | `/userStatus/:id` |
| PUT | `/userStatus/:id` |
| DELETE | `/userStatus/:id` |

### ROLES
| Método | Endpoint |
|--------|----------|
| GET | `/role` |
| POST | `/role` |
| GET | `/role/:id` |
| PUT | `/role/:id` |
| DELETE | `/role/:id` |

### API USERS
| Método | Endpoint |
|--------|----------|
| GET | `/apiUser` |
| POST | `/apiUser` |
| GET | `/apiUser/:id` |
| PUT | `/apiUser/:id` |
| DELETE | `/apiUser/:id` |
