#!/bin/sh
# Qualifier deploy script, requires git, npm, bower, and gulp to be installed globally
read oldrev newrev refname

DEPLOYDIR=/home/wpcstage/mymaytag
ENGLISHDIR=/en
FRENCHDIR=/fr

GITDIR=$(pwd)
LOGFILE=$GITDIR/post-receive.log
VERSION="$(git describe --abbrev=0 --tags)"


echo -e "Received Push Request at $( date +%F )" >> $LOGFILE
echo "Old SHA: $oldrev New SHA: $newrev Branch Name: $refname" >> $LOGFILE
echo "Starting Deploy on $VERSION" >> $LOGFILE

#if [[$VERSION =~ "^v?(\d+\.)?(\d+\.)?(\*|\d+)$"]]; then
	#is a valid version number
	echo "- Starting Code Update & Compilation" >> $LOGFILE
	mkdir temp
	GIT_WORK_TREE="$GITDIR/temp" git checkout -f
	echo "- Finished Git Checkout" >> $LOGFILE
	cd $GITDIR/temp

	echo "- Updating Dependencies" >> $LOGFILE
	bower --allow-root install
	echo "-- Finished bower install" >> $LOGFILE
	npm install
	echo "-- Finished npm install" >> $LOGFILE
	echo "- Finished updating Dependencies" >> $LOGFILE

	echo "- Compiling" >> $LOGFILE
	gulp deploy
	echo "- Finished Update & Compilation" >> $LOGFILE

	echo "- Copying files" >> $LOGFILE
	cp -a $GITDIR/temp/build/. $DEPLOYDIR/$VERSION$ENGLISHDIR/
	cp -a $GITDIR/temp/build/. $DEPLOYDIR/$VERSION$FRENCHDIR/
	cp -a $GITDIR/temp/build/fr/. $DEPLOYDIR/$VERSION$FRENCHDIR/
	chown -R wpcstage:wpcstage $DEPLOYDIR/$VERSION$FRENCHDIR/
	chown -R wpcstage:wpcstage $DEPLOYDIR/$VERSION$ENGLISHDIR/
	echo "- Complete" >> $LOGFILE
#else
#	echo "- Abandoned deploy, $VERSION is not a valid version tag" >> $LOGFILE
#fi