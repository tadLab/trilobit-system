#!/usr/bin/env python3
"""
Comprehensive color replacement: amber/orange → navy/light blue
"""

import os
import glob

# Define all amber-to-blue replacements
REPLACEMENTS = {
    'bg-amber-950': 'bg-blue-950',
    'bg-amber-900': 'bg-blue-900',
    'bg-amber-800': 'bg-blue-800',
    'bg-amber-700': 'bg-blue-950',  # Darkest amber -> darkest navy
    'bg-amber-600': 'bg-blue-900',  # Primary CTA
    'bg-amber-500': 'bg-blue-700',
    'bg-amber-400': 'bg-blue-600',
    'bg-amber-300': 'bg-blue-300',
    'bg-amber-200': 'bg-blue-200',
    'bg-amber-100': 'bg-blue-100',
    'bg-amber-50': 'bg-blue-50',
    
    'text-amber-950': 'text-blue-950',
    'text-amber-900': 'text-blue-900',
    'text-amber-800': 'text-blue-950',
    'text-amber-700': 'text-blue-950',
    'text-amber-600': 'text-blue-900',
    'text-amber-500': 'text-blue-700',
    'text-amber-400': 'text-blue-600',
    'text-amber-300': 'text-blue-300',
    'text-amber-200': 'text-blue-200',
    'text-amber-100': 'text-blue-100',
    
    'border-amber-950': 'border-blue-950',
    'border-amber-900': 'border-blue-900',
    'border-amber-800': 'border-blue-800',
    'border-amber-700': 'border-blue-950',
    'border-amber-600': 'border-blue-900',
    'border-amber-500': 'border-blue-700',
    'border-amber-400': 'border-blue-600',
    'border-amber-300': 'border-blue-300',
    'border-amber-200': 'border-blue-200',
    'border-amber-100': 'border-blue-100',
    
    'hover:bg-amber-950': 'hover:bg-blue-950',
    'hover:bg-amber-900': 'hover:bg-blue-950',
    'hover:bg-amber-800': 'hover:bg-blue-900',
    'hover:bg-amber-700': 'hover:bg-blue-950',
    'hover:bg-amber-600': 'hover:bg-blue-900',
    'hover:bg-amber-500': 'hover:bg-blue-800',
    
    'hover:text-amber-950': 'hover:text-blue-950',
    'hover:text-amber-900': 'hover:text-blue-950',
    'hover:text-amber-800': 'hover:text-blue-950',
    'hover:text-amber-700': 'hover:text-blue-900',
    'hover:text-amber-600': 'hover:text-blue-900',
    'hover:text-amber-500': 'hover:text-blue-700',
    
    'hover:border-amber-900': 'hover:border-blue-950',
    'hover:border-amber-800': 'hover:border-blue-900',
    'hover:border-amber-700': 'hover:border-blue-900',
    'hover:border-amber-600': 'hover:border-blue-900',
    'hover:border-amber-500': 'hover:border-blue-700',
    
    'fill-amber-500': 'fill-blue-700',
    'fill-amber-600': 'fill-blue-900',
}

def replace_colors_in_file(filepath):
    """Replace all amber colors with blue/navy in a file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Apply replacements in order (most specific first)
        for old, new in sorted(REPLACEMENTS.items(), key=lambda x: len(x[0]), reverse=True):
            content = content.replace(old, new)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error: {filepath}: {e}")
        return False

def main():
    """Process all .tsx files."""
    files_changed = []
    
    # Get all .tsx files recursively
    tsx_files = glob.glob('**/*.tsx', recursive=True)
    
    for filepath in tsx_files:
        # Skip node_modules and other excluded dirs
        if 'node_modules' in filepath or '.git' in filepath:
            continue
            
        if replace_colors_in_file(filepath):
            files_changed.append(filepath)
            print(f"✓ {filepath}")
    
    print(f"\n{'='*60}")
    print(f"Updated {len(files_changed)} files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
