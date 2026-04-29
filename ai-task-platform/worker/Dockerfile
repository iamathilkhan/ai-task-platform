# Stage 1: builder
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: final image
FROM python:3.11-slim
WORKDIR /app
RUN addgroup --system appgroup && adduser --system --group appuser
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY worker.py .
USER appuser
CMD ["python", "worker.py"]
