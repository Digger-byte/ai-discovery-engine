import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResultsDisplay } from "./results-display"
import { redirect } from "next/navigation"
import { getRecommendations } from "../actions"

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: { userId: string }
}) {
  const userId = searchParams.userId

  if (!userId) {
    redirect("/questionnaire")
  }

  try {
    const recommendations = await getRecommendations(userId)

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <ResultsDisplay recommendations={recommendations} userId={userId} />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    redirect("/questionnaire")
  }
}
