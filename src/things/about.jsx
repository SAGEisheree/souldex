import React from 'react'
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Navbar */}
      <nav className="navbar mx-auto max-w-5xl border-b border-base-300 px-4">
        <div className="flex-1">
          <span className="text-lg font-bold tracking-tight">Souldex</span>
        </div>
        <div className="flex-none gap-2">
          <button className="btn btn-ghost btn-sm normal-case hidden md:block">Tests</button>
          <Link to="/" className="btn btn-ghost btn-sm normal-case hidden md:block">Home</Link>
          {/* Mobile menu button */}
          <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><button className="btn btn-ghost btn-sm normal-case">Tests</button></li>
              <li><Link to="/" className="btn btn-ghost btn-sm normal-case">Home</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl space-y-8 px-4 pb-8 pt-10">
        <section className="space-y-6">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-center">About Souldex</h1>
          
          <div className="prose prose-base md:prose-lg max-w-none">
            <div className="card bg-base-200 shadow-sm p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-base-content/80 leading-relaxed">
                Souldex provides simple, accessible mental wellness assessments to help you better understand yourself. 
                Our tests are designed to be quick, informative, and completely confidential.
              </p>
            </div>

            <div className="card bg-base-200 shadow-sm p-6 md:p-8 mt-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">What We Offer</h2>
              <ul className="space-y-2 text-base-content/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Quick mental age assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Mood and personality insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Confidential and secure testing</span>
                </li>
              </ul>
            </div>

            <div className="card bg-base-200 shadow-sm p-6 md:p-8 mt-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Get Started</h2>
              <p className="text-base-content/80 mb-4">
                Ready to learn more about yourself? Take our first test and discover your mental age.
              </p>
              <Link to="/mentalage" className="btn btn-primary">
                Start Your First Test
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default About