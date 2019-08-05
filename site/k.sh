echo "run started"
c() {
	npm run e2e
}
trap "c" ERR
echo "done"
