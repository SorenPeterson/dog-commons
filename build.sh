git pull origin master
echo y | rm -rf devbuild/*
cd app
meteor build ../devbuild --server=http://dog-commons.otterhive.com:80/
cd ../devbuild
open ./ios/project/*.xcodeproj
