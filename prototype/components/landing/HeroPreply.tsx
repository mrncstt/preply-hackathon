"use client";

import { Globe } from "lucide-react";

interface HeroPreplyProps {
  onStartInterview: () => void;
}

export function HeroPreply({ onStartInterview }: HeroPreplyProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FF7AAC' }}>
      {/* Top banner - Proven Progress */}
      <div style={{ background: '#FF7AAC', color: '#121117' }}>
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-2 text-sm">
          <span style={{ color: '#121117', fontWeight: 700 }}>Proven progress</span>
          <span style={{ opacity: 0.6 }}>with 1-on-1 tutoring. See how it works</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto w-full" style={{ background: '#FF7AAC' }}>
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center">
            <svg width="97" viewBox="0 0 775 210" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Preply">
              <g fill="#121117"><g fillRule="evenodd" clipRule="evenodd"><path d="M100.042 56.317c-4.18-6.861-9.903-12.24-17.194-16.134C75.568 36.288 67.21 34.33 57.83 34.33H0v138.654h32.378V125.44h25.44c9.403 0 17.739-1.981 25.019-5.944 7.28-3.952 13.015-9.398 17.194-16.338 4.168-6.941 6.246-14.765 6.246-23.471 0-8.707-2.09-16.508-6.246-23.37zm-28.12 31.091c-1.328 2.254-3.213 3.997-5.655 5.254-2.442 1.245-5.27 1.88-8.438 1.88H32.4V65.023h25.428c3.18 0 5.997.634 8.438 1.88 2.453 1.256 4.338 3.011 5.656 5.253 1.328 2.253 1.987 4.756 1.987 7.53s-.67 5.277-1.987 7.722z"/><path d="M194.497 73.946c3.895 4.778 6.609 11.232 8.142 19.327l-30.027 10.632c-.58-2.831-1.624-5.073-3.146-6.68-2.317-2.446-4.997-3.669-8.438-3.669s-6.52 1.167-9.233 3.465c-2.726 2.31-4.804 5.582-6.258 9.805-1.453 4.223-2.18 9.047-2.18 14.46v51.697h-30.8V66.02h27.415v18.422c2.249-4.36 4.941-8.05 8.052-11.096 3.112-3.034 6.712-5.378 10.823-7.031 4.1-1.653 8.473-2.48 13.118-2.48 9.539 0 17.058 3.363 22.554 10.1z"/><path d="M423.496 91.383c-4.566-8.447-10.8-15.15-18.682-20.109-7.882-4.948-16.593-7.428-26.12-7.428s-17.82 2.083-24.838 6.238c-4.066 2.423-7.564 5.435-10.528 9.024V66.02h-27.415v144.304h30.8v-46.716c.239.226.466.464.693.679 3.907 3.567 8.506 6.273 13.81 8.129 5.292 1.835 11.118 2.774 17.489 2.774 9.665 0 18.433-2.48 26.325-7.427 7.882-4.948 14.072-11.685 18.58-20.21 4.498-8.515 6.746-17.867 6.746-28.034s-2.283-20.168-6.848-28.625zm-27.813 41.496c-2.317 4.019-5.463 7.224-9.438 9.601-3.963 2.367-8.336 3.567-13.117 3.567-5.031 0-9.528-1.155-13.503-3.465-3.975-2.31-7.121-5.47-9.438-9.5-2.316-4.03-3.475-8.616-3.475-13.767 0-4.88 1.125-9.33 3.373-13.372 2.26-4.031 5.372-7.201 9.336-9.5 3.974-2.31 8.483-3.464 13.503-3.464s8.335 1.166 12.321 3.464c3.964 2.31 7.12 5.515 9.426 9.601 2.317 4.1 3.476 8.583 3.476 13.463s-1.17 9.352-3.476 13.372z"/><path d="M469.013 160.505c.466 5.152 1.284 9.32 2.488 12.478h-33.98V26.007h30.8v116.066c0 7.133.227 13.27.692 18.421z"/><path d="M555.359 66.01h32.98l-47.289 113.11c-4.1 9.896-9.506 17.595-16.195 23.075-6.689 5.48-15.593 8.22-26.723 8.22-4.497 0-8.87-.488-13.117-1.484-4.236-.996-7.882-2.208-10.925-3.669l9.335-29.313c2.783 1.449 5.463 2.57 8.052 3.363 2.578.792 5.122 1.189 7.643 1.189 3.578 0 6.462-.997 8.643-2.978 2.18-1.982 4.145-4.824 5.86-8.515l2.044-4.529L474.487 66.02h32.98l23.85 62.94 24.042-62.95z"/><path d="M307.622 114.763c0-9.511-2.317-18.161-6.962-25.951-4.645-7.801-10.993-13.904-19.068-18.32-8.075-4.438-17.081-6.646-27.018-6.646s-19.477 2.423-27.813 7.235c-8.347 4.812-14.911 11.492-19.67 20.006-4.77 8.515-7.154 18.06-7.154 28.623 0 10.564 2.373 20.425 7.154 28.815 4.77 8.39 11.493 14.934 20.159 19.611 8.676 4.687 18.636 7.042 29.902 7.042 13.912 0 25.235-3.295 33.968-9.918 6.576-4.959 11.437-11.345 14.548-19.135l-29.777-10.349c-.772 3.793-2.839 6.828-6.235 9.092-3.577 2.367-8.154 3.567-13.708 3.567s-10.175-1.189-14.207-3.567c-4.043-2.366-7.121-5.842-9.245-10.405-1.044-2.253-1.828-4.733-2.373-7.427h76.272c.795-4.224 1.204-8.311 1.204-12.274zm-76.227-9.918c.284-.793.579-1.55.92-2.276 1.987-4.29 4.826-7.586 8.54-9.907 3.702-2.31 8.211-3.464 13.503-3.464 3.714 0 7.121.69 10.233 2.083 3.123 1.393 5.599 3.238 7.45 5.548 1.851 2.31 2.919 4.994 3.18 8.028h-43.837z"/></g><path fillRule="evenodd" clipRule="evenodd" d="M753.752 52.819l-77.58-47.282C651.189-9.68 619.117 8.243 619.117 37.432v132.98c0 26.54 15.638 40.24 35.728 40.24 18.841 0 34.275-14.549 35.626-32.982 18.421-1.925 33.617-17.436 32.776-38.451l33.809-20.606c11.959-7.292 17.944-19.588 17.944-31.896s-4.202-24.507-21.248-33.95zM654.845 189.48c-7.995 0-14.468-6.466-14.468-14.425s6.473-14.436 14.468-14.436c7.995 0 14.48 6.465 14.48 14.436s-6.485 14.424-14.48 14.424zm47.154-48.12c0 5.446-3.521 15.331-16.547 15.331a38.84 38.84 0 00-5.224-6.703 39.34 39.34 0 00-7.001-5.991 38.25 38.25 0 00-18.382-5.262c-4.724 0-9.233.918-13.355 2.571-.364.147-.769.317-1.125.475v-31.895c0-8.47 6.883-15.33 15.377-15.33h30.868c8.494 0 15.377 6.86 15.377 15.33v31.474zm44.085-40.794l-22.725 13.847v-3.838c0-20.165-16.399-36.515-36.625-36.515h-30.868c-5.486 0-10.698 1.2-15.377 3.374V37.443c0-12.647 13.889-20.426 24.723-13.825l80.884 49.298c10.368 6.317 10.368 21.331 0 27.649z"/></g>
            </svg>
          </a>
          <div className="hidden md:flex items-center gap-4 text-sm font-semibold" style={{ color: '#121117' }}>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="cursor-pointer hover:opacity-70 no-underline" style={{ color: '#121117' }}>Find tutors</a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="cursor-pointer hover:opacity-70 no-underline" style={{ color: '#121117' }}>For business</a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="cursor-pointer hover:opacity-70 no-underline" style={{ color: '#121117' }}>Become a tutor</a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="cursor-pointer hover:opacity-70 no-underline" style={{ color: '#121117' }}>Proven Progress</a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-sm cursor-pointer hover:opacity-70" style={{ color: '#121117' }}>
            <Globe className="w-4 h-4" />
            <span>EN</span>
          </div>
          <button className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-70" style={{ color: '#121117' }}>
            Log in
          </button>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="px-5 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all no-underline" style={{ background: '#121117', color: '#fff' }}>
            Sign up
          </a>
        </div>
      </nav>

      {/* Hero section - two columns */}
      <main className="flex-1 flex items-center" style={{ background: '#FF7AAC' }}>
        <div className="max-w-7xl mx-auto px-6 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left - text */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-6" style={{ color: '#121117', fontFamily: 'Figtree, sans-serif' }}>
              Learn faster<br className="hidden lg:block" />
              {' '}with your best<br className="hidden lg:block" />
              {' '}language tutor.
            </h1>

            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Take 1-on-1 lessons with our AI Discovery Coach, who learns what you love and builds personalized learning plans around your passions.
            </p>

            <button
              onClick={onStartInterview}
              className="group px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:brightness-110 cursor-pointer"
              style={{ background: '#121117', color: '#fff' }}
            >
              Find your tutor
            </button>

            <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              90-second voice interview. Personalized results.
            </p>
          </div>

          {/* Right - stacked hero images */}
          <div className="hidden lg:flex justify-center">
            <div style={{ position: 'relative', width: 496, height: 324 }}>
              <img
                src="hero-preply.jpg"
                alt=""
                style={{
                  position: 'absolute', width: 496, height: 324, objectFit: 'cover',
                  borderRadius: 16, transform: 'translateX(100px) scale(0.64)',
                  transformOrigin: 'center center', opacity: 0.5,
                }}
              />
              <img
                src="hero-preply.jpg"
                alt=""
                style={{
                  position: 'absolute', width: 496, height: 324, objectFit: 'cover',
                  borderRadius: 16, transform: 'translateX(56px) scale(0.8)',
                  transformOrigin: 'center center', opacity: 0.75,
                }}
              />
              <img
                src="hero-preply.jpg"
                alt="Students learning with Preply"
                style={{
                  position: 'absolute', width: 496, height: 324, objectFit: 'cover',
                  borderRadius: 16, transform: 'translateX(0) scale(1)',
                  transformOrigin: 'center center',
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* How it works section */}
      <div style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#121117' }}>How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Tell us about you"
              description="Our AI Discovery Coach asks about your passions, goals, and learning style in a natural 90-second voice conversation."
              color="#FF7AAC"
            />
            <StepCard
              number="2"
              title="Get your learning profile"
              description="We map your interests to create a unique learning bridge connecting what you love to what you need to learn."
              color="#3BB3BD"
            />
            <StepCard
              number="3"
              title="Start learning"
              description="Get paired with a tutor who shares your passions and a personalized plan built around your interests."
              color="#018058"
            />
          </div>
        </div>
      </div>

      {/* Trust section */}
      <div style={{ background: '#F7F7F8', borderTop: '1px solid #EFEFEF' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold" style={{ color: '#121117' }}>32,000+</div>
              <div className="text-sm mt-1" style={{ color: '#6B7280' }}>Expert tutors</div>
            </div>
            <div style={{ width: 1, height: 40, background: '#DDD' }} />
            <div>
              <div className="text-3xl font-bold" style={{ color: '#121117' }}>300,000+</div>
              <div className="text-sm mt-1" style={{ color: '#6B7280' }}>5-star reviews</div>
            </div>
            <div style={{ width: 1, height: 40, background: '#DDD' }} />
            <div>
              <div className="text-3xl font-bold" style={{ color: '#121117' }}>120+</div>
              <div className="text-sm mt-1" style={{ color: '#6B7280' }}>Subjects taught</div>
            </div>
            <div style={{ width: 1, height: 40, background: '#DDD' }} />
            <div>
              <div className="text-3xl font-bold" style={{ color: '#121117' }}>200+</div>
              <div className="text-sm mt-1" style={{ color: '#6B7280' }}>Tutor nationalities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#121117', color: '#9CA3AF' }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <svg width="70" viewBox="0 0 775 210" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Preply">
                <g fill="#ffffff"><g fillRule="evenodd" clipRule="evenodd"><path d="M100.042 56.317c-4.18-6.861-9.903-12.24-17.194-16.134C75.568 36.288 67.21 34.33 57.83 34.33H0v138.654h32.378V125.44h25.44c9.403 0 17.739-1.981 25.019-5.944 7.28-3.952 13.015-9.398 17.194-16.338 4.168-6.941 6.246-14.765 6.246-23.471 0-8.707-2.09-16.508-6.246-23.37zm-28.12 31.091c-1.328 2.254-3.213 3.997-5.655 5.254-2.442 1.245-5.27 1.88-8.438 1.88H32.4V65.023h25.428c3.18 0 5.997.634 8.438 1.88 2.453 1.256 4.338 3.011 5.656 5.253 1.328 2.253 1.987 4.756 1.987 7.53s-.67 5.277-1.987 7.722z"/><path d="M194.497 73.946c3.895 4.778 6.609 11.232 8.142 19.327l-30.027 10.632c-.58-2.831-1.624-5.073-3.146-6.68-2.317-2.446-4.997-3.669-8.438-3.669s-6.52 1.167-9.233 3.465c-2.726 2.31-4.804 5.582-6.258 9.805-1.453 4.223-2.18 9.047-2.18 14.46v51.697h-30.8V66.02h27.415v18.422c2.249-4.36 4.941-8.05 8.052-11.096 3.112-3.034 6.712-5.378 10.823-7.031 4.1-1.653 8.473-2.48 13.118-2.48 9.539 0 17.058 3.363 22.554 10.1z"/><path d="M423.496 91.383c-4.566-8.447-10.8-15.15-18.682-20.109-7.882-4.948-16.593-7.428-26.12-7.428s-17.82 2.083-24.838 6.238c-4.066 2.423-7.564 5.435-10.528 9.024V66.02h-27.415v144.304h30.8v-46.716c.239.226.466.464.693.679 3.907 3.567 8.506 6.273 13.81 8.129 5.292 1.835 11.118 2.774 17.489 2.774 9.665 0 18.433-2.48 26.325-7.427 7.882-4.948 14.072-11.685 18.58-20.21 4.498-8.515 6.746-17.867 6.746-28.034s-2.283-20.168-6.848-28.625zm-27.813 41.496c-2.317 4.019-5.463 7.224-9.438 9.601-3.963 2.367-8.336 3.567-13.117 3.567-5.031 0-9.528-1.155-13.503-3.465-3.975-2.31-7.121-5.47-9.438-9.5-2.316-4.03-3.475-8.616-3.475-13.767 0-4.88 1.125-9.33 3.373-13.372 2.26-4.031 5.372-7.201 9.336-9.5 3.974-2.31 8.483-3.464 13.503-3.464s8.335 1.166 12.321 3.464c3.964 2.31 7.12 5.515 9.426 9.601 2.317 4.1 3.476 8.583 3.476 13.463s-1.17 9.352-3.476 13.372z"/><path d="M469.013 160.505c.466 5.152 1.284 9.32 2.488 12.478h-33.98V26.007h30.8v116.066c0 7.133.227 13.27.692 18.421z"/><path d="M555.359 66.01h32.98l-47.289 113.11c-4.1 9.896-9.506 17.595-16.195 23.075-6.689 5.48-15.593 8.22-26.723 8.22-4.497 0-8.87-.488-13.117-1.484-4.236-.996-7.882-2.208-10.925-3.669l9.335-29.313c2.783 1.449 5.463 2.57 8.052 3.363 2.578.792 5.122 1.189 7.643 1.189 3.578 0 6.462-.997 8.643-2.978 2.18-1.982 4.145-4.824 5.86-8.515l2.044-4.529L474.487 66.02h32.98l23.85 62.94 24.042-62.95z"/><path d="M307.622 114.763c0-9.511-2.317-18.161-6.962-25.951-4.645-7.801-10.993-13.904-19.068-18.32-8.075-4.438-17.081-6.646-27.018-6.646s-19.477 2.423-27.813 7.235c-8.347 4.812-14.911 11.492-19.67 20.006-4.77 8.515-7.154 18.06-7.154 28.623 0 10.564 2.373 20.425 7.154 28.815 4.77 8.39 11.493 14.934 20.159 19.611 8.676 4.687 18.636 7.042 29.902 7.042 13.912 0 25.235-3.295 33.968-9.918 6.576-4.959 11.437-11.345 14.548-19.135l-29.777-10.349c-.772 3.793-2.839 6.828-6.235 9.092-3.577 2.367-8.154 3.567-13.708 3.567s-10.175-1.189-14.207-3.567c-4.043-2.366-7.121-5.842-9.245-10.405-1.044-2.253-1.828-4.733-2.373-7.427h76.272c.795-4.224 1.204-8.311 1.204-12.274zm-76.227-9.918c.284-.793.579-1.55.92-2.276 1.987-4.29 4.826-7.586 8.54-9.907 3.702-2.31 8.211-3.464 13.503-3.464 3.714 0 7.121.69 10.233 2.083 3.123 1.393 5.599 3.238 7.45 5.548 1.851 2.31 2.919 4.994 3.18 8.028h-43.837z"/></g><path fillRule="evenodd" clipRule="evenodd" d="M753.752 52.819l-77.58-47.282C651.189-9.68 619.117 8.243 619.117 37.432v132.98c0 26.54 15.638 40.24 35.728 40.24 18.841 0 34.275-14.549 35.626-32.982 18.421-1.925 33.617-17.436 32.776-38.451l33.809-20.606c11.959-7.292 17.944-19.588 17.944-31.896s-4.202-24.507-21.248-33.95zM654.845 189.48c-7.995 0-14.468-6.466-14.468-14.425s6.473-14.436 14.468-14.436c7.995 0 14.48 6.465 14.48 14.436s-6.485 14.424-14.48 14.424zm47.154-48.12c0 5.446-3.521 15.331-16.547 15.331a38.84 38.84 0 00-5.224-6.703 39.34 39.34 0 00-7.001-5.991 38.25 38.25 0 00-18.382-5.262c-4.724 0-9.233.918-13.355 2.571-.364.147-.769.317-1.125.475v-31.895c0-8.47 6.883-15.33 15.377-15.33h30.868c8.494 0 15.377 6.86 15.377 15.33v31.474zm44.085-40.794l-22.725 13.847v-3.838c0-20.165-16.399-36.515-36.625-36.515h-30.868c-5.486 0-10.698 1.2-15.377 3.374V37.443c0-12.647 13.889-20.426 24.723-13.825l80.884 49.298c10.368 6.317 10.368 21.331 0 27.649z"/></g>
              </svg>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="cursor-pointer hover:text-white transition-colors no-underline" style={{ color: '#9CA3AF' }}>About us</a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="cursor-pointer hover:text-white transition-colors no-underline" style={{ color: '#9CA3AF' }}>For business</a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="cursor-pointer hover:text-white transition-colors no-underline" style={{ color: '#9CA3AF' }}>Become a tutor</a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="cursor-pointer hover:text-white transition-colors no-underline" style={{ color: '#9CA3AF' }}>Blog</a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="cursor-pointer hover:text-white transition-colors no-underline" style={{ color: '#9CA3AF' }}>Help center</a>
            </div>
          </div>
          <div className="mt-6 pt-6 text-xs text-center" style={{ borderTop: '1px solid #2a2a2a' }}>
            Hackathon prototype. Built at Preply x Agora Hackathon, Barcelona 2026.
          </div>
        </div>
      </footer>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
  color,
}: {
  number: string;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="text-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl"
        style={{ background: color }}
      >
        {number}
      </div>
      <h3 className="font-bold text-lg mb-2" style={{ color: '#121117' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{description}</p>
    </div>
  );
}
