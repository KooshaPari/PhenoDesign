.PHONY: build test lint clean

# phenoDesign build targets

build:
	npm install && npm run build

test:
	cargo test

lint:
	cargo clippy -- -D warnings
	cargo fmt --check

clean:
	cargo clean
