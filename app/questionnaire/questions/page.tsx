import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QuestionnaireForm } from "./questionnaire-form"
import { redirect } from "next/navigation"

export default function QuestionsPage({
  searchParams,
}: {
  searchParams: { userId: string }
}) {
  const userId = searchParams.userId

  if (!userId) {
    redirect("/questionnaire")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-md space-y-6">
              <QuestionnaireForm userId={userId} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
