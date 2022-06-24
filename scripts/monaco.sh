# Parcel's multi-target build places different targets into different folders
# based on source path but we want the workers to be built into same folder
# with the app so we need to build them at different builds

ROOT=$PWD/node_modules/monaco-editor/esm/vs

# Parcel options - See: https://parceljs.org/cli.html
OPTS="--no-source-maps $1"

# Samuwrite deals with Markdown mainly
parcel build $ROOT/editor/editor.worker.js $OPTS
