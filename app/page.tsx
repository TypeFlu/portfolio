"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Icon } from "@iconify/react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [githubProfile, setGithubProfile] = useState<any>(null)

  useEffect(() => {
    fetch("https://api.github.com/users/typeflu")
      .then((res) => res.json())
      .then((data) => setGithubProfile(data))
      .catch((err) => console.error("Failed to fetch GitHub profile:", err))
  }, [])

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
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

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
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background grid-bg">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-border/50 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TypeFlu
            </div>
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`transition-all duration-300 hover:text-primary font-medium ${
                    activeSection === item.toLowerCase()
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

  <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-slide-up">
            <Avatar className="w-40 h-40 mx-auto mb-8 ring-4 ring-primary/30 shadow-2xl animate-float overflow-hidden">
              <AvatarImage
                src={githubProfile?.avatar_url}
                alt="Saksham Singla"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
              <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                SS
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-6 animate-slide-up">
            <h1 className="text-6xl md:text-8xl font-bold font-mono mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
              Saksham Singla
            </h1>
            <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl text-muted-foreground mb-8">
              <Icon icon="carbon:code" className="text-primary" />
              <span className="font-mono">Full Stack Developer</span>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
              Crafting exceptional digital experiences with modern technologies like TypeScript, React, Next.js, Vue.js,
              Rust, and Go. Building the future, one line of code at a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-2">
                <Button
                  size="lg"
                  className="group animate-glow bg-gradient-to-r from-primary to-accent hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open("https://github.com/typeflu", "_blank")}
                >
                  <Icon icon="mdi:github" className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  View GitHub
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-2 hover:bg-primary/10 transition-all duration-300 bg-transparent"
                  onClick={() => window.open("https://t.me/typeflu", "_blank")}
                >
                  <Icon icon="mdi:telegram" className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Telegram
                </Button>
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
                  I'm a passionate full-stack developer with expertise in modern web technologies. I love building
                  scalable applications that solve real-world problems and create exceptional user experiences.
                </p>

                <div className="grid md:grid-cols-2 gap-12 mt-12">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center">
                      <Icon icon="carbon:code" className="mr-3 h-6 w-6 text-primary" />
                      Frontend Expertise
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Specializing in React, Next.js, Vue.js, and TypeScript to create responsive, interactive user
                      interfaces with modern design systems and exceptional performance.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center">
                      <Icon icon="carbon:server" className="mr-3 h-6 w-6 text-accent" />
                      Backend Development
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Building robust APIs and services with Go, Rust, and Node.js, focusing on performance,
                      scalability, and maintainability with modern database solutions.
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

      <section id="skills" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold font-mono text-center mb-16 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techStack.map((tech, index) => (
                <Card
                  key={tech.name}
                  className="group p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-card/80 backdrop-blur-sm hover:bg-card"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Icon
                          icon={tech.icon}
                          className="text-4xl group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="font-semibold text-lg">{tech.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                        {tech.level}%
                      </span>
                    </div>
                    <Progress value={tech.level} className="h-3 bg-muted/50" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold font-mono text-center mb-16 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together
              to build something amazing!
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Button
                size="lg"
                className="group h-16 bg-gradient-to-r from-primary to-accent hover:shadow-xl transition-all duration-300"
                onClick={() => window.open("mailto:typeflu@gmail.com?subject=Hello%20Saksham", "_self")}
              >
                <Icon icon="mdi:email" className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-sm opacity-80">Email</div>
                  <div className="font-mono">TypeFlu@gmail.com</div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group h-16 border-2 hover:bg-primary/10 transition-all duration-300 bg-transparent"
                onClick={() => window.open("https://t.me/typeflu", "_blank")}
              >
                <Icon icon="mdi:telegram" className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform text-primary" />
                <div className="text-left">
                  <div className="text-sm opacity-80">Telegram</div>
                  <div className="font-mono">@TypeFlu</div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group h-16 border-2 hover:bg-accent/10 transition-all duration-300 bg-transparent"
                onClick={() => window.open("https://github.com/typeflu", "_blank")}
              >
                <Icon icon="mdi:github" className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform text-accent" />
                <div className="text-left">
                  <div className="text-sm opacity-80">GitHub</div>
                  <div className="font-mono">@TypeFlu</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground font-mono text-sm">
            © Saksham Singla, MIT License
          </p>
        </div>
      </footer>
    </div>
  )
}
