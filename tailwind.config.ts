import type { Config } from 'tailwindcss'
import { heroui } from '@heroui/react'

const themeLight = {
  colors: {
    background: '#F9FAFE',
    foreground: '#333333',
    content1: '#F9FAFE',
    content2: '#f4f4f5',
    content3: '#e4e4e7',
    content4: '#d4d4d8',
    divider: 'rgba(17, 17, 17, 0.15)',
    focus: '#771ADB',
    default: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', foreground: '#333333', DEFAULT: '#E0E0E3' },
    primary: { 50: '#F2E8FC', 100: '#E5D1FA', 200: '#C89FF4', 300: '#AE72EE', 400: '#9140E8', 500: '#771ADB', 600: '#5E15AD', 700: '#481084', 800: '#2F0A57', 900: '#19052E', foreground: '#F2E8FC', DEFAULT: '#771ADB' },
    secondary: { 50: '#E9F2FB', 100: '#D0E2F6', 200: '#A0C4ED', 300: '#71A7E5', 400: '#428ADC', 500: '#246FC3', 600: '#1D589B', 700: '#154274', 800: '#0E2C4D', 900: '#071627', foreground: '#E9F2FB', DEFAULT: '#246FC3' },
    success: { 50: '#E3FCEB', 100: '#C8F9D7', 200: '#90F3AE', 300: '#59ED86', 400: '#26E860', 500: '#14BC46', 600: '#109839', 700: '#0C6F29', 800: '#084A1C', 900: '#04250E', foreground: '#E3FCEB', DEFAULT: '#14BC46' },
    danger: { 50: '#fee7ef', 100: '#fdd0df', 200: '#faa0bf', 300: '#f871a0', 400: '#f54180', 500: '#f31260', 600: '#c20e4d', 700: '#920b3a', 800: '#610726', 900: '#310413', foreground: '#fee7ef', DEFAULT: '#f31260' },
    warning: { 50: '#fefce8', 100: '#fdedd3', 200: '#fbdba7', 300: '#f9c97c', 400: '#f7b750', 500: '#f5a524', 600: '#c4841d', 700: '#936316', 800: '#62420e', 900: '#312107', foreground: '#fefce8', DEFAULT: '#f5a524' }
  }
}

const themeDark = {
  colors: {
    background: '#0d0c0d',
    foreground: '#ECEDEE',
    content1: '#18181b',
    content2: '#27272a',
    content3: '#3f3f46',
    content4: '#52525b',
    divider: 'rgba(255, 255, 255, 0.15)',
    focus: '#0675ff',
    default: { 50: '#18181b', 100: '#27272a', 200: '#3f3f46', 300: '#52525b', 400: '#71717a', 500: '#a1a1aa', 600: '#d4d4d8', 700: '#e4e4e7', 800: '#f4f4f5', 900: '#fafafa', foreground: '#fafafa', DEFAULT: '#3f3f46' },
    primary: { '50': '#0e295d', '100': '#0e46a3', '200': '#084ac5', '300': '#005df5', '400': '#0675ff', '500': '#1e95ff', '600': '#48b8ff', '700': '#83d2ff', '800': '#b5e3ff', '900': '#d6eeff', '950': '#edf8ff', foreground: '#edf8ff', DEFAULT: '#0675ff' },
    secondary: { 50: '#182e54', 100: '#1f4a89', 200: '#2054ad', 300: '#1f68d6', 400: '#287ee8', 500: '#3d9cf4', 600: '#62baf8', 700: '#94d3fc', 800: '#c0e3fd', 900: '#dbeffe', 950: '#eff8ff', foreground: '#182e54', DEFAULT: '#eff8ff' },
    success: { 50: '#022c1e', 100: '#064e36', 200: '#065f42', 300: '#047852', 400: '#059666', 500: '#10b981', 600: '#34d39e', 700: '#6ee7bf', 800: '#a7f3da', 900: '#d1faec', 950: '#ecfdf7', foreground: '#022c1e', DEFAULT: '#10b981' },
    danger: { 50: '#450a0a', 100: '#7f1d1d', 200: '#991b1b', 300: '#b91c1c', 400: '#dc2626', 500: '#ef4444', 600: '#f87171', 700: '#fca5a5', 800: '#fecaca', 900: '#fee2e2', 950: '#fef2f2', foreground: '#fef2f2', DEFAULT: '#dc2626' },
    warning: { 50: '#3d1d0b', 100: '#6a3919', 200: '#7c4517', 300: '#955713', 400: '#bb7913', 500: '#d79b19', 600: '#e9b426', 700: '#efcc55', 800: '#f5e293', 900: '#faf1c7', 950: '#fcfaea', foreground: '#3d1d0b', DEFAULT: '#d79b19' }
  }
}

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      '2xl': '1536px'
    }
  },
  darkMode: 'class',
  plugins: [
    heroui({
      addCommonColors: true,
      themes: {
        light: themeLight,
        dark: themeDark
      }
    })
  ]
}

export default config
