"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Sparkles, Download, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f1119]">
      {/* Navigation */}
      <nav className="border-b border-primary/20 bg-[#0f1119]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="Careerley" className="h-12 md:h-14 w-auto" />
              </Link>
              <span className="text-sm text-gray-500 ml-2 hidden md:inline">AI-Powered Resume Builder</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-primary/10 border border-transparent hover:border-primary/30"
                asChild
              >
                <Link href="/templates">
                  <FileText className="h-4 w-4 mr-2" />
                  Templates
                </Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" asChild>
                <Link href="/builder">Start Building</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-pattern-sa">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1119]/50 to-[#0f1119]"></div>
        <div className="container mx-auto px-6 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-primary/30 shadow-lg shadow-primary/10">
              <span className="text-lg">🇿🇦</span>
              <Sparkles className="h-4 w-4" />
              <span>Built by South Africans, for South Africans</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white">
              Build Your{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Winning CV
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 text-balance max-w-2xl mx-auto leading-relaxed">
              Stand out in the South African job market with AI-powered CV generation. From Cape Town to Johannesburg,
              your dream job awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-10 shadow-xl shadow-primary/20"
                asChild
              >
                <Link href="/builder">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate with AI
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-gray-300 border-primary/30 hover:bg-primary/10 hover:text-white hover:border-primary text-lg h-14 px-10 bg-transparent"
                asChild
              >
                <Link href="/builder">
                  <FileText className="h-5 w-5 mr-2" />
                  Build Manually
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Proudly South African Features</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need to land your next job in Mzansi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-xl p-8 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/10">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/30">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">AI Generation</h3>
              <p className="text-gray-400 leading-relaxed">
                Powered by Google Gemini AI. Describe your experience and let AI create a professional CV tailored for
                SA employers
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 border border-accent/20 hover:border-accent/40 transition-all hover:shadow-xl hover:shadow-accent/10">
              <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 border border-accent/30">
                <FileText className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">7 Templates</h3>
              <p className="text-gray-400 leading-relaxed">
                Choose from 7 professional templates designed for the South African job market - from classic to modern
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 border border-secondary/20 hover:border-secondary/40 transition-all hover:shadow-xl hover:shadow-secondary/10">
              <div className="h-14 w-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 border border-secondary/30">
                <Download className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Export & Share</h3>
              <p className="text-gray-400 leading-relaxed">
                Download as PDF and send to recruiters across South Africa. Your data stays private on your device
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 border-t border-primary/10 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Why Choose SA CV Builder?</h2>
              <p className="text-lg text-gray-400">Built specifically for the South African job market</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4 p-6 bg-[#1a1f2e] rounded-lg border border-primary/20">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl">🇿🇦</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">SA-Specific Fields</h3>
                  <p className="text-gray-400 text-sm">
                    Includes ID number, nationality, marital status and other fields expected by SA employers
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-[#1a1f2e] rounded-lg border border-accent/20">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Lightning Fast</h3>
                  <p className="text-gray-400 text-sm">
                    Generate a complete professional CV in under 2 minutes with our AI assistant
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-[#1a1f2e] rounded-lg border border-secondary/20">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Privacy First</h3>
                  <p className="text-gray-400 text-sm">
                    Your personal data stays on your device. We don't store or sell your information
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-[#1a1f2e] rounded-lg border border-primary/20">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">ATS-Friendly</h3>
                  <p className="text-gray-400 text-sm">
                    Templates optimized to pass Applicant Tracking Systems used by SA recruiters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-12 text-center border border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern-sa opacity-30"></div>
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4 text-white">Ready for Your Next Opportunity?</h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Join South Africans building careers with professional CVs powered by AI
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-10 shadow-xl shadow-primary/20"
                asChild
              >
                <Link href="/builder">
                  <Zap className="h-5 w-5 mr-2" />
                  Get Started Free
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-8 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Careerley" className="h-8 md:h-9 w-auto" />
            </div>
            <p className="text-sm text-gray-500">🇿🇦 Made with pride in South Africa. Your data stays private.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
