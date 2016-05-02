FROM ubuntu
RUN git clone git@github.com:SorenPeterson/dog-commons.git
RUN git pull origin master
RUN echo y | rm -rf devbuild/*
RUN cd app
RUN meteor build ../devbuild --server=http://0.0.0.0:80/
RUN cd ../devbuild
RUN open ./ios/project/*.xcodeproj
