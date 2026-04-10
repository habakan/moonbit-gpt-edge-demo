.PHONY: build build-mbt build-web dev serve clean

build-mbt:
	moon build --target wasm-gc --release
	cp _build/wasm-gc/release/build/cmd/main/main.wasm web/public/moonbit.wasm
	@echo "MoonBit: web/public/moonbit.wasm ($$(wc -c < web/public/moonbit.wasm | tr -d ' ') bytes)"

build-web:
	cd web && npm install && npm run build

build: build-mbt build-web

dev:
	moon build --target wasm-gc --release
	cp _build/wasm-gc/release/build/cmd/main/main.wasm web/public/moonbit.wasm
	cd web && npm run dev

serve: build
	cd web && npm run preview

clean:
	moon clean
	rm -rf web/dist web/node_modules
