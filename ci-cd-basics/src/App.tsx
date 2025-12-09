import  { useState, useEffect } from 'react';

function App() {

  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'portfolio', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-black">
              VOICE PRO
            </div>
            <div className="hidden md:flex space-x-8">
              {['hero', 'services', 'portfolio', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-300 ${
                    activeSection === section 
                      ? 'text-black font-semibold border-b-2 border-black' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-black">
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Alexandra Rivers - Professional Voice Over Artist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-black">
            Alexandra Rivers
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Professional Voice Over Artist bringing stories to life with emotion, clarity, and passion
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('portfolio')}
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Listen to My Work
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Geometric elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-black rounded-full"></div>
        <div className="absolute top-40 right-20 w-6 h-6 border-2 border-black"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-black rotate-45"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-black">
              Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional voice over services tailored to your project's unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Commercial Voice Over",
                description: "Engaging commercial narrations that captivate audiences and drive results",
                icon: "🎯"
              },
              {
                title: "Audiobook Narration",
                description: "Compelling storytelling that brings characters to life with emotion and clarity",
                icon: "📚"
              },
              {
                title: "Corporate Training",
                description: "Professional training materials with clear, authoritative delivery",
                icon: "💼"
              },
              {
                title: "Character Voices",
                description: "Dynamic character performances for animation, games, and interactive media",
                icon: "🎭"
              },
              {
                title: "Explainer Videos",
                description: "Clear, engaging narrations that simplify complex concepts",
                icon: "🎬"
              },
              {
                title: "IVR & Phone Systems",
                description: "Professional phone greetings and IVR messages with perfect clarity",
                icon: "📞"
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-black">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-black">
              Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Listen to samples of my recent work across different industries and styles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Luxury Car Commercial", type: "Commercial", duration: "0:30" },
              { title: "Tech Startup Explainer", type: "Explainer", duration: "2:15" },
              { title: "Fantasy Audiobook Chapter", type: "Audiobook", duration: "5:42" },
              { title: "Corporate Training Module", type: "Corporate", duration: "3:20" },
              { title: "Animated Character Voices", type: "Animation", duration: "1:45" },
              { title: "IVR System Greeting", type: "Phone System", duration: "0:45" }
            ].map((sample, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500">{sample.duration}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-black">{sample.title}</h3>
                <p className="text-gray-600 mb-4">{sample.type}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-black text-sm">★</span>
                    ))}
                  </div>
                  <button className="text-black hover:text-gray-600 text-sm font-medium">
                    Listen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 text-black">
                About Me
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With over 8 years of professional voice over experience, I specialize in creating 
                compelling audio content that connects with audiences on an emotional level.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                My versatile voice has been featured in commercials for major brands, narrated 
                bestselling audiobooks, and brought countless characters to life in animation and gaming.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-2">500+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-2">50+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
              </div>

              <button className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Download Resume
              </button>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 rounded-2xl overflow-hidden border-4 border-black">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Professional Voice Over Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Geometric elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-black"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-black rotate-45"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6 text-black">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Ready to bring your project to life? Get in touch and let's discuss how I can help you create amazing audio content.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { label: "Email", value: "hello@alexandrarivers.com", icon: "📧" },
              { label: "Phone", value: "+1 (555) 123-4567", icon: "📱" },
              { label: "Studio", value: "Professional Home Studio", icon: "🎤" }
            ].map((contact, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl mb-3">{contact.icon}</div>
                <div className="text-black font-semibold mb-1">{contact.label}</div>
                <div className="text-gray-600">{contact.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-black">Get a Quote</h3>
            <p className="text-gray-600 mb-6">
              Ready to start your project? Contact me for a personalized quote and consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Send Message
              </button>
              <button className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-300 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-black mb-4 md:mb-0">
              VOICE PRO
            </div>
            <div className="text-gray-600">
              © 2024 Alexandra Rivers. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
