git pull origin master
echo y | rm -rf devbuild/*
cd app
meteor build ../devbuild --server=http://0.0.0.0:80/
cd ../devbuild
open ./ios/project/*.xcodeproj
