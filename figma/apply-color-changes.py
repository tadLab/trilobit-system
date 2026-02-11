#!/usr/bin/env python3
import os
import re

# Define comprehensive replacement mapping
replacements = {
    'bg-amber-950': 'bg-blue-950',
    'bg-amber-900': 'bg-blue-900',
    'bg-amber-800': 'bg-blue-800',
    'bg-amber-700': 'bg-blue-950',
    'bg-amber-600': 'bg-blue-900',
    'bg-amber-500': 'bg-blue-700',
    'bg-amber-400': 'bg-blue-600',
    'bg-amber-300': 'bg-blue-300',
    'bg-amber-200': 'bg-blue-200',
    'bg-amber-100': 'bg-blue-100',
    'bg-amber-50': 'bg-blue-50',
    'text-amber-950': 'text-blue-950',
    'text-amber-900': 'text-blue-950',
    'text-amber-800': 'text-blue-950',
    'text-amber-700': 'text-blue-950',
    'text-amber-600': 'text-blue-900',
    'text-amber-500': 'text-blue-700',
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
    'hover:border-amber-950': 'hover:border-blue-950',
    'hover:border-amber-900': 'hover:border-blue-950',
    'hover:border-amber-800': 'hover:border-blue-900',
    'hover:border-amber-700': 'hover:border-blue-900',
    'hover:border-amber-600': 'hover:border-blue-900',
    'hover:border-amber-500': 'hover:border-blue-700',
    'focus:border-amber-600': 'focus:border-blue-900',
    'focus:ring-amber-600/20': 'focus:ring-blue-900/20',
    'focus:ring-amber-600': 'focus:ring-blue-900',
    'fill-amber-500': 'fill-blue-700',
    'fill-amber-600': 'fill-blue-900',
    'from-amber-50': 'from-blue-50',
    'from-amber-100': 'from-blue-100',
}

files_to_update = [
    '/components/programs/ProgramCards.tsx',
    '/components/programs/HowItWorks.tsx',
    '/components/programs/ProgramFAQ.tsx',
    '/components/programs/ProgramCTA.tsx',
    '/components/calendar/CalendarView.tsx',
    '/components/about/AboutHero.tsx',
    '/components/about/AboutCTA.tsx',
    '/components/about/HowItWorks.tsx',
    '/components/about/TribeValues.tsx',
    '/components/about/TeamSection.tsx',
    '/components/about/SafetySection.tsx',
    '/components/contact/ContactHero.tsx',
    '/components/contact/ContactCTA.tsx',
    '/components/contact/ContactCards.tsx',
    '/components/contact/ContactForm.tsx',
    '/components/contact/ContactFAQ.tsx',
    '/components/signup/SignUpHero.tsx',
    '/components/signup/SignUpForm.tsx',
    '/components/signup/SignUpSteps.tsx',
    '/components/login/LoginForm.tsx',
]

updated_count = 0

for filepath in files_to_update:
    fullpath = f".{filepath}"
    if not os.path.exists(fullpath):
        print(f"⚠ File not found: {filepath}")
        continue
    
    try:
        with open(fullpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all replacements
        for old_color, new_color in replacements.items():
            content = content.replace(old_color, new_color)
        
        if content != original_content:
            with open(fullpath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1
            print(f"✓ Updated: {filepath}")
        else:
            print(f"- No changes needed: {filepath}")
            
    except Exception as e:
        print(f"✗ Error updating {filepath}: {e}")

print(f"\n{'='*60}")
print(f"Successfully updated {updated_count} files")
print(f"{'='*60}")
