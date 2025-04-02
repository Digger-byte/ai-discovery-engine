// In the progress bar section:
<div className="w-full bg-gray-200 rounded-full h-2.5">
  <div
    className="h-2.5 rounded-full transition-all duration-300"
    style={{ 
      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
      backgroundColor: 'rgb(0, 102, 204)' 
    }}
  ></div>
</div>

// And for the button:
<Button
  onClick={handleNext}
  className="w-full bg-primary"
  disabled={isSubmitting}
>
  {currentQuestionIndex < questions.length - 1
    ? "Next Question"
    : isSubmitting
      ? "Generating Recommendations..."
      : "Get Your AI Recommendations"}
</Button>
