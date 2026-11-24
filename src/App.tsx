
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./App.css";

const skills = [
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Python",
  "React",
  "AI Automation",
  "Creative Coding",
  "Problem Solving",
];

const projects = [
  {
    number: "01",
    name: "AI AUTOMATION HUB",
    description:
      "Exploring intelligent workflows, automation systems and AI-powered tools.",
    tags: ["AI", "AUTOMATION", "WORKFLOWS"],
  },
  {
    number: "02",
    name: "3D PORTFOLIO",
    description:
      "An immersive digital universe built with web technologies and creative 3D.",
    tags: ["THREE.JS", "REACT", "3D"],
  },
  {
    number: "03",
    name: "CREATIVE EXPERIMENTS",
    description:
      "Interactive experiments, creative coding and ideas brought to life.",
    tags: ["DESIGN", "CODE", "EXPERIMENTS"],
  },
];

const journeyItems = [
  {
    date: "2026 — PRESENT",
    title: "COMPUTER SCIENCE STUDENT",
    description:
      "Beginning my journey in technology, learning programming and exploring the world of computer science.",
  },
  {
    date: "2025 — 2026",
    title: "EXPLORING PROGRAMMING",
    description:
      "Discovering HTML, CSS, Python, web development and the endless possibilities of technology.",
  },
  {
    date: "THE BEGINNING",
    title: "CURIOSITY STARTED IT ALL",
    description:
      "A curiosity about how technology works turned into a journey of learning, creating and experimenting.",
  },
];

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // LOADING SCREEN
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((previous) => {
        const next = Math.min(previous + Math.random() * 9 + 2, 100);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
        }

        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // THREE.JS SPACE BACKGROUND
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#03020a");
    scene.fog = new THREE.FogExp2("#03020a", 0.0007);

    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );

    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // STARS
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 4500;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 1000;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
      starSizes[i] = Math.random() * 1.8 + 0.3;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );

    starGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(starSizes, 1)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: "#d7c5ff",
      size: 1.3,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // PURPLE NEBULA
    const nebulaGroup = new THREE.Group();

    const nebulaColors = [
      "#5414a8",
      "#351075",
      "#7b28ca",
      "#24104c",
      "#a04bff",
    ];

    for (let i = 0; i < 18; i++) {
      const geometry = new THREE.SphereGeometry(
        Math.random() * 12 + 7,
        20,
        20
      );

      const material = new THREE.MeshBasicMaterial({
        color: nebulaColors[i % nebulaColors.length],
        transparent: true,
        opacity: 0.035,
      });

      const cloud = new THREE.Mesh(geometry, material);

      cloud.position.set(
        (Math.random() - 0.5) * 180,
        (Math.random() - 0.5) * 150,
        -100 - Math.random() * 220
      );

      cloud.scale.set(
        1 + Math.random() * 2,
        0.5 + Math.random(),
        0.5 + Math.random()
      );

      nebulaGroup.add(cloud);
    }

    scene.add(nebulaGroup);

    // DISTANT GALAXY
    const galaxyGroup = new THREE.Group();
    const galaxyParticles = 2800;
    const galaxyGeometry = new THREE.BufferGeometry();
    const galaxyPositions = new Float32Array(galaxyParticles * 3);

    for (let i = 0; i < galaxyParticles; i++) {
      const radius = Math.random() * 75;
      const angle = radius * 0.12 + Math.random() * 0.5;

      galaxyPositions[i * 3] = Math.cos(angle) * radius;
      galaxyPositions[i * 3 + 1] =
        (Math.random() - 0.5) * (radius * 0.12);
      galaxyPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    galaxyGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(galaxyPositions, 3)
    );

    const galaxyMaterial = new THREE.PointsMaterial({
      color: "#9b5cff",
      size: 0.8,
      transparent: true,
      opacity: 0.6,
    });

    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    galaxyGroup.add(galaxy);
    galaxyGroup.position.set(70, -20, -180);
    galaxyGroup.rotation.x = 0.5;
    scene.add(galaxyGroup);

    // FLOATING 3D OBJECTS
    const floatingObjects = new THREE.Group();

    const shapes: THREE.BufferGeometry[] = [
      new THREE.IcosahedronGeometry(2.2, 1),
      new THREE.OctahedronGeometry(2.5),
      new THREE.TorusGeometry(2.3, 0.5, 12, 32),
      new THREE.TetrahedronGeometry(2.4),
      new THREE.DodecahedronGeometry(2),
    ];

    for (let i = 0; i < 12; i++) {
      const geometry = shapes[i % shapes.length];

      const material = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? "#792cff" : "#24104c",
        metalness: 0.8,
        roughness: 0.25,
        wireframe: i % 3 === 0,
      });

      const object = new THREE.Mesh(geometry, material);

      object.position.set(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 100,
        -30 - Math.random() * 150
      );

      floatingObjects.add(object);
    }

    scene.add(floatingObjects);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight("#8c65ff", 2);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight("#8b24ff", 100, 250);
    purpleLight.position.set(0, 10, 20);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight("#3824ff", 70, 250);
    blueLight.position.set(-50, -20, -40);
    scene.add(blueLight);

    // MOUSE INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // SCROLL INTERACTION
    let scrollProgress = 0;

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      scrollProgress =
        totalHeight > 0 ? window.scrollY / totalHeight : 0;
    };

    window.addEventListener("scroll", handleScroll);

    // RESIZE
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // ANIMATION
    const clock = new THREE.Clock();
    let animationFrame = 0;

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.025;
      targetY += (mouseY - targetY) * 0.025;

      camera.position.x = targetX * 3;
      camera.position.y = -targetY * 3 + scrollProgress * 12;
      camera.position.z = 40 - scrollProgress * 8;

      camera.lookAt(
        targetX * 4,
        -targetY * 3 - scrollProgress * 5,
        -80
      );

      stars.rotation.y = elapsed * 0.008 + targetX * 0.02;
      stars.rotation.x = elapsed * 0.004 + targetY * 0.02;

      galaxyGroup.rotation.y = elapsed * 0.04;
      galaxyGroup.rotation.z = elapsed * 0.02;

      nebulaGroup.rotation.y = elapsed * 0.01;
      nebulaGroup.rotation.x = elapsed * 0.005;

      floatingObjects.rotation.y = elapsed * 0.05;
      floatingObjects.rotation.x = elapsed * 0.025;

      floatingObjects.children.forEach((object, index) => {
        object.position.y += Math.sin(elapsed * 0.5 + index) * 0.006;
        object.rotation.x += 0.002;
        object.rotation.y += 0.003;
      });

      purpleLight.position.x = targetX * 25;
      purpleLight.position.y = -targetY * 20;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      starGeometry.dispose();
      starMaterial.dispose();

      galaxyGeometry.dispose();
      galaxyMaterial.dispose();

      shapes.forEach((geometry) => geometry.dispose());

      floatingObjects.children.forEach((object) => {
        if (object instanceof THREE.Mesh) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      nebulaGroup.children.forEach((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });

      renderer.dispose();
    };
  }, []);

  // TRAVELLING STAR
  useEffect(() => {
    const handleScroll = () => {
      const orb = orbRef.current;
      if (!orb) return;

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        totalHeight > 0 ? window.scrollY / totalHeight : 0;

      const x = 78 + Math.sin(progress * Math.PI * 4) * 25;
      const y = 15 + progress * 70;

      orb.style.left = `${x}%`;
      orb.style.top = `${y}%`;
      orb.style.setProperty("--scroll-rotation", `${progress * 720}deg`);

      setJourneyProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const segmentCount = journeyItems.length - 1;
  const scaledProgress = journeyProgress * segmentCount;

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* LOADER */}
      {loading && (
        <div className="loader-screen">
          <div className="loader-stars"></div>

          <div className="loader-center">
            <div className="loader-orbit">
              <div className="loader-orbit-ring ring-a"></div>
              <div className="loader-orbit-ring ring-b"></div>
              <div className="loader-orbit-ring ring-c"></div>
              <div className="loader-core">CE</div>
            </div>

            <h2>ENTERING THE UNIVERSE</h2>
            <p>INITIALIZING DIGITAL SPACE</p>

            <div className="loader-bar">
              <div
                className="loader-bar-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <span className="loader-percentage">
              {Math.floor(progress)}%
            </span>
          </div>
        </div>
      )}

      {/* SPACE BACKGROUND */}
      <canvas ref={canvasRef} className="space-canvas"></canvas>

      {/* TRAVELLING STAR */}
      <div className="travelling-orb" ref={orbRef}>
        <svg
          viewBox="0 0 24 24"
          className="travelling-star"
          aria-hidden="true"
        >
          <path d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" />
          <circle cx="12" cy="12" r="2" className="star-center" />
        </svg>
      </div>

      {/* NAVIGATION */}
      <header className="navbar">
        <a href="#home" className="nav-logo" onClick={closeMenu}>
          <span>CE</span>
          <div>CHANIKYAEASHWARI</div>
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
        </button>

        <nav className={menuOpen ? "nav-links active" : "nav-links"}>
          <a href="#home" onClick={closeMenu}>HOME</a>
          <a href="#about" onClick={closeMenu}>ABOUT</a>
          <a href="#skills" onClick={closeMenu}>SKILLS</a>
          <a href="#projects" onClick={closeMenu}>PROJECTS</a>
          <a href="#journey" onClick={closeMenu}>JOURNEY</a>
          <a href="#contact" onClick={closeMenu}>CONTACT</a>
        </nav>
      </header>

      <main className={loading ? "website website-loading" : "website website-ready"}>
        {/* HERO */}
        <section className="hero section" id="home">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="status-dot"></span>
              EXPLORING THE DIGITAL UNIVERSE
            </div>

            <h1>
              HEY, I'M
              <br />
              <span className="gradient-name">CHANIKYAEASHWARI.</span>
            </h1>

            <p className="hero-description">
              A computer science student fascinated by technology,
              creativity, and the endless possibilities of the digital world.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="primary-link">
                EXPLORE MY WORK <span>↗</span>
              </a>

              <a href="#contact" className="secondary-link">
                LET'S CONNECT
              </a>
            </div>

            <div className="hero-bottom">
              <span>SCROLL TO EXPLORE</span>
              <div className="scroll-line"></div>
            </div>
          </div>

          <div className="hero-side-label">
            <span>CREATIVE TECHNOLOGY</span>
            <span>01 / 06</span>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section about-section" id="about">
          <div className="section-heading">
            <span className="section-number">01</span>
            <span className="section-label">A LITTLE ABOUT ME</span>
          </div>

          <div className="about-content">
            <h2>
              CURIOUS
              <span className="muted-text"> BY NATURE.</span>
              <br />
              CREATIVE
              <span className="gradient-text"> BY DESIGN.</span>
            </h2>

            <div className="about-description">
              <p>
                I'm a computer science student beginning my journey
                into technology. I love discovering how things work
                and turning ideas into something real.
              </p>

              <p>
                From building websites to experimenting with Python
                and AI automation, I'm constantly learning,
                exploring and creating.
              </p>

              <p className="about-highlight">
                I believe the best ideas begin with curiosity.
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section skills-section" id="skills">
          <div className="section-heading">
            <span className="section-number">02</span>
            <span className="section-label">MY TOOLKIT</span>
          </div>

          <h2 className="section-title">
            THINGS I'M <span className="gradient-text">LEARNING.</span>
          </h2>

          <p className="section-subtitle">
            Exploring technologies, one skill at a time.
          </p>

          <div className="skills-list">
            {skills.map((skill, index) => (
              <div className="skill-item" key={skill}>
                <span className="skill-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="skill-name">{skill}</span>
                <span className="skill-arrow">↗</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section projects-section" id="projects">
          <div className="section-heading">
            <span className="section-number">03</span>
            <span className="section-label">SELECTED EXPLORATIONS</span>
          </div>

          <h2 className="section-title">
            IDEAS INTO <span className="gradient-text">REALITY.</span>
          </h2>

          <p className="section-subtitle">
            A collection of things I'm building and exploring.
          </p>

          <div className="projects-list">
            {projects.map((project) => (
              <article className="project-item" key={project.number}>
                <div className="project-number">{project.number}</div>

                <div className="project-main">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="project-icon">↗</div>
              </article>
            ))}
          </div>
        </section>

        {/* JOURNEY */}
        <section className="section journey-section" id="journey">
          <div className="section-heading">
            <span className="section-number">04</span>
            <span className="section-label">MY JOURNEY</span>
          </div>

          <h2 className="section-title">
            EVERY JOURNEY
            <br />
            <span className="gradient-text">STARTS SOMEWHERE.</span>
          </h2>

          <div className="journey-timeline">
            {journeyItems.map((item, index) => {
              const segmentProgress = Math.max(
                0,
                Math.min(1, scaledProgress - index)
              );

              return (
                <div className="journey-item" key={item.title}>
                  <div className="journey-track">
                    <div
                      className={`journey-dot ${
                        segmentProgress > 0 || journeyProgress === 1
                          ? "active"
                          : ""
                      }`}
                    ></div>

                    {index < journeyItems.length - 1 && (
                      <div className="journey-line">
                        <div
                          className="journey-line-fill"
                          style={{
                            height: `${segmentProgress * 100}%`,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>

                  <div className="journey-content">
                    <span className="journey-date">{item.date}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact-section" id="contact">
          <div className="section-heading">
            <span className="section-number">05</span>
            <span className="section-label">LET'S CONNECT</span>
          </div>

          <h2 className="contact-title">
            HAVE AN IDEA?
            <br />
            <span className="gradient-text">LET'S CREATE.</span>
          </h2>

          <p className="contact-description">
            I'm always curious about new ideas, creative projects
            and opportunities to learn.
          </p>

          <a
            className="email-link"
            href="mailto:thontachanikyaeashwari@gmail.com"
          >
            <span>THONTACHANIKYAEASHWARI@GMAIL.COM</span>
            <span>↗</span>
          </a>

          <div className="social-links">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB ↗
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN ↗
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <a href="#home" className="footer-logo">
            CE.
          </a>

          <span>MADE WITH CURIOSITY & CODE.</span>

          <a href="#home" className="back-top">
            BACK TO TOP ↑
          </a>
        </div>

        <div className="footer-bottom">
          <span>© 2026 CHANIKYAEASHWARI</span>
          <span>EXPLORING THE DIGITAL UNIVERSE</span>
        </div>
      </footer>
    </>
  );
}

export default App;
