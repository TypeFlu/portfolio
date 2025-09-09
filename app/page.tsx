"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Icon } from "@iconify/react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // GSAP refs
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Initialize animations
    initializeAnimations()

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const initializeAnimations = () => {
    // Wait for elements to be available
    if (!progressBarRef.current) return

    // Progress bar animation with better performance
    gsap.to(progressBarRef.current, {
      scaleX: 1,
      transformOrigin: "left",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
        invalidateOnRefresh: true,
      },
    })

    // Hero section animations with delay
    setTimeout(() => {
      if (heroRef.current && avatarRef.current && heroTextRef.current) {
        // Avatar animation
        gsap.fromTo(
          avatarRef.current,
          { scale: 0, rotation: -180, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: "back.out(1.7)" }
        )

        // Text animation
        gsap.fromTo(
          heroTextRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
        )

        // Animate spans within the hero text
        const spans = heroTextRef.current.querySelectorAll("h1 span")
        gsap.fromTo(
          spans,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.6 }
        )
      }
    }, 100)

    // Optimized scroll trigger animations for sections
    gsap.utils.toArray(".animate-on-scroll").forEach(element => {
      const el = element as Element
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true, // Only animate once for better performance
          },
        }
      )
    })
  }

  const techStack = [
    { name: "TypeScript", level: 95, icon: "skill-icons:typescript" },
    { name: "React", level: 90, icon: "skill-icons:react-dark" },
    { name: "Next.js", level: 88, icon: "skill-icons:nextjs-dark" },
    { name: "Vue.js", level: 85, icon: "skill-icons:vuejs-dark" },
    { name: "Rust", level: 75, icon: "skill-icons:rust" },
    { name: "Go", level: 70, icon: "skill-icons:golang" },
    { name: "TailwindCSS", level: 92, icon: "skill-icons:tailwindcss-dark" },
    { name: "Prisma", level: 80, icon: "skill-icons:prisma" },
  ]
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ["hero", "about", "skills", "contact"]
          const scrollPosition = window.scrollY + 100

          // Show/hide scroll to top button
          setShowScrollTop(window.scrollY > 400)

          for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
              const { offsetTop, offsetHeight } = element
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section)
                break
              }
            }
          }

          ticking = false
        })
        ticking = true
      }
    }

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background grid-bg overflow-x-hidden">
      {/* Animated progress bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left scale-x-0"
        style={{ background: `linear-gradient(to right, var(--ds-blue-600), var(--ds-blue-300))` }}
      />

      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-border/50 z-40 nav-bar">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div
              className="geist-h3 geist-mono bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent logo-text cursor-pointer hover:scale-105 transition-transform"
              style={{
                background: `linear-gradient(to right, var(--ds-blue-600), var(--ds-blue-300))`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TypeFlu
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-8">
                {["About", "Skills", "Contact"].map(item => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`geist-body transition-all duration-300 hover:text-primary font-medium ${
                      activeSection === item.toLowerCase()
                        ? "border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={{
                      color:
                        activeSection === item.toLowerCase() ? "var(--ds-blue-600)" : undefined,
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Icon
                  icon={isMobileMenuOpen ? "carbon:close" : "carbon:menu"}
                  className="h-6 w-6"
                />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 animate-slide-down">
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-4">
                  {["About", "Skills", "Contact"].map(item => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className={`transition-all duration-300 hover:text-primary font-medium py-2 ${
                        activeSection === item.toLowerCase()
                          ? "text-primary border-l-2 border-primary pl-4"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section
        ref={heroRef}
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-24 animate-on-scroll"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div
              ref={avatarRef}
              className="hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 ring-4 ring-[var(--ds-blue-600)]/30 shadow-2xl border-2 border-background/50 mx-auto rounded-full overflow-hidden">
                <Image
                  src="/avatar.png"
                  alt="Saksham Singla - Full Stack Developer"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
          </div>

          <div ref={heroTextRef} className="space-y-6 opacity-0">
            <h1
              className="geist-display-1 md:text-8xl geist-mono mb-6"
              style={{
                background: `linear-gradient(to right, var(--ds-blue-600), var(--ds-blue-300), var(--ds-blue-600))`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <span className="inline-block">Saksham</span>{" "}
              <span className="inline-block">Singla</span>
            </h1>
            <div className="flex items-center justify-center gap-2 geist-h2 mb-8">
              <div className="animate-spin-slow">
                <Icon icon="carbon:code" style={{ color: "var(--ds-blue-600)" }} />
              </div>
              <span
                className="geist-mono font-bold"
                style={{
                  background: `linear-gradient(to right, var(--ds-blue-600), var(--ds-blue-300), var(--ds-blue-600))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Full Stack Developer
              </span>
            </div>
            <p className="geist-body-large text-muted-foreground mb-6 max-w-3xl mx-auto px-4">
              Crafting exceptional digital experiences with modern technologies like TypeScript,
              React, Next.js, Vue.js, Rust, and Go. Building the future, one line of code at a time.
            </p>{" "}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 px-4">
              <div className="hover:scale-105 transition-transform duration-300">
                <Button
                  size="lg"
                  className="w-full sm:w-auto group text-white hover:shadow-2xl transition-all duration-500 border-0"
                  style={{
                    background: `linear-gradient(to right, var(--ds-blue-600), var(--ds-blue-300))`,
                  }}
                  onClick={() => window.open("https://github.com/typeflu", "_blank")}
                >
                  <div className="animate-spin-slow">
                    <Icon icon="mdi:github" className="mr-2 h-5 w-5" />
                  </div>
                  View GitHub
                </Button>
              </div>

              <div className="hover:scale-105 transition-transform duration-300">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto group border-2 transition-all duration-300 bg-transparent hover:text-white"
                  style={{
                    borderColor: "var(--ds-blue-600)",
                    color: "var(--ds-blue-600)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `linear-gradient(to right, var(--ds-blue-600), var(--ds-blue-300))`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent"
                  }}
                  onClick={() => window.open("https://t.me/typeflu", "_blank")}
                >
                  <div className="animate-pulse">
                    <Icon icon="mdi:telegram" className="mr-2 h-5 w-5" />
                  </div>
                  Telegram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold font-mono text-center mb-16 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="max-w-6xl mx-auto">
            <Card className="p-8 shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="space-y-8">
                <p className="text-xl leading-relaxed text-center max-w-4xl mx-auto">
                  I&apos;m a passionate full-stack developer with expertise in modern web
                  technologies. I love building scalable applications that solve real-world problems
                  and create exceptional user experiences.
                </p>

                <div className="grid md:grid-cols-2 gap-12 mt-12">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center">
                      <Icon icon="carbon:code" className="mr-3 h-6 w-6 text-primary" />
                      Frontend Expertise
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Specializing in React, Next.js, Vue.js, and TypeScript to create responsive,
                      interactive user interfaces with modern design systems and exceptional
                      performance.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center">
                      <Icon icon="carbon:server" className="mr-3 h-6 w-6 text-accent" />
                      Backend Development
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Building robust APIs and services with Go, Rust, and Node.js, focusing on
                      performance, scalability, and maintainability with modern database solutions.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-border/50">
                  {/* Removed old prebuilt image references. All links are now direct and do not use public images. */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="py-24 bg-gradient-to-br from-background via-muted/10 to-background animate-on-scroll"
      >
        <div className="container mx-auto px-4">
          <h2
            className="geist-display-2 geist-mono text-center mb-16"
            style={{
              background: `linear-gradient(to right, var(--ds-blue-600), var(--ds-blue-300), var(--ds-blue-600))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Technical Skills
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-on-scroll">
              {techStack.map(tech => (
                <div key={tech.name} className="group animate-on-scroll">
                  <Card className="p-6 border border-border/20 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, var(--ds-blue-600)/5, transparent, var(--ds-blue-300)/5)`,
                      }}
                    />
                    <CardContent className="space-y-4 relative z-10 p-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="group-hover:scale-110 transition-transform duration-300">
                            <Icon
                              icon={tech.icon}
                              className="text-4xl transition-all duration-300"
                              style={{ color: "var(--ds-blue-600)" }}
                            />
                          </div>
                          <span
                            className="geist-h4 text-foreground group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                            style={{
                              backgroundImage: `linear-gradient(to right, var(--ds-blue-600), var(--ds-blue-300))`,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            {tech.name}
                          </span>
                        </div>
                        <span
                          className="geist-caption geist-mono px-2 py-1 rounded-md bg-muted/80 text-muted-foreground group-hover:bg-opacity-100 transition-all duration-300"
                          style={{
                            backgroundColor: "var(--ds-blue-600)/10",
                            color: "var(--ds-blue-600)",
                          }}
                        >
                          {tech.level}%
                        </span>
                      </div>
                      <div className="w-full">
                        <Progress
                          value={tech.level}
                          className="h-2 bg-muted/50"
                          style={
                            {
                              "--progress-foreground": `linear-gradient(to right, var(--ds-blue-600), var(--ds-blue-300))`,
                            } as React.CSSProperties
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2
            className="geist-display-2 geist-mono text-center mb-16 animate-on-scroll"
            style={{
              background: `linear-gradient(135deg, var(--ds-blue-600), var(--ds-blue-300), var(--ds-blue-600))`,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-shift 3s ease-in-out infinite",
            }}
          >
            Let&apos;s Connect
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="geist-body-large text-muted-foreground mb-12 max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities and exciting projects. Let&apos;s
              discuss how we can work together to build something amazing!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Primary Email Button */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
                <Button
                  size="lg"
                  className="relative h-20 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white border-0 rounded-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl"
                  onClick={() =>
                    window.open("mailto:typeflu@gmail.com?subject=Hello%20Saksham", "_self")
                  }
                >
                  <div className="flex items-center justify-center space-x-4">
                    <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-all duration-300">
                      <Icon
                        icon="mdi:email"
                        className="h-7 w-7 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-left">
                      <div className="geist-h4 font-medium">Let&apos;s Talk</div>
                      <div className="geist-caption opacity-90 font-mono">typeflu@gmail.com</div>
                    </div>
                  </div>
                </Button>
              </div>

              {/* Telegram Button */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                <Button
                  variant="outline"
                  size="lg"
                  className="relative h-20 w-full border-2 border-blue-200 hover:border-cyan-400 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 rounded-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl backdrop-blur-sm"
                  onClick={() => window.open("https://t.me/typeflu", "_blank")}
                >
                  <div className="flex items-center justify-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-300">
                      <Icon
                        icon="mdi:telegram"
                        className="h-7 w-7 text-cyan-500 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-left">
                      <div className="geist-h4 font-medium text-foreground group-hover:text-cyan-500 transition-colors duration-300">
                        Quick Chat
                      </div>
                      <div className="geist-caption opacity-70 font-mono text-muted-foreground">
                        @typeflu
                      </div>
                    </div>
                  </div>
                </Button>
              </div>

              {/* GitHub Button */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 via-gray-800 to-black rounded-2xl blur-sm opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                <Button
                  variant="outline"
                  size="lg"
                  className="relative h-20 w-full border-2 border-gray-200 hover:border-gray-400 bg-white/5 hover:bg-gradient-to-r hover:from-gray-500/10 hover:to-gray-700/10 rounded-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl backdrop-blur-sm"
                  onClick={() => window.open("https://github.com/typeflu", "_blank")}
                >
                  <div className="flex items-center justify-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-gray-500/10 to-gray-700/10 rounded-full group-hover:from-gray-500/20 group-hover:to-gray-700/20 transition-all duration-300">
                      <Icon
                        icon="mdi:github"
                        className="h-7 w-7 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-gray-200 group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                    <div className="text-left">
                      <div className="geist-h4 font-medium text-foreground group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        View Code
                      </div>
                      <div className="geist-caption opacity-70 font-mono text-muted-foreground">
                        @typeflu
                      </div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative py-20 border-t border-border/50 bg-gradient-to-br from-background via-muted/5 to-background overflow-hidden animate-on-scroll">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5 animate-gradient" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8 animate-on-scroll">
            {/* Logo and brand */}
            <div className="space-y-4">
              <h3
                className="geist-display-3 geist-mono"
                style={{
                  background: `linear-gradient(to right, var(--ds-blue-600), var(--ds-blue-300), var(--ds-blue-600))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                TypeFlu
              </h3>
              <p className="geist-body text-muted-foreground max-w-md mx-auto">
                Crafting exceptional digital experiences with passion and precision.
              </p>
            </div>

            {/* Social links */}
            <div className="flex justify-center space-x-6 animate-on-scroll">
              {[
                { icon: "mdi:github", url: "https://github.com/typeflu", label: "GitHub" },
                { icon: "mdi:telegram", url: "https://t.me/typeflu", label: "Telegram" },
                { icon: "mdi:email", url: "mailto:typeflu@gmail.com", label: "Email" },
              ].map(social => (
                <a
                  key={social.label}
                  href={social.url}
                  target={social.label !== "Email" ? "_blank" : "_self"}
                  className="group p-3 rounded-full bg-muted/20 hover:bg-opacity-80 transition-all duration-300 hover:scale-110"
                  style={
                    {
                      "--hover-bg": `var(--ds-blue-600)`,
                      "--hover-opacity": "0.1",
                    } as React.CSSProperties
                  }
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = "var(--ds-blue-600)"
                    e.currentTarget.style.opacity = "0.1"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = ""
                    e.currentTarget.style.opacity = ""
                  }}
                >
                  <Icon
                    icon={social.icon}
                    className="h-6 w-6 text-muted-foreground group-hover:text-[var(--ds-blue-600)] transition-colors duration-300"
                  />
                </a>
              ))}
            </div>

            {/* Copyright and powered by */}
            <div className="space-y-4 pt-8 border-t border-border/30 animate-on-scroll">
              <p className="geist-body text-foreground font-bold hover:scale-105 transition-transform duration-200">
                © 2025 TypeFlu • Released under MIT Licence
              </p>

              <div className="flex justify-center items-center">
                <a
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  target="_blank"
                  rel="noreferrer"
                  title="vercel.com homepage"
                  href="https://vercel.com"
                >
                  Powered by
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 283 64"
                    height="20"
                    className="ml-1"
                  >
                    <path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99m-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99m-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10m82.48-29v46h-9V5zM36.95 0 73.9 64H0zm92.38 5-27.71 48L73.91 5H84.3l17.32 30 17.32-30zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <div className="fixed bottom-8 right-8 z-50 opacity-100 scale-100 transition-all duration-300">
          <div className="hover:scale-110 hover:rotate-12 transition-all duration-300">
            <Button
              onClick={scrollToTop}
              className="w-14 h-14 rounded-full hover:shadow-2xl border-0 relative overflow-hidden group text-white"
              style={{
                background: `linear-gradient(to right, var(--ds-blue-600), var(--ds-blue-300))`,
              }}
              size="icon"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to right, var(--ds-blue-300), var(--ds-blue-600))`,
                }}
              />
              <div className="relative z-10 animate-bounce">
                <Icon icon="carbon:chevron-up" className="h-6 w-6 text-white" />
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
