param([string]$message = "")
gulp
git add .   
git commit -m $message
npm run release
git push --follow-tags origin master; 
npm publish