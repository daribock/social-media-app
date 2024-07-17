.DEFAULT_GOAL := build

help: ## Show all Makefile targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

lint: ## Lint Codebase
	sh scripts/lint.sh

build: ## Build container image
	podman build -t mongodb .

serve-mongodb: ## Serve container image proco-docs with attached volume
	podman run --rm --name mongodb -d -p 27017:27017 mongodb