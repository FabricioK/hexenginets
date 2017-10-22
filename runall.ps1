param([string]$message = "")
gulp
git add .   
git commit -m $message
npm run release
npm publish