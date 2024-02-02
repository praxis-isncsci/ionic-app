#!/bin/zsh

# fail if any command fails

echo "🧩 Stage: Post-clone is activated .... "

set -e
# debug log
set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE

# Install dependencies using Homebrew. This is MUST! Do not delete.
brew install node yarn cocoapods fastlane
brew install node@18
brew link --overwrite node@18

# Install yarn and pods dependencies.
# If you're using Flutter or Swift 
# just install pods by "pod install" command 
ls && cd .. && yarn && pod install

# Install dependencies with NPM
npm config set maxsockets 3
npm ci
# or `pnpm install --frozen-lockfile` or `yarn install --frozen-lockfile` or bun install
npm run build
# or npm run build
npm run sync:ios

echo "🎯 Stage: Post-clone is done .... "

exit 0
