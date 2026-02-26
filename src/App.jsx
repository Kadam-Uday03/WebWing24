import React, { useEffect } from 'react';
import Hero from './components/Hero';
import { MotionCarousel } from './components/MotionCarousel';
import AboutSection from './components/AboutSection';

const portfolioItems = [
  { id: 1, img: "assets/img/portfolio/nakshe-dekho.png", title: "Nakshe Dekho" },
  { id: 2, img: "assets/img/portfolio/edition-studio.png", title: "Edition Studio" },
];

function App() {
  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 1000, once: true });
    if (window.GLightbox) window.GLightbox({ selector: '.glightbox' });
    if (window.Swiper) {
      new window.Swiper('.init-swiper', {
        loop: true,
        autoplay: { delay: 5000 },
        slidesPerView: "auto",
        pagination: { el: ".swiper-pagination", clickable: true }
      });
    }

    // SlideTabs Logic
    const navMenu = document.querySelector('.navmenu');
    const navPill = document.querySelector('.nav-pill');
    const navLinks = document.querySelectorAll('.navmenu a');

    if (navMenu && navPill) {
      const updatePill = (el) => {
        if (!el) {
          navPill.style.opacity = '0';
          return;
        }
        const rect = el.getBoundingClientRect();
        const navRect = navMenu.getBoundingClientRect();

        // Horizontal position
        navPill.style.width = `${rect.width + 20}px`; // Add some padding for better look
        navPill.style.left = `${rect.left - navRect.left - 10}px`;

        // Vertical center
        navPill.style.top = `${rect.top - navRect.top + (rect.height / 2) - 18}px`; // 18 is half of pill height (36px)

        navPill.style.opacity = '1';
      };

      // Set initial position with a slight delay to ensure layout is ready
      setTimeout(() => {
        const activeLink = document.querySelector('.navmenu a.active');
        if (activeLink) updatePill(activeLink);
      }, 500);

      navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => updatePill(link));
        link.addEventListener('click', () => {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          updatePill(link);
        });
      });

      navMenu.addEventListener('mouseleave', () => {
        const currentActive = document.querySelector('.navmenu a.active');
        updatePill(currentActive);
      });
    }

    // Scroll Logic for Navbar Background
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="index-page">
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="index.html" className="logo d-flex align-items-center me-auto">
            <img src="assets/img/logo.png" alt="logo" />
            <h1 className="sitename">Webwing24</h1>
          </a>
          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="#hero" className="active">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <div className="nav-pill"></div>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
          <a className="cta-btn" href="#contact">Request a Quote</a>
        </div>
      </header>

      <main className="main">
        <Hero />

        {/* New About Us Section */}
        <AboutSection />

        {/* Why Choose Section */}
        <section id="why-choose" className="why-choose-us section">
          <div className="container">
            <div className="row align-items-center" data-aos="fade-up">
              <div className="col-lg-6"><h2 className="why-title">Why<br />Choose Us</h2></div>
              <div className="col-lg-6">
                <p className="why-top-desc">Premium digital services committed to excellence. We empower brands with innovative strategies.</p>
              </div>
            </div>
            <div className="why-main-layout">
              <div className="why-side left" data-aos="fade-right">
                <div className="why-item"><h4>Digital Strategists</h4><p>In-depth understanding of market trends.</p></div>
                <div className="why-item"><h4>Tailored Solutions</h4><p>Customized digital ecosystems for your goals.</p></div>
              </div>
              <div className="why-center-image" data-aos="zoom-in">
                <div className="curved-img-wrapper"><img src="assets/img/about.jpg" alt="About" /></div>
              </div>
              <div className="why-side right" data-aos="fade-left">
                <div className="why-item"><h4>Track Record</h4><p>Consistent history of high-impact projects.</p></div>
                <div className="why-item"><h4>Creative Excellence</h4><p>Trusted industry leaders in quality results.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="features section">
          <div className="container">
            <div className="section-title" data-aos="fade-up"><h2>Services</h2><p>Our Expert Solutions</p></div>
            <div className="row gy-4">
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                <div className="service-item item-cyan overflow-hidden h-100 p-4 border rounded">
                  <i className="bi bi-code-slash icon fs-1"></i>
                  <h4>Web Development</h4>
                  <p>Custom high-performance websites tailored to your business.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                <div className="service-item item-orange overflow-hidden h-100 p-4 border rounded">
                  <i className="bi bi-camera-reels icon fs-1"></i>
                  <h4>Video Editing</h4>
                  <p>Professional video production and post-processing.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                <div className="service-item item-teal overflow-hidden h-100 p-4 border rounded">
                  <i className="bi bi-window-stack icon fs-1"></i>
                  <h4>UI/UX Design</h4>
                  <p>User-centered designs focused on conversion and experience.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className="contact section">
          <div className="container section-title" data-aos="fade-up"><h2>Contact</h2><p>Get a Quote</p></div>
          <div className="container" data-aos="fade-up">
            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="info-item border p-4 text-center rounded">
                  <i className="bi bi-geo-alt fs-2"></i>
                  <h3>Address</h3><p>Indore, Madhya Pradesh, India</p>
                </div>
              </div>
              <div className="col-lg-6">
                <form className="php-email-form border p-4 rounded">
                  <input type="text" className="form-control mb-3" placeholder="Name" required />
                  <input type="email" className="form-control mb-3" placeholder="Email" required />
                  <textarea className="form-control mb-3" rows="4" placeholder="Message" required></textarea>
                  <button type="submit" className="btn btn-primary w-100">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="footer dark-background">
        <div className="container text-center py-4">
          <p>© <span>Copyright</span> <strong className="px-1">Webwing24</strong> <span>All Rights Reserved</span></p>
          <p>Designed by Uday Kadam</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
