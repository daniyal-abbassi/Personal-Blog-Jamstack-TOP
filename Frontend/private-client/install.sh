#!/bin/bash

echo "Installing dependencies..."
dependencies=(
  "@hookform/resolvers"
  "@radix-ui/react-accordion"
  "@radix-ui/react-alert-dialog"
  "@radix-ui/react-avatar"
  "@radix-ui/react-checkbox"
  "@radix-ui/react-dropdown-menu"
  "@radix-ui/react-label"
  "@radix-ui/react-select"
  "@radix-ui/react-slot"
  "@radix-ui/react-switch"
  "@radix-ui/react-tabs"
  "@radix-ui/react-toast"
  "@tinymce/tinymce-react"
  "class-variance-authority"
  "clsx"
  "dompurify"
  "lucide-react"
  "prettier"
  "prop-types"
  "react"
  "react-dom"
  "react-hook-form"
  "react-router-dom"
  "tailwind-merge"
  "tailwindcss-animate"
  "zod"
)

for dep in "${dependencies[@]}"; do
  echo "Installing: npm install $dep"
  npm install "$dep"
  echo "Installed: $dep"
done

echo "\nInstalling devDependencies..."
devDependencies=(
  "@eslint/js"
  "@types/node"
  "@types/react"
  "@types/react-dom"
  "@vitejs/plugin-react"
  "autoprefixer"
  "eslint"
  "eslint-plugin-react"
  "eslint-plugin-react-hooks"
  "eslint-plugin-react-refresh"
  "globals"
  "postcss"
  "tailwindcss"
  "vite"
)

for devDep in "${devDependencies[@]}"; do
  echo "Installing: npm install -D $devDep"
  npm install -D "$devDep"
  echo "Installed: $devDep"
done

echo "All dependencies and devDependencies installed!"