# React + Fastapi template

## Description

This is a template with React and Fastapi with basic communication.

## Get started

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
  - Then activate venv: for bash terminal: `source ./.venv/Scripts/activate`, for powershell terminal: `.venv\Scripts\Activate.ps1`
  - check if you have done it correctly: bash style: `which python`, powershell style: `Get-Command python` => You should see that python is ran from .venv folder
  - run `uvicorn main:app --reload`

### Auto-terminal initialization

After you have succesfully ran the app manually and have all the stuff required, download the **Terminal Keeper** extension that uses `sessions.json`, it will load up all the required terminals for you automatically and start both the frontend and backend when you open the project.
