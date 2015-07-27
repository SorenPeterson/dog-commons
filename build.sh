echo y | rm -rf devbuild/*
cd app
meteor build ../devbuild --server=http://nbt.otterhive.com
cd ../devbuild
open ./ios/project/*.xcodeproj
