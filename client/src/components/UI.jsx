import React from 'react'
import { motion } from 'framer-motion'

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  as = 'button',
  ...props 
}) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 outline-none cursor-pointer'
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50',
    secondary: 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700',
    outline: 'border border-slate-700 text-slate-300 hover:bg-slate-800',
    ghost: 'text-slate-300 hover:bg-slate-800/50'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const Element = as === 'span' ? 'span' : motion.button

  return (
    <Element
      whileHover={as !== 'span' ? { scale: 1.02 } : undefined}
      whileTap={as !== 'span' ? { scale: 0.98 } : undefined}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Element>
  )
}

export function Card({ children, className = '', ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-slate-800 text-slate-300',
    success: 'bg-green-900/30 text-green-400',
    warning: 'bg-yellow-900/30 text-yellow-400',
    error: 'bg-red-900/30 text-red-400'
  }

  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${className}`}
      {...props}
    />
  )
}

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none ${className}`}
      {...props}
    />
  )
}

export function Skeleton({ className = '' }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`bg-slate-800/50 rounded-lg ${className}`}
    />
  )
}
