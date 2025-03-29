import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, FileText, BarChart3 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TestGenius</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:text-primary">
              Benefits
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              AI-Powered Test Generation for Educators
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-10">
              Create multiple versions of tests, track student performance, and identify knowledge gaps with our
              intelligent test generation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Generated Questions</h3>
                <p className="text-muted-foreground">
                  Upload your teaching materials and let our AI create multiple versions of questions that test the same
                  knowledge in different ways.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Organized Question Banks</h3>
                <p className="text-muted-foreground">
                  Create and manage subject-specific question banks with categories for easy filtering and test
                  creation.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
                <p className="text-muted-foreground">
                  Track student performance and identify challenging topics with comprehensive statistics and insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Materials</h3>
                <p className="text-muted-foreground">Upload your teaching materials and past exam questions.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Organize Question Banks</h3>
                <p className="text-muted-foreground">Create subject-specific question banks with categories.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Generate Tests</h3>
                <p className="text-muted-foreground">Specify parameters and create multiple test versions.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Analyze Results</h3>
                <p className="text-muted-foreground">Review performance data and identify knowledge gaps.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits for Educators</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                <p className="text-muted-foreground">
                  Reduce the hours spent creating multiple test versions manually. Our AI handles the variations while
                  maintaining the same learning objectives.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Reduce Academic Dishonesty</h3>
                <p className="text-muted-foreground">
                  Multiple test versions with different question structures make it harder for students to share
                  answers.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Identify Learning Gaps</h3>
                <p className="text-muted-foreground">
                  Detailed analytics help you identify which concepts students struggle with most, allowing for targeted
                  instruction.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Improve Teaching Effectiveness</h3>
                <p className="text-muted-foreground">
                  Use data-driven insights to refine your teaching methods and materials for better student outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Testing Process?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mb-10">
              Join thousands of educators who are saving time and improving student outcomes with TestGenius.
            </p>
            <Link href="/register">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-semibold">TestGenius</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TestGenius. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

