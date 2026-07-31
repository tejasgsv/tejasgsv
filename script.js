/* ==========================================================================
   Tejas Goswami - World-Class Ultra-Optimized Portfolio Script
   Canvas Particles Backdrop, CLI Simulation, Scroll Reveal, Dynamic Filters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Floating Cloud Particle Canvas Engine
  const canvas = document.getElementById("particles-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 25), 65);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.8 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // 2. Dynamic Typing Effect for Hero Subtitle
  const roles = [
    "DevOps Engineer @ Reliance Jio",
    "Microsoft Azure Infrastructure Architect",
    "Terraform & IaC Automation Expert",
    "Docker & Kubernetes Container Specialist",
    "DevSecOps & CI/CD Pipeline Engineer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextSpan = document.querySelector(".typed-text");

  function typeEffect() {
    if (!typedTextSpan) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2200; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // 3. Interactive CLI Terminal Engine
  const terminalBody = document.getElementById("terminal-body");
  const terminalInput = document.getElementById("terminal-input");

  const commands = {
    help: () => `
<div class="term-output">
  <span class="term-output-highlight">Available Commands:</span><br>
  &nbsp;&nbsp;<span class="term-user">tejas --skills</span> &nbsp;: List core technical skills & proficiency matrix<br>
  &nbsp;&nbsp;<span class="term-user">az account show</span> &nbsp;: Display Azure Cloud specialization details<br>
  &nbsp;&nbsp;<span class="term-user">kubectl get pods</span> : Check active Kubernetes workload status<br>
  &nbsp;&nbsp;<span class="term-user">terraform plan</span> &nbsp; : View Infrastructure as Code configuration<br>
  &nbsp;&nbsp;<span class="term-user">docker ps</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: View running microservice container instances<br>
  &nbsp;&nbsp;<span class="term-user">helm list</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Check deployed Helm chart releases<br>
  &nbsp;&nbsp;<span class="term-user">uptime</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Display production system uptime statistics<br>
  &nbsp;&nbsp;<span class="term-user">whoami</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Print user identity & credentials<br>
  &nbsp;&nbsp;<span class="term-user">tejas --contact</span> &nbsp;: Get direct email & social handles<br>
  &nbsp;&nbsp;<span class="term-user">clear</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Clear terminal screen
</div>`,

    "tejas --skills": () => `
<div class="term-output">
  <span class="term-output-highlight">☁️ Cloud Platform:</span> Microsoft Azure (VNets, Subnets, VMs, Storage, AKS, Log Analytics)<br>
  <span class="term-output-highlight">⚙️ IaC & Tooling:</span> Terraform Modules, State Locking, Azure CLI, Bash, PowerShell, YAML<br>
  <span class="term-output-highlight">🐳 Containers:</span> Docker, Kubernetes, OpenShift (Learning)<br>
  <span class="term-output-highlight">🚀 CI/CD Pipelines:</span> Azure DevOps, GitHub Actions, Jenkins<br>
  <span class="term-output-highlight">🔒 DevSecOps:</span> Checkov, tfsec, TFLint<br>
  <span class="term-output-highlight">📊 Observability:</span> Azure Monitor, Log Analytics, ELK Stack (Elasticsearch, Logstash, Kibana)
</div>`,

    "az account show": () => `
<div class="term-output">
  {<br>
  &nbsp;&nbsp;"environmentName": <span class="term-output-highlight">"AzureCloud"</span>,<br>
  &nbsp;&nbsp;"engineer": <span class="term-output-highlight">"Tejas Goswami"</span>,<br>
  &nbsp;&nbsp;"role": <span class="term-output-highlight">"DevOps Engineer"</span>,<br>
  &nbsp;&nbsp;"company": <span class="term-output-highlight">"Reliance Jio Infocomm Ltd"</span>,<br>
  &nbsp;&nbsp;"experience": <span class="term-output-highlight">"~2 Years Hands-On"</span>,<br>
  &nbsp;&nbsp;"state": <span class="term-output-highlight">"Enabled / Production Ready"</span><br>
  }
</div>`,

    "kubectl get pods": () => `
<div class="term-output">
  NAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;READY &nbsp;&nbsp;STATUS &nbsp;&nbsp;&nbsp;RESTARTS &nbsp;&nbsp;AGE<br>
  iiot-monitoring-gateway-7b9f8d &nbsp;1/1 &nbsp;&nbsp;&nbsp;&nbsp;Running &nbsp;&nbsp;0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;45d<br>
  noc-dashboard-api-559c6d48-x2 &nbsp;&nbsp;2/2 &nbsp;&nbsp;&nbsp;&nbsp;Running &nbsp;&nbsp;0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;45d<br>
  azure-log-analytics-collector &nbsp;1/1 &nbsp;&nbsp;&nbsp;&nbsp;Running &nbsp;&nbsp;0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;90d
</div>`,

    "terraform plan": () => `
<div class="term-output">
  <span class="term-output-highlight">Terraform will perform the following actions:</span><br>
  &nbsp;&nbsp;<span class="term-prompt">+ azurerm_resource_group.rg_main</span><br>
  &nbsp;&nbsp;<span class="term-prompt">+ azurerm_virtual_network.vnet_production</span><br>
  &nbsp;&nbsp;<span class="term-prompt">+ azurerm_kubernetes_cluster.aks_cluster</span><br>
  <br>
  <span class="term-output-highlight">Plan:</span> 3 to add, 0 to change, 0 to destroy.
</div>`,

    "docker ps": () => `
<div class="term-output">
  CONTAINER ID &nbsp;&nbsp;IMAGE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COMMAND &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CREATED &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATUS<br>
  e4d8a1f9c2e0 &nbsp;&nbsp;iiot-gateway:v2.4.1 &nbsp;&nbsp;&nbsp;"/bin/sh -c..." &nbsp;2 days ago &nbsp;&nbsp;&nbsp;&nbsp;Up 2 days (healthy)<br>
  3b9f1a4e7c8d &nbsp;&nbsp;elk-logstash:8.11.0 &nbsp;&nbsp;&nbsp;"/usr/share/..." 5 days ago &nbsp;&nbsp;&nbsp;&nbsp;Up 5 days (healthy)
</div>`,

    "helm list": () => `
<div class="term-output">
  NAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NAMESPACE &nbsp;&nbsp;REVISION &nbsp;&nbsp;UPDATED &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATUS &nbsp;&nbsp;&nbsp;&nbsp;CHART<br>
  ingress-nginx &nbsp;&nbsp;kube-system 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2026-07-15 10:00:00 UTC &nbsp;deployed &nbsp;&nbsp;ingress-nginx-4.8.3<br>
  argo-cd &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;argocd &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2026-07-20 14:30:00 UTC &nbsp;deployed &nbsp;&nbsp;argo-cd-5.52.0
</div>`,

    uptime: () => `
<div class="term-output">
  22:06:31 up 365 days, 99.99% uptime, 0 critical incidents, load average: 0.12, 0.08, 0.05
</div>`,

    whoami: () => `
<div class="term-output">
  <span class="term-output-highlight">Tejas Goswami</span> — DevOps Engineer @ Reliance Jio Infocomm Ltd
</div>`,

    "tejas --contact": () => `
<div class="term-output">
  📧 <span class="term-output-highlight">Email:</span> goswamitejas909@gmail.com<br>
  💼 <span class="term-output-highlight">LinkedIn:</span> linkedin.com/in/tejas-goswami-301606212<br>
  🌐 <span class="term-output-highlight">GitHub:</span> github.com/tejasgsv
</div>`
  };

  window.runCommand = function(cmdStr) {
    if (cmdStr === "clear") {
      terminalBody.innerHTML = `
        <div class="terminal-line">
          <span class="term-prompt">tejas@devops-node:~$</span> Terminal cleared. Type <span class="term-output-highlight">'help'</span> or click buttons above to run commands.
        </div>
      `;
      return;
    }

    const commandLine = document.createElement("div");
    commandLine.className = "terminal-line";
    commandLine.innerHTML = `<span class="term-prompt">tejas@devops-node:~$</span> <span class="term-user">${cmdStr}</span>`;
    terminalBody.appendChild(commandLine);

    const outputDiv = document.createElement("div");
    outputDiv.className = "terminal-line";

    if (commands[cmdStr]) {
      outputDiv.innerHTML = commands[cmdStr]();
    } else {
      outputDiv.innerHTML = `<div class="term-output" style="color: #ef4444;">bash: command not found: ${cmdStr}. Type <span class="term-output-highlight">'help'</span> for available commands.</div>`;
    }

    terminalBody.appendChild(outputDiv);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  if (terminalInput) {
    terminalInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const value = terminalInput.value.trim();
        if (value) {
          window.runCommand(value);
          terminalInput.value = "";
        }
      }
    });
  }

  // Preset buttons click listeners
  document.querySelectorAll(".btn-term-preset").forEach(btn => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-cmd");
      if (cmd) window.runCommand(cmd);
    });
  });

  // 4. Skill Filter Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      skillCards.forEach(card => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 5. Scroll Reveal Effect
  const revealElements = document.querySelectorAll(".section, .hero, .metric-card, .skill-card, .timeline-content, .project-card, .cert-card");

  function handleScrollReveal() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add("reveal", "active");
      }
    });
  }

  window.addEventListener("scroll", handleScrollReveal);
  handleScrollReveal(); // Initial check

  // 6. Copy Email to Clipboard with Toast Notification
  window.copyEmail = function() {
    const email = "goswamitejas909@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      showToast("Email address copied to clipboard!");
    }).catch(err => {
      showToast("Email: goswamitejas909@gmail.com");
    });
  };

  function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  // 7. Active Nav Link on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
