import React from "react";
import { Link } from "react-router-dom";
import lala from "../assets/lala.svg"
import navBorder from "../assets/navBorder.svg"

const HomePage = () => (
  /* Apply the theme name here or in your HTML tag */
  <div className="relative min-h-screen bg-base-100  " data-theme="souldexTheme">


        <div className="absolute opacity-50 inset-0 bg-[linear-gradient(to_right,#ffffff99_1px,transparent_1px),linear-gradient(to_bottom,#ffffff99_1px,transparent_1px)] bg-[size:60px_60px]">
    </div>



    {/* Navbar - Kept transparent to let the blue shine through */}
    <nav className="navbar  mx-auto max-w-5xl px-4 py-6">
      <div className="flex-1">
        <span className="text-4xl font-black tracking-tighter uppercase drop-shadow-sm">Souldex</span>
      </div>
      <div className="flex-none gap-4">
        <button className="btn btn-ghost btn-sm normal-case hidden md:flex text-xl hover:bg-white/10">Tests</button>
        <Link to="/about" className="btn btn-ghost btn-sm normal-case hidden md:flex text-xl hover:bg-white/10">About</Link>

        {/* Mobile menu button */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-souldex-blue border border-white/20 rounded-2xl w-52 backdrop-blur-lg">
            <li><button className="py-3">Tests</button></li>
            <li><Link to="/about" className="py-3">About</Link></li>
          </ul>
        </div>
      </div>
    </nav>

    {/* Main Content Area */}
    <main className="mx-auto max-w-5xl space-y-12 px-4 pb-20 pt-16 relative">



      {/* Header Section */}
      <section className="space-y-4 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight  drop-shadow-md">
          Test your personality
        </h2>
        <p className="text-lg md:text-xl max-w-xl font-medium">
          Short, simple checks about mood, personality, and mental age. Discover your <span className="italic underline underline-offset-4 decoration-white/40">quizData</span> insights.
        </p>
      </section>

      {/* Grid for Cards - Using Glassmorphism */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">

        {/* Mental Age Card */}
        <article className="card bg-white/15 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden">
          {/* The 'relative' class on card-body ensures the 'absolute' image stays inside this box */}
          <div className="card-body gap-4 p-8 relative">

            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-300 text-3xl shadow-inner">
                🧠
              </span>
              <h3 className="text-xl font-bold ">Mental Age</h3>
            </div>

            <p className="text-s text-blue-900 leading-relaxed">
              Discover whether your inner pace feels younger, older, or right on
              time compared to your age.
            </p>

            <img
              src={lala}
              alt=""
              className="absolute bottom-0 left-0 w-full opacity-10 -z-10 "
            />

            <div className="card-actions mt-4">
              <Link
                to="/mentalage"
                className="btn btn-primary btn-md btn-block rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
                Start test
              </Link>
            </div>
          </div>
        </article>

        {/* Add more cards here following the same 'article' pattern */}

      </section>
      <img
        src={lala}
        alt=""
        className="absolute bottom-0 left-0 aspect-video h-full opacity-10 -z-10 "
      />
    </main>

  </div>
);

export default HomePage;