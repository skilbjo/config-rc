SHELL := bash
MAKEFLAGS += --warn-undefined-variables

.DELETE_ON_ERROR:

.DEFAULT_GOAL := ci
is_ci := $(shell if [ ! -z "$(CODEBUILD_BUILD_ARN)" ] || [ ! -z "$(GITHUB_ACTIONS)" ]; then echo 'true'; else echo 'false'; fi)
git_sha := $(shell if [ ! -z "$(CODEBUILD_RESOLVED_SOURCE_VERSION)" ]; then echo "$(CODEBUILD_RESOLVED_SOURCE_VERSION)"; else git rev-parse --short HEAD; fi)

very-clean: clean
	rm -rf dist target node_modules/ package-lock.json
.PHONY: very-clean

clean:
	rm -rf dist target/lint
.PHONY: clean

install: | target/install
target/install:
ifeq ($(is_ci), true)
	# https://github.com/infctr/eslint-plugin-typescript-sort-keys/issues/77
	npm ci --force
else
	# https://github.com/infctr/eslint-plugin-typescript-sort-keys/issues/77
	npm install --force
endif
	mkdir -p $(@D) && touch $@
.PHONY: install

lint: | install target/lint
target/lint:
	npm run lint
	npm run depcheck
	mkdir -p $(@D) && touch $@
.PHONY: lint

# --- ci

ci: | install lint
.PHONY: ci
