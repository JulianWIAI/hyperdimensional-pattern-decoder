"""
main.py — Hyperdimensional Pattern Decoder
Entry point: initialises FastAPI and delegates all routes to hd_engine.
Kept intentionally minimal (<30 lines) per Clean Architecture principles.
"""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from hd_engine.routes import router

app = FastAPI(
    title="Hyperdimensional Pattern Decoder API",
    description="Steganographic dimensional analysis engine — Kaluza-Klein framework.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

# Serve the compiled React frontend after running `npm run build` in /frontend
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="static")

if __name__ == "__main__":
    # 127.0.0.1 for local dev — Windows browsers cannot connect to 0.0.0.0.
    # Switch to 0.0.0.0 only when deploying to a server that needs LAN/WAN access.
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
