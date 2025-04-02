"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Recommendation } from "@/lib/utils"
import { useState } from "react"

export function ResultsDisplay({
  recommendations,
  userId,
}: {
  recommendations: Recommendation
  userId: string
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your AI Recommendations</h1>
        <p className="text-gray-500 md:text-xl">
          Based on your responses, here are the AI solutions that could transform your business.
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl">Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{recommendations.summary}</p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Recommended AI Solutions</h2>

        {recommendations.areas.map((area, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{area.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{area.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
        <Button 
          onClick={() => window.print()} 
          style={{ backgroundColor: 'rgb(0, 102, 204)' }}
          className="w-full sm:w-auto"
        >
          Print Recommendations
        </Button>
        <Button 
          onClick={() => window.location.href = '/questionnaire'} 
          variant="outline" 
          className="w-full sm:w-auto"
        >
          Start Over
        </Button>
      </div>
    </div>
  )
}
