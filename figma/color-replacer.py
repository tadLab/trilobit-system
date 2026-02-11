#!/usr/bin/env python3
"""
Replace all amber colors with blue/navy theme throughout the codebase.
"""

import os
import re

# Color mapping from amber to blue/navy
REPLACEMENTS = [
    ('amber-950', 'blue-950'),
    ('amber-900', 'blue-900'),
    ('amber-800', 'blue-800'),
    ('amber-700', 'blue-950'),  # Darkest amber -> darkest navy
    ('amber-600', 'blue-900'),  # Primary amber -> primary navy
    ('amber-500', 'blue-700'),  # Medium amber -> medium navy
    ('amber-400', 'blue-600'),
    ('amber-300', 'blue-300'),
    ('amber-200', 'blue-200'),
    ('amber-100', 'blue-100'),
    ('amber-50', 'blue-50'),
]

def replace_colors_in_file(filepath):
    """Replace amber colors with blue in a single file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all replacements
        for old_color, new_color in REPLACEMENTS:
            content = content.replace(old_color, new_color)
        
        # Only write if changes were made
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    """Process all .tsx files in the current directory and subdirectories."""
    changed_files = []
    
    for root, dirs, files in os.walk('.'):
        # Skip node_modules and other common excluded directories
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'dist', 'build']]
        
        for file in files:
            if file.endswith('.tsx'):
                filepath = os.path.join(root, file)
                if replace_colors_in_file(filepath):
                    changed_files.append(filepath)
                    print(f"✓ Updated: {filepath}")
    
    print(f"\n{'='*60}")
    print(f"Total files updated: {len(changed_files)}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
