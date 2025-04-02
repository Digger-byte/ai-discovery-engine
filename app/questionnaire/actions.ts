"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { generateRecommendations } from "@/lib/openai"

export async function createUser({ name, email }: { name: string; email: string }) {
  const supabase = createServerSupabaseClient()

  // Check if user already exists
  const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).single()

  if (existingUser) {
    return existingUser.id
  }

  // Create new user
  const { data, error } = await supabase.from("users").insert([{ name, email }]).select("id").single()

  if (error) {
    console.error("Error creating user:", error)
    throw new Error("Failed to create user")
  }

  return data.id
}

export async function saveResponses(userId: string, responses: Record<string, string>) {
  const supabase = createServerSupabaseClient()

  // Save responses
  const { data: responseData, error: responseError } = await supabase
    .from("responses")
    .insert([{ user_id: userId, ...responses }])
    .select("id")
    .single()

  if (responseError) {
    console.error("Error saving responses:", responseError)
    throw new Error("Failed to save responses")
  }

  // Generate recommendations
  try {
    const recommendations = await generateRecommendations(responses)

    // Save recommendations
    const { error: recommendationError } = await supabase.from("recommendations").insert([
      {
        user_id: userId,
        response_id: responseData.id,
        summary: recommendations.summary,
        areas: recommendations.areas,
      },
    ])

    if (recommendationError) {
      console.error("Error saving recommendations:", recommendationError)
      throw new Error("Failed to save recommendations")
    }

    return responseData.id
  } catch (error) {
    console.error("Error generating recommendations:", error)
    throw new Error("Failed to generate recommendations")
  }
}

export async function getRecommendations(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error("Error fetching recommendations:", error)
    throw new Error("Failed to fetch recommendations")
  }

  return data
}
