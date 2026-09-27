# Makefile for QwenCore DevOps tasks
# Author: donny-devops
# Usage: make <target>

.PHONY: help install dev build test clean docker-build docker-run docker-push deploy-vercel deploy-netlify lint typecheck audit security-scan

# Variables
APP_NAME := qwencore
VERSION := $(shell node -p "require('./package.json').version")
DOCKER_IMAGE := donnydevops/$(APP_NAME)
NODE_VERSION := 20

# Colors for output
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

# ==============================================================================
# HELP
# ==============================================================================

help: ## Show this help message
	@echo "$(GREEN)QwenCore DevOps Makefile$(NC)"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

# ==============================================================================
# DEVELOPMENT
# ==============================================================================

install: ## Install dependencies
	@echo "$(GREEN)Installing dependencies...$(NC)"
	npm ci

dev: ## Start development server
	@echo "$(GREEN)Starting development server...$(NC)"
	npm run dev

build: ## Build for production
	@echo "$(GREEN)Building for production...$(NC)"
	npm run build

test: ## Run tests
	@echo "$(GREEN)Running tests...$(NC)"
	npm run typecheck

clean: ## Clean build artifacts
	@echo "$(GREEN)Cleaning build artifacts...$(NC)"
	rm -rf dist node_modules .cache

# ==============================================================================
# QUALITY
# ==============================================================================

lint: ## Run linter
	@echo "$(GREEN)Running linter...$(NC)"
	npm run lint || echo "Lint command not configured"

typecheck: ## Run TypeScript type checking
	@echo "$(GREEN)Running type check...$(NC)"
	npm run typecheck

audit: ## Run npm audit
	@echo "$(GREEN)Running security audit...$(NC)"
	npm audit

security-scan: ## Run comprehensive security scan
	@echo "$(GREEN)Running security scan...$(NC)"
	npm audit --audit-level=moderate
	@echo "$(YELLOW)Checking for secrets...$(NC)"
	@which trufflehog > /dev/null && trufflehog filesystem . --only-verified || echo "TruffleHog not installed"

# ==============================================================================
# DOCKER
# ==============================================================================

docker-build: ## Build Docker image
	@echo "$(GREEN)Building Docker image...$(NC)"
	docker build -t $(DOCKER_IMAGE):latest -t $(DOCKER_IMAGE):$(VERSION) .

docker-build-dev: ## Build development Docker image
	@echo "$(GREEN)Building development Docker image...$(NC)"
	docker build --target development -t $(DOCKER_IMAGE):dev .

docker-run: ## Run Docker container
	@echo "$(GREEN)Running Docker container...$(NC)"
	docker run -d -p 8080:80 --name $(APP_NAME) $(DOCKER_IMAGE):latest

docker-run-dev: ## Run development Docker container
	@echo "$(GREEN)Running development Docker container...$(NC)"
	docker run -d -p 5173:5173 -v $(PWD):/app --name $(APP_NAME)-dev $(DOCKER_IMAGE):dev

docker-stop: ## Stop Docker container
	@echo "$(GREEN)Stopping Docker container...$(NC)"
	docker stop $(APP_NAME) || true
	docker rm $(APP_NAME) || true

docker-logs: ## View Docker logs
	docker logs -f $(APP_NAME)

docker-push: ## Push Docker image to registry
	@echo "$(GREEN)Pushing Docker image...$(NC)"
	docker push $(DOCKER_IMAGE):latest
	docker push $(DOCKER_IMAGE):$(VERSION)

docker-compose-up: ## Start with Docker Compose
	@echo "$(GREEN)Starting with Docker Compose...$(NC)"
	docker-compose up -d

docker-compose-down: ## Stop Docker Compose
	@echo "$(GREEN)Stopping Docker Compose...$(NC)"
	docker-compose down

# ==============================================================================
# DEPLOYMENT
# ==============================================================================

deploy-vercel: ## Deploy to Vercel
	@echo "$(GREEN)Deploying to Vercel...$(NC)"
	vercel --prod

deploy-netlify: ## Deploy to Netlify
	@echo "$(GREEN)Deploying to Netlify...$(NC)"
	netlify deploy --prod

deploy-preview: ## Deploy preview to Vercel
	@echo "$(GREEN)Deploying preview...$(NC)"
	vercel

# ==============================================================================
# VERSIONING
# ==============================================================================

version-patch: ## Bump patch version
	@echo "$(GREEN)Bumping patch version...$(NC)"
	npm version patch

version-minor: ## Bump minor version
	@echo "$(GREEN)Bumping minor version...$(NC)"
	npm version minor

version-major: ## Bump major version
	@echo "$(GREEN)Bumping major version...$(NC)"
	npm version major

# ==============================================================================
# CI/CD
# ==============================================================================

ci-local: ## Run CI pipeline locally
	@echo "$(GREEN)Running CI pipeline locally...$(NC)"
	@echo "$(YELLOW)Step 1: Install$(NC)"
	npm ci
	@echo "$(YELLOW)Step 2: Type check$(NC)"
	npm run typecheck
	@echo "$(YELLOW)Step 3: Build$(NC)"
	npm run build
	@echo "$(YELLOW)Step 4: Security audit$(NC)"
	npm audit --audit-level=moderate || true
	@echo "$(GREEN)CI pipeline complete!$(NC)"

# ==============================================================================
# UTILITIES
# ==============================================================================

info: ## Show project information
	@echo "$(GREEN)QwenCore Project Info$(NC)"
	@echo "Version: $(VERSION)"
	@echo "Node Version: $(NODE_VERSION)"
	@echo "Docker Image: $(DOCKER_IMAGE)"
	@echo ""
	@echo "$(YELLOW)Package Info:$(NC)"
	@node -p "const p = require('./package.json'); \`Name: \${p.name}\nVersion: \${p.version}\nDescription: \${p.description}\`"

check-deps: ## Check for outdated dependencies
	@echo "$(GREEN)Checking for outdated dependencies...$(NC)"
	npm outdated

update-deps: ## Update dependencies
	@echo "$(GREEN)Updating dependencies...$(NC)"
	npm update

# ==============================================================================
# DOCUMENTATION
# ==============================================================================

docs: ## Generate documentation
	@echo "$(GREEN)Documentation is maintained manually$(NC)"
	@echo "See: README.md, DEVOPS.md, ARCHITECTURE.md"

# ==============================================================================
# CLEANUP
# ==============================================================================

clean-all: ## Clean everything
	@echo "$(GREEN)Cleaning everything...$(NC)"
	rm -rf dist node_modules .cache .vercel .netlify
	docker-compose down -v || true
	docker system prune -f

reset: ## Reset project to fresh state
	@echo "$(YELLOW)Warning: This will remove all build artifacts and dependencies$(NC)"
	@read -p "Are you sure? [y/N] " confirm && [ $$confirm = "y" ] || exit 1
	$(MAKE) clean-all
	$(MAKE) install
