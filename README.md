# GDE MIT Hackathon entry

## Team

Timea Subicz, Mate Subicz, Benjamin Tako

## Get started - dev

- clone repo

- one terminal - client, frontend
  - `cd frontend`
  - `pnpm install` and `pnpm dev`
  - if no pnpm yet: install node -> install pnpm with npm

- other terminal - server, backend
  - `cd backend`
  - On first install:
    - create virtual env for packages: `python -m venv .venv`.
    - download required packages with `pip install fastapi uvicorn` (and everything else that comes up at runtime)
  - Then activate venv: for bash terminal: `source ./.venv/Scripts/activate` (or on older versions "source ./.venv/bin/activate"), for powershell terminal: `.venv\Scripts\Activate.ps1`
  - check if you have done it correctly: bash style: `which python`, powershell style: `Get-Command python` => You should see that python is ran from .venv folder
  - run `uvicorn main:app --reload`

## Deploy - prod

1. Change .env in frontend to PROD
1. Change main.py to PROD
1. build frontend with `pnpm run build`
1. run backend with `uvicorn main:app --host 0.0.0.0 --port 8000`
1. deploy with `ngrok http 8000`

### Auto-terminal initialization

After you have succesfully ran the app manually and have all the stuff required, download the **Terminal Keeper** extension that uses `sessions.json`, it will load up all the required terminals for you automatically and start both the frontend and backend when you open the project.
