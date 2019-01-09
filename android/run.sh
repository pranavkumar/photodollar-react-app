#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n app.photodollar.photodollar/host.exp.exponent.MainActivity
