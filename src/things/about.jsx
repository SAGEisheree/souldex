import React from 'react'
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto max-w-5xl space-y-8 px-4 pb-8 pt-10">
        <div>
          becuz of college no time to write.

        </div>
      </main>
    </div>
  )
}

export default About