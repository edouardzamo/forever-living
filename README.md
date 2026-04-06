# Forever Living

This repository is organized as a fullstack app with two main folders:

- `frontend/` — React + Vite application
- `Backend/` — FastAPI backend

## Frontend

The React app lives in `frontend/`.

Install and run it from that folder:

```bash
cd frontend
npm install
npm run dev
```

Build for production:

```bash
cd frontend
npm run build
```

## Backend

The Python backend lives in `Backend/`.

Install dependencies and run it from that folder:

```bash
cd Backend
pip install -r requirements.txt
python main.py
```

## Git

This repository is already initialized as a Git repo. Keep your changes in the repository root and commit from there.

```bash
git status
git add .
git commit -m "Move frontend into frontend/ folder"
git push
```

## Notes

- The root `.gitignore` already covers `node_modules`, `dist`, and editor files.
- Keep `Backend/` and `frontend/` separate so backend and frontend dependencies do not conflict.
