import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center mb-8">
            <div className="text-2xl font-display font-bold">Kumi Math</div>
            <div className="space-x-4">
              <Link href="/login" className="px-4 py-2 bg-white text-primary-600 rounded-full font-medium hover:bg-gray-100 transition">
                Log In
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-secondary-500 text-white rounded-full font-medium hover:bg-secondary-600 transition">
                Sign Up
              </Link>
            </div>
          </nav>
          
          <div className="flex flex-col md:flex-row items-center py-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Find and Fix Math Gaps for Your 1st Grader
              </h1>
              <p className="text-xl mb-6">
                Help your child excel in math with personalized assessments and learning resources tailored to their unique needs.
              </p>
              <Link href="/signup" className="btn-secondary text-lg px-6 py-3">
                Get Started Free
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-64 md:h-80">
                {/* Placeholder for hero image */}
                <div className="absolute inset-0 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl font-display">Math Learning Journey</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">How Kumi Math Helps Your Child</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Identify Gaps</h3>
              <p className="text-gray-600">
                Our 20-minute assessment pinpoints exactly where your child needs help in 1st grade math.
              </p>
            </div>
            
            <div className="card">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Personalized Plan</h3>
              <p className="text-gray-600">
                Get a customized learning path with activities and resources targeted to your child's needs.
              </p>
            </div>
            
            <div className="card">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor improvement and celebrate success as your child masters essential math skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Parents Love Kumi Math</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-primary-600">JM</span>
                </div>
                <div>
                  <h4 className="font-bold">Jennifer M.</h4>
                  <p className="text-gray-600 text-sm">Parent of a 1st grader</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Kumi Math helped us discover that my son was struggling with place value concepts. 
                The recommended activities were fun and engaging, and within a few weeks, he caught up completely!"
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-primary-600">DP</span>
                </div>
                <div>
                  <h4 className="font-bold">David P.</h4>
                  <p className="text-gray-600 text-sm">Parent of a 1st grader</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I was worried my daughter was falling behind in math. The assessment was quick and painless, 
                and she actually enjoyed it! Now I know exactly what we need to focus on to help her succeed."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Help Your Child Excel in Math?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of parents who have helped their children build confidence and skills in mathematics.
          </p>
          <Link href="/signup" className="btn-primary text-lg px-8 py-3">
            Start Free Assessment
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-display font-bold mb-4">Kumi Math</h3>
              <p className="text-gray-400">
                Helping 1st graders build strong foundations in mathematics through personalized learning.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/team" className="text-gray-400 hover:text-white">Our Team</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/guides" className="text-gray-400 hover:text-white">Parent Guides</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQs</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Kumi Math. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 