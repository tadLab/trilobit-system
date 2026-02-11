#!/usr/bin/env python3
"""
Complete all amber → blue color replacements across entire codebase
"""

import os
import glob

# Comprehensive color mapping
REPLACEMENTS = [
    # Background colors
    ('bg-amber-950', 'bg-blue-950'),
    ('bg-amber-900', 'bg-blue-900'),
    ('bg-amber-800', 'bg-blue-800'),
    ('bg-amber-700', 'bg-blue-950'),
    ('bg-amber-600', 'bg-blue-900'),
    ('bg-amber-500', 'bg-blue-700'),
    ('bg-amber-400', 'bg-blue-600'),
    ('bg-amber-300', 'bg-blue-300'),
    ('bg-amber-200', 'bg-blue-200'),
    ('bg-amber-100', 'bg-blue-100'),
    ('bg-amber-50', 'bg-blue-50'),
    
    # Text colors
    ('text-amber-950', 'text-blue-950'),
    ('text-amber-900', 'text-blue-900'),
    ('text-amber-800', 'text-blue-950'),
    ('text-amber-700', 'text-blue-950'),
    ('text-amber-600', 'text-blue-900'),
    ('text-amber-500', 'text-blue-700'),
    
    # Border colors
    ('border-amber-950', 'border-blue-950'),
    ('border-amber-900', 'border-blue-900'),
    ('border-amber-800', 'border-blue-800'),
    ('border-amber-700', 'border-blue-950'),
    ('border-amber-600', 'border-blue-900'),
    ('border-amber-500', 'border-blue-700'),
    ('border-amber-400', 'border-blue-600'),
    ('border-amber-300', 'border-blue-300'),
    ('border-amber-200', 'border-blue-200'),
    ('border-amber-100', 'border-blue-100'),
    
    # Border-left (for calendar)
    ('border-l-2 border-amber-500', 'border-l-2 border-blue-700'),
    
    # Hover states - background
    ('hover:bg-amber-950', 'hover:bg-blue-950'),
    ('hover:bg-amber-900', 'hover:bg-blue-950'),
    ('hover:bg-amber-800', 'hover:bg-blue-900'),
    ('hover:bg-amber-700', 'hover:bg-blue-950'),
    ('hover:bg-amber-600', 'hover:bg-blue-900'),
    ('hover:bg-amber-500', 'hover:bg-blue-800'),
    
    # Hover states - text
    ('hover:text-amber-950', 'hover:text-blue-950'),
    ('hover:text-amber-900', 'hover:text-blue-950'),
    ('hover:text-amber-800', 'hover:text-blue-950'),
    ('hover:text-amber-700', 'hover:text-blue-900'),
    ('hover:text-amber-600', 'hover:text-blue-900'),
    ('hover:text-amber-500', 'hover:text-blue-700'),
    
    # Hover states - border
    ('hover:border-amber-900', 'hover:border-blue-950'),
    ('hover:border-amber-800', 'hover:border-blue-900'),
    ('hover:border-amber-700', 'hover:border-blue-900'),
    ('hover:border-amber-600', 'hover:border-blue-900'),
    ('hover:border-amber-500', 'hover:border-blue-700'),
    
    # Focus states
    ('focus:border-amber-600', 'focus:border-blue-900'),
    ('focus:ring-amber-600', 'focus:ring-blue-900'),
    ('focus:ring-amber-600/20', 'focus:ring-blue-900/20'),
    
    # Fill colors (for SVG/icons)
    ('fill-amber-500', 'fill-blue-700'),
    ('fill-amber-600', 'fill-blue-900'),
    
    # From gradients
    ('from-amber-50', 'from-blue-50'),
    ('from-amber-100', 'from-blue-100'),
]

def replace_in_file(filepath):
    """Replace all amber colors with blue in a single file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Apply all replacements
        for old, new in REPLACEMENTS:
            content = content.replace(old, new)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error {filepath}: {e}")
        return False

def main():
    """Process all .tsx files recursively."""
    updated = []
    
    for root, dirs, files in os.walk('.'):
        # Skip excluded directories
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'dist', 'build']]
        
        for file in files:
            if file.endswith('.tsx'):
                filepath = os.path.join(root, file)
                if replace_in_file(filepath):
                    updated.append(filepath)
                    print(f"✓ {filepath}")
    
    print(f"\n{'='*60}")
    print(f"Successfully updated {len(updated)} files")
    print(f"{'='*60}")
    
    if updated:
        print("\nUpdated files:")
        for f in updated:
            print(f"  - {f}")

if __name__ == '__main__':
    main()
