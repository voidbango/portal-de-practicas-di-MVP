# Portal de Prácticas DI

Build a comprehensive, modern, and fully interactive React MVP with Tailwind CSS and Lucide icons for the "Portal de Prácticas Departamento de Informática (UTFSM)".

The interface must use Chilean Spanish, realistic USM Computer Engineering student context, and CLP currency. All buttons, tabs, and navigation links MUST be functional with simulated local state (useState/localStorage).

PAGES & ROUTING STRUCTURE:

1. Navigation Bar & Student Header:

- Top branding: "DI Prácticas - UTFSM" with tabs: "Ofertas", "Empresas", "Mis Inscripciones", "Bitácora y Seguimiento", "Mi Perfil".

- Active student profile pill: "Verónica Torres (Ingeniería Civil Informática)".

2. GOAL 1: Offers & Companies (OffersPage.jsx, OfferDetailPage.jsx, CompaniesPage.jsx)

- Offers list with working search & filters: Modalidad (Remoto, Híbrido, Presencial), Remuneración ($400.000 - $800.000 CLP), Rol (Desarrollo Frontend, Backend, Data Science).

- Each offer card displays: Title, Company (e.g. Banco Itaú, BRASS Engineering, Mercado Libre), Location, Stipend in CLP, and an "Afinidad / Match: 95%" badge.

- Clicking an offer opens OfferDetailPage with full job description, requirements, supervisor contact, and an active "Postular a Práctica" button that opens a confirmation toast or modal.

- Companies directory page showing partner companies with their rating and active internships.

3. GOAL 2: Practice Enrollment (EnrollmentPage.jsx, EnrollmentsPage.jsx)

- Form to register/formalize an approved internship:

  * Company name & RUT

  * Supervisor name & email

  * Tipo de práctica: Práctica Industrial (IWI-300 / 360 horas)

  * Start and end dates, modality.

- Submitting the form validates inputs, adds the new practice to the "Mis Inscripciones" list (stored in memory/persistent state), and displays status "Inscrita - En Revisión DI".

4. GOAL 3: Tracking, Logbook & Reports (TrackingPage.jsx, LogbookPage.jsx)

- Tracking dashboard showing progress bar (e.g. "Semana 4 de 8 - 180 / 360 hrs completadas").

- Bitácora (Logbook): List of weekly logs with date, completed tasks, and learnings. Includes an "Agregar Entrada a Bitácora" form with title and description inputs that appends to the list.

- Final Section answering DI academic requirements: "Entrega de Informe Final" and "Evaluación de Supervisor" with upload dropzones and status tags ("Pendiente", "Entregado").

5. Shared Utilities & State:

- Include a realistic mock dataset of practices and offers in a clean data module.

- Smooth transitions, clean university-themed color palette (USM navy blue `#003366`, gold accent, slate gray).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1b0cae51-6ef0-5d6c-9abb-3d062567a5a7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
