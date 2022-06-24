DIST="mac/SamuwriteNative/Resources/dist"

rm -rf .parcel-cache
rm -rf $DIST

sh scripts/monaco.sh "--dist-dir $DIST"

parcel build --dist-dir $DIST --public-url ./
