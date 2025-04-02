"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { questions } from "@/lib/utils"
import { saveResponses } from "../actions"

export function QuestionnaireForm({ userId }: { userId: string }) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleNext = () => {
    if (!currentAnswer.trim()) {
      setError("Please provide an answer before continuing.")
      return
    }

    setError(null)
    const questionKey = `question_${currentQuestionIndex + 1}`
    setAnswers({ ...answers, [questionKey]: currentAnswer })
    setCurrentAnswer("")

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    const questionKey = `question_${currentQuestionIndex + 1}`
    const finalAnswers = { ...answers, [questionKey]: currentAnswer }

    setIsSubmitting(true)
    setError(null)

    try {
      await saveResponses(userId, finalAnswers)
      router.push(`/questionnaire/results?userId=${userId}`)
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h1>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full transition-all duration-300"
            style={{ 
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              backgroundColor: 'rgb(0, 102, 204)' 
            }}
          ></div>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-medium">{questions[currentQuestionIndex]}</h2>
            <Textarea
              placeholder="Type your answer here..."
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              rows={4}
              className="resize-none"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button 
              onClick={handleNext} 
              className="w-full" 
              style={{ backgroundColor: 'rgb(0, 102, 204)' }}
              disabled={isSubmitting}
            >
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : isSubmitting
                  ? "Generating Recommendations..."
                  : "Get Your AI Recommendations"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
