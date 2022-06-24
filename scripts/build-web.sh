rm -rf .parcel-cache
rm -rf dist

sh scripts/monaco.sh

parcel build
