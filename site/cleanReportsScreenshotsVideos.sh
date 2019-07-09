#!/usr/bin/env bash

function coloredEcho() {
    local exp=$1;
    local color=$2;
    if ! [[ ${color} =~ '^[0-9]$' ]] ; then
       case $(echo ${color} | tr '[:upper:]' '[:lower:]') in
        black) color=0 ;;
        red) color=1 ;;
        green) color=2 ;;
        yellow) color=3 ;;
        blue) color=4 ;;
        magenta) color=5 ;;
        cyan) color=6 ;;
        white|*) color=7 ;; # white or invalid color
       esac
    fi
    tput setaf ${color};
    echo ${exp};
    tput sgr0;
}

function clearReportsScreenshotsVideos() {
    mochawesomeDirectory=mochawesome-report
    screenshotsDirectory=cypress/screenshots
    videosDirectory=cypress/videos

    array=( $mochawesomeDirectory $screenshotsDirectory $videosDirectory )
    for f in "${array[@]}"; do
        if [ -d $f ]
        then
            coloredEcho "---------------------------" green
            rm -rf -v $f
        elif [ ! -d $f ]
        then
            coloredEcho "---------------------------" cyan
            coloredEcho "$f directory doesn't exist." cyan
        fi
    done
    rm mochawesome.json
}

clearReportsScreenshotsVideos