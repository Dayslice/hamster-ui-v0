FROM mcr.microsoft.com/playwright:v1.37.1-focal AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV FRONTEND_URL="http://sveltekit:3000"
ENV NODE_ENV="test"

RUN corepack enable
# Copy only the pnpm files
COPY . ./app
WORKDIR /app
# Install dependencies in the Docker container
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS nestjs
WORKDIR /app/packages/nestjs
EXPOSE 3001
# CMD [ "pnpm", "start:dev" ]

FROM base AS sveltekit
WORKDIR /app/packages/sveltekit
EXPOSE 3000
CMD [ "pnpm", "dev" ]

FROM base AS playwright
WORKDIR /app/packages/playwright
RUN ls
CMD [ "pnpm", "exec", "playwright", "test" ]

