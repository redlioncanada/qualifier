#!/bin/sh
# Qualifier deploy script, requires git, npm, bower, and gulp to be installed globally
read oldrev newrev refname

DEPLOYDIR=/home/maytabsubs/qualifier
TESTDIR=/home/maytagsubs/qualifier/test
ENGLISHDIR=/en
FRENCHDIR=/fr

GITDIR=$(pwd)
LOG=./post-receive.log
VERSION="$(git describe --abbrev=0 --tags)"
VERSIONREGEX = "^v?(\d+\.)?(\d+\.)?(\*|\d+)$"

echo -e "Received Push Request at $( date +%F )" >> $LOGFILE
echo "Old SHA: $oldrev New SHA: $newrev Branch Name: $refname" >> $LOGFILE
echo "Starting Deploy" >> $LOGFILE

if [[$VERSION =~ $VERSIONREGEX]]; then
	#is a valid version number
	echo "- Starting Code Update & Compilation" >> $LOGFILE
	mkdir temp
	GIT_WORK_TREE="./temp" git checkout -f
	echo "- Finished Git Checkout" >> $LOGFILE
	cd temp

	echo "- Updating Dependencies" >> $LOGFILE
	bower install
	echo "-- Finished bower install" >> $LOGFILE
	npm install
	echo "-- Finished npm install" >> $LOGFILE
	echo "- Finished updating Dependencies" >> $LOGFILE

	echo "- Compiling" >> $LOGFILE
	gulp
	echo "- Finished Update & Compilation" >> $LOGFILE

	echo "- Copying to test directory" >> $LOGFILE
	mkdir $TESTDIR
	mkdir $TESTDIR$ENGLISHDIR
	mkdir $TESTDIR$FRENCHDIR
	cp -a /build/. $TESTDIR$ENGLISHDIR/
	cp -a /build/. $TESTDIR$FRENCHDIR/
	cp /build/fr/. $TESTDIR$FRENCHDIR/
	echo "- Finished copying" >> $LOGFILE

	echo "Please verify the build at $TESTDIR. Continue?"
	read cont

	if [[ "$cont" == "y" || "$cont" == "yes"]]; then
		#cp -a /build/. $DEPLOYDIR$ENGLISHDIR/
		#cp -a /build/. $DEPLOYDIR$FRENCHDIR/
		#cp -a /build/fr/. $DEPLOYDIR$FRENCHDIR/
		echo "- Finished deploy" >> $LOGFILE
	else
		GIT_WORK_TREE=$GITDIR git checkout $oldrev
		echo "- Abandoned deploy due to user input" >> $LOGFILE
	fi

	echo "- Cleaning up" >> $LOGFILE
	rm -rf $TESTDIR
	rm -rf $GITDIR/temp
	echo "- Complete" >> $LOGFILE
else
	echo "- Abandoned deploy, $VERSION is not a valid version tag" >> $LOGFILE
fi