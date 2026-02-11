#!/bin/bash
# Comprehensive color replacement script for all .tsx files

# Find all .tsx files and replace amber with blue colors
find . -name "*.tsx" -type f -not -path "./node_modules/*" -not -path "./.git/*" | while read file; do
    # Create backup
    # cp "$file" "$file.bak"
    
    # Perform replacements (most specific first)
    sed -i '' \
        -e 's/bg-amber-950/bg-blue-950/g' \
        -e 's/bg-amber-900/bg-blue-900/g' \
        -e 's/bg-amber-800/bg-blue-800/g' \
        -e 's/bg-amber-700/bg-blue-950/g' \
        -e 's/bg-amber-600/bg-blue-900/g' \
        -e 's/bg-amber-500/bg-blue-700/g' \
        -e 's/bg-amber-400/bg-blue-600/g' \
        -e 's/bg-amber-300/bg-blue-300/g' \
        -e 's/bg-amber-200/bg-blue-200/g' \
        -e 's/bg-amber-100/bg-blue-100/g' \
        -e 's/bg-amber-50/bg-blue-50/g' \
        -e 's/text-amber-950/text-blue-950/g' \
        -e 's/text-amber-900/text-blue-950/g' \
        -e 's/text-amber-800/text-blue-950/g' \
        -e 's/text-amber-700/text-blue-950/g' \
        -e 's/text-amber-600/text-blue-900/g' \
        -e 's/text-amber-500/text-blue-700/g' \
        -e 's/border-amber-950/border-blue-950/g' \
        -e 's/border-amber-900/border-blue-900/g' \
        -e 's/border-amber-800/border-blue-800/g' \
        -e 's/border-amber-700/border-blue-950/g' \
        -e 's/border-amber-600/border-blue-900/g' \
        -e 's/border-amber-500/border-blue-700/g' \
        -e 's/border-amber-400/border-blue-600/g' \
        -e 's/border-amber-300/border-blue-300/g' \
        -e 's/border-amber-200/border-blue-200/g' \
        -e 's/border-amber-100/border-blue-100/g' \
        -e 's/hover:bg-amber-950/hover:bg-blue-950/g' \
        -e 's/hover:bg-amber-900/hover:bg-blue-950/g' \
        -e 's/hover:bg-amber-800/hover:bg-blue-900/g' \
        -e 's/hover:bg-amber-700/hover:bg-blue-950/g' \
        -e 's/hover:bg-amber-600/hover:bg-blue-900/g' \
        -e 's/hover:bg-amber-500/hover:bg-blue-800/g' \
        -e 's/hover:text-amber-950/hover:text-blue-950/g' \
        -e 's/hover:text-amber-900/hover:text-blue-950/g' \
        -e 's/hover:text-amber-800/hover:text-blue-950/g' \
        -e 's/hover:text-amber-700/hover:text-blue-900/g' \
        -e 's/hover:text-amber-600/hover:text-blue-900/g' \
        -e 's/hover:text-amber-500/hover:text-blue-700/g' \
        -e 's/hover:border-amber-950/hover:border-blue-950/g' \
        -e 's/hover:border-amber-900/hover:border-blue-950/g' \
        -e 's/hover:border-amber-800/hover:border-blue-900/g' \
        -e 's/hover:border-amber-700/hover:border-blue-900/g' \
        -e 's/hover:border-amber-600/hover:border-blue-900/g' \
        -e 's/hover:border-amber-500/hover:border-blue-700/g' \
        -e 's/focus:border-amber-600/focus:border-blue-900/g' \
        -e 's/focus:ring-amber-600\/20/focus:ring-blue-900\/20/g' \
        -e 's/focus:ring-amber-600/focus:ring-blue-900/g' \
        -e 's/fill-amber-500/fill-blue-700/g' \
        -e 's/fill-amber-600/fill-blue-900/g' \
        -e 's/from-amber-50/from-blue-50/g' \
        -e 's/from-amber-100/from-blue-100/g' \
        "$file"
        
    echo "Updated: $file"
done

echo "Color replacement complete!"
