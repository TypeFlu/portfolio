"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@iconify/react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [githubProfile, setGithubProfile] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.01
  })

  useEffect(() => {
    fetch("https://api.github.com/users/typeflu")
      .then((res) => res.json())
      .then((data) => {
        console.log("GitHub profile fetched:", data);
        setGithubProfile(data);
      })
      .catch((err) => {
        console.error("Failed to fetch GitHub profile:", err);
        // Set a fallback so avatar still shows
        setGithubProfile({ avatar_url: "/avatar.png" });
      })
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

      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 300)

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div className="min-h-screen bg-background grid-bg overflow-x-hidden">
      {/* Animated progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50 origin-left"
        style={{ scaleX }}
      />
      


      <motion.nav 
        className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-border/50 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="font-bold text-xl font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              TypeFlu
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-8">
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
                  {["About", "Skills", "Contact"].map((item) => (
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
      </motion.nav>

  <motion.section 
    id="hero" 
    className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-24"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Avatar 
                className="w-32 h-32 sm:w-40 sm:h-40 ring-4 ring-primary/20 shadow-xl border-2 border-background/50 mx-auto"
              >
                <AvatarImage 
                  src={githubProfile?.avatar_url || "/avatar.png"} 
                  alt="Saksham Singla" 
                />
                <AvatarFallback className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-accent text-white">
                  TS
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h1 
              className="text-4xl sm:text-6xl md:text-8xl font-bold font-mono mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.span
                initial={{ display: "inline-block", y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Saksham
              </motion.span>{" "}
              <motion.span
                initial={{ display: "inline-block", y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Singla
              </motion.span>
            </motion.h1>
            
            <motion.div 
              className="flex items-center justify-center gap-2 text-xl sm:text-2xl md:text-3xl mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Icon icon="carbon:code" className="text-primary" />
              </motion.div>
              <motion.span 
                className="font-mono bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-bold"
                animate={{ 
                  backgroundPosition: ["0%", "100%", "0%"],
                  opacity: 1,
                  x: 0
                }}
                transition={{ 
                  backgroundPosition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.6, delay: 1.4 },
                  x: { duration: 0.6, delay: 1.4 }
                }}
                initial={{ opacity: 0, x: -20 }}
              >
                Full Stack Developer
              </motion.span>
            </motion.div>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              Crafting exceptional digital experiences with modern technologies like TypeScript, React, Next.js, Vue.js,
              Rust, and Go. Building the future, one line of code at a time.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto group bg-gradient-to-r from-primary to-accent hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open("https://github.com/typeflu", "_blank")}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon icon="mdi:github" className="mr-2 h-5 w-5" />
                    </motion.div>
                    View GitHub
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto group border-2 hover:bg-primary/10 transition-all duration-300 bg-transparent"
                    onClick={() => window.open("https://t.me/typeflu", "_blank")}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Icon icon="mdi:telegram" className="mr-2 h-5 w-5" />
                    </motion.div>
                    Telegram
                  </Button>
                </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

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

      <motion.section 
        id="skills" 
        className="py-24 bg-gradient-to-br from-background via-muted/10 to-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-6xl font-bold font-mono text-center mb-16 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Technical Skills
          </motion.h2>
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className="group p-6 border-0 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm hover:bg-gradient-to-br hover:from-primary/5 hover:via-accent/5 hover:to-primary/5 transition-all duration-500 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />
                    <CardContent className="space-y-6 relative z-10">
                      <motion.div 
                        className="flex items-center justify-between"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ 
                              rotate: 360,
                              scale: 1.2
                            }}
                            transition={{ 
                              duration: 0.6,
                              type: "spring",
                              stiffness: 200 
                            }}
                          >
                            <Icon
                              icon={tech.icon}
                              className="text-5xl group-hover:drop-shadow-lg transition-all duration-300"
                            />
                          </motion.div>
                          <motion.span 
                            className="font-bold text-xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech.name}
                          </motion.span>
                        </div>
                        <motion.span 
                          className="text-sm text-muted-foreground font-mono bg-muted/50 px-3 py-2 rounded-full group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech.level}%
                        </motion.span>
                      </motion.div>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1, 
                          delay: index * 0.1 + 0.3,
                          ease: "easeOut"
                        }}
                        className="origin-left"
                      >
                        <Progress 
                          value={tech.level} 
                          className="h-4 bg-muted/30 group-hover:bg-muted/50 transition-colors duration-300"
                        />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

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
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <Button
                size="lg"
                className="group h-16 bg-gradient-to-r from-primary to-accent hover:shadow-xl transition-all duration-300"
                onClick={() => window.open("mailto:typeflu@gmail.com?subject=Hello%20Saksham", "_self")}
              >
                <Icon icon="mdi:email" className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-sm opacity-80">Email</div>
                  <div className="font-mono text-xs sm:text-sm">TypeFlu@gmail.com</div>
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
                  <div className="font-mono text-xs sm:text-sm">@TypeFlu</div>
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
                  <div className="font-mono text-xs sm:text-sm">@TypeFlu</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <motion.footer 
        className="relative py-20 border-t border-border/50 bg-gradient-to-br from-background via-muted/5 to-background overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center space-y-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo and brand */}
            <motion.div
              className="space-y-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.h3 
                className="text-4xl font-bold font-mono bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0%", "100%", "0%"]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                TypeFlu
              </motion.h3>
              <motion.p 
                className="text-muted-foreground max-w-md mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Crafting exceptional digital experiences with passion and precision.
              </motion.p>
            </motion.div>

            {/* Social links */}
            <motion.div 
              className="flex justify-center space-x-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {[
                { icon: "mdi:github", url: "https://github.com/typeflu", label: "GitHub" },
                { icon: "mdi:telegram", url: "https://t.me/typeflu", label: "Telegram" },
                { icon: "mdi:email", url: "mailto:typeflu@gmail.com", label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target={social.label !== "Email" ? "_blank" : "_self"}
                  className="group p-3 rounded-full bg-muted/20 hover:bg-primary/20 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    backgroundColor: "rgba(99, 102, 241, 0.2)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: index * 2
                    }}
                  >
                    <Icon 
                      icon={social.icon} 
                      className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" 
                    />
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>

            {/* Copyright and powered by */}
            <motion.div 
              className="space-y-4 pt-8 border-t border-border/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.p 
                className="text-foreground font-bold text-base"
                whileHover={{ scale: 1.05 }}
              >
                © 2025 TypeFlu • Released under MIT Licence
              </motion.p>
              
              <motion.div 
                className="flex justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
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
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20 
            }}
            className="fixed bottom-8 right-8 z-50"
          >
            <motion.div
              whileHover={{ 
                scale: 1.1,
                rotate: 360,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={scrollToTop}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-2xl border-0 relative overflow-hidden group"
                size="icon"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative z-10"
                >
                  <Icon icon="carbon:chevron-up" className="h-6 w-6 text-white" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
