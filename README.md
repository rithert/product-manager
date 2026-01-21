# Product Manager (CRUD)

Módulo simple de **gestión de productos** (CRUD) construido con **React + TypeScript**, siguiendo una arquitectura por módulos y buenas prácticas.

## Tecnologías

- React 18 + TypeScript
- TanStack Router (navegación)
- TanStack Query (manejo de datos)
- React Hook Form + Zod (formularios y validación)
- Zustand (estado global, si aplica)
- Axios (capa API)
- Tailwind CSS (estilos)
- React Toastify (notificaciones)

## Funcionalidades

- Listado de productos en tabla
- Filtros por:
    - nombre (búsqueda)
    - categoría
    - estado (activo/inactivo)
- Acciones:
    - ver detalle
    - editar
    - eliminar (con confirmación)
- Crear / editar producto con validaciones (React Hook Form + Zod)
- Navegación entre páginas con TanStack Router
- Datos simulados (mock) desde una capa `api`

## Requisitos

- Node.js 18+ (recomendado)
- npm 9+ (o equivalente)

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Luego abre:

- `http://localhost:5173/` (puede variar según el puerto disponible)

## Estructura del proyecto (resumen)

```text
src/
  lib/
    api.ts                          # API simulada (mock)
  modules/
    products/
      components/
        ProductForm.tsx
        ProductFilters.tsx
        ProductTable.tsx
      hooks/
        userProducts.ts
      pages/
        ProductList.tsx
        ProductCreate.tsx
        ProductEdit.tsx
        ProductDetail.tsx
      schema/
        product.schema.ts           # Zod schema + ProductFormData
      types/
        index.ts
  routes/
    __root.tsx                      # Layout principal (Outlet)
  App.tsx                           # Árbol de rutas (TanStack Router)
  main.tsx                          # Entry
  index.css                         # Tailwind + estilos base
```

## Rutas

- `/` → Lista de productos
- `/nuevo` → Crear producto
- `/productos/:id` → Detalle de producto
- `/productos/:id/editar` → Editar producto

## Scripts

- `npm run dev` → desarrollo
- `npm run build` → build de producción
- `npm run preview` → previsualización del build
- `npm run lint` → lint (si está configurado)

## Notas

- La “API” está simulada (mock) para facilitar la prueba, pero mantiene una interfaz similar a una real.
- Validaciones del formulario se realizan con **Zod** y se integran a RHF con `@hookform/resolvers`.

## Checklist de la prueba (referencia)

- [x] CRUD básico
- [x] Filtros
- [x] Validación de formulario
- [x] Navegación entre páginas
- [x] Integración con datos simulados
- [x] UI minimalista con Tailwind

---

© 2026 Product Manager
