import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type User = {
  id: string
  name: string
  email: string
  created_at: string
}

export type Response = {
  id: string
  user_id: string
  question_1: string
  question_2: string
  question_3: string
  question_4: string
  question_5: string
  question_6: string
  created_at: string
}

export type Recommendation = {
  id: string
  user_id: string
  response_id: string
  summary: string
  areas: {
    title: string
    description: string
  }[]
  created_at: string
}

export type Admin = {
  id: string
  email: string
  created_at: string
}

export const questions = [
  "What kind of business do you run?",
  "What's one task that takes too much of your time each week?",
  "Do you create content or send marketing emails regularly?",
  "How do you currently get ne
