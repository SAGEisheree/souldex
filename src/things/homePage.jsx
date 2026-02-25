import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="min-h-screen bg-base-100 text-base-content">
    {/* Simple navbar using DaisyUI tokens */}
    <nav className="navbar mx-auto max-w-5xl border-b border-base-300 px-4">
      <div className="flex-1">
        <span className="text-lg font-bold tracking-tight">Souldex</span>
      </div>
      <div className="hidden flex-none gap-2 md:flex">
        <button className="btn btn-ghost btn-sm normal-case">Tests</button>
        <Link to="/about" className="btn btn-ghost btn-sm normal-case">About</Link>
      </div>
    </nav>

    {/* Main Content Area */}
    <main className="mx-auto max-w-5xl space-y-8 px-4 pb-8 pt-10">
      {/* Header */}
      <section className="space-y-2 text-center md:text-left">
        <h2 className="text-3xl font-bold tracking-tight">Available tests</h2>
        <p className="text-sm text-base-content/70">
          Short, simple checks about mood, personality, and how you&apos;re
          doing lately.
        </p>
      </section>

      {/* Grid for Cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Mental Age Card */}
        <article className="card bg-base-200 shadow-sm">
          <div className="card-body gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-box bg-primary/20 text-2xl">
                🧠
              </span>
              <h3 className="text-base font-semibold">Mental Age</h3>
            </div>
            <p className="text-xs text-base-content/80">
              Discover whether your inner pace feels younger, older, or right on
              time compared to your age.
            </p>
            <Link
              to="/mentalage"
              className="btn btn-primary btn-sm btn-block normal-case mt-1"
            >
              Start test
            </Link>
          </div>
        </article>
      </section>
    </main>
  </div>
);

export default HomePage;

