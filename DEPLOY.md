# Deployment Guide

This document explains how to deploy the Throwlab full stack application (backend and frontend) on hosted services.

## Prerequisites

- A GitHub repository containing the project code (this repo).
- Accounts on [Railway](https://railway.app/) and [Vercel](https://vercel.com/).

## Deploy the Backend on Railway

1. Log in to your Railway account.
2. Click **New Project** and choose to deploy from GitHub.
3. Select this repository and set the root directory to `backend`.
4. On the **Variables** or **Settings** page, ensure that FFmpeg is installed by adding it as a Railway plugin or using a build command if needed.
5. Deploy the project. Railway will build the Dockerfile and run the FastAPI application.
6. Once deployed, note the **public URL** of your Railway service (e.g. `https://<your-backend>.up.railway.app`). You will use this as the API base URL.

## Deploy the Frontend on Vercel

1. Log in to your Vercel account.
2. Click **Add New** → **Project** and import this GitHub repository.
3. When prompted for the project root, select the `frontend` folder.
4. Set the following environment variable:
   - `NEXT_PUBLIC_THROWLAB_API_BASE` → the public Railway URL from the backend deployment.
5. Deploy the project. Vercel will install dependencies and build the Next.js application.
6. After deployment, you will receive a Vercel URL (e.g. `https://your-site.vercel.app`). This is your live website for uploading and analyzing videos.

## Additional Notes

- Keep your Railway and Vercel projects private if your code or uploads contain sensitive content.
- You can replace the placeholder API in `backend/app/main.py` with the real analysis logic when ready.
- For production use, configure domain names and SSL via the hosting providers.
