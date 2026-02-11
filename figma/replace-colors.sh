#!/bin/bash
# Script to replace all amber colors with navy/blue

find . -name "*.tsx" -type f -exec sed -i '' \
  -e 's/amber-950/blue-950/g' \
  -e 's/amber-900/blue-900/g' \
  -e 's/amber-800/blue-800/g' \
  -e 's/amber-700/blue-950/g' \
  -e 's/amber-600/blue-900/g' \
  -e 's/amber-500/blue-700/g' \
  -e 's/amber-400/blue-600/g' \
  -e 's/amber-300/blue-300/g' \
  -e 's/amber-200/blue-200/g' \
  -e 's/amber-100/blue-100/g' \
  -e 's/amber-50/blue-50/g' \
  {} +
