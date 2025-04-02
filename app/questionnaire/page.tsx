import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UserForm } from "./user-form"

export default function QuestionnairePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter">Get Started</h1>
                <p className="text-gray-500">
                  Enter your information to receive personalized AI recommendations for your business.
                </p>
              </div>
              <UserForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
