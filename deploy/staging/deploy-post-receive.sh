#!/bin/sh
GITDIR=/home/wpcstage/mymaytag/git/qualifier.git
scp -r post-receive.sh root@205.186.143.194:$GITDIR/hooks/post-receive
ssh root@205.186.143.194 "chmod +x $GITDIR/hooks/post-receive"
ssh root@205.186.143.194 "chown root $GITDIR/hooks/post-receive"