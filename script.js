/* ==========================================================================
   Tejas Goswami - Interactive Web Portfolio Script
   Terminal CLI Simulation, Typing Animation, Skill Filters, Toast
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typing Effect for Hero Subtitle
  const roles = [
    "DevOps Engineer @ Reliance Jio",
    "Azure Cloud Infrastructure Specialist",
    "Terraform & IaC Automation Architect",
    "Docker & Kubernetes Enthusiast",
    "CI/CD Pipeline Optimizer"
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

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // 2. Interactive Terminal Engine
  const terminalBody = document.getElementById("terminal-body");
  const terminalInput = document.getElementById("terminal-input");

  const commands = {
    help: () => `
<div class="term-output">
  <span class="term-output-highlight">Available Commands:</span><br>
  &nbsp;&nbsp;<span class="term-user">tejas --skills</span> &nbsp;: List core technical skills & proficiency<br>
  &nbsp;&nbsp;<span class="term-user">az account show</span> &nbsp;: Display Azure Cloud specialization details<br>
  &nbsp;&nbsp;<span class="term-user">kubectl get pods</span> : Check active deployment workload status<br>
  &nbsp;&nbsp;<span class="term-user">terraform plan</span> &nbsp; : View Infrastructure as Code configuration<br>
  &nbsp;&nbsp;<span class="term-user">tejas --contact</span> &nbsp;: Get direct email & social handles<br>
  &nbsp;&nbsp;<span class="term-user">clear</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Clear terminal screen
</div>`,
    
    "tejas --skills": () => `
<div class="term-output">
  <span class="term-output-highlight">☁️ Cloud & Infrastructure:</span> Azure (VM, VNet, Storage, AKS, Log Analytics)<br>
  <span class="term-output-highlight">⚙️ IaC & Automation:</span> Terraform, Reusable IaC Modules<br>
  <span class="term-output-highlight">🐳 Containers:</span> Docker, Kubernetes, OpenShift (Learning)<br>
  <span class="term-output-highlight">🚀 CI/CD:</span> Azure DevOps, GitHub Actions, Jenkins<br>
  <span class="term-output-highlight">📊 Monitoring:</span> Azure Monitor, Log Analytics, ELK Stack
</div>`,

    "az account show": () => `
<div class="term-output">
  {<br>
  &nbsp;&nbsp;"environmentName": <span class="term-output-highlight">"AzureCloud"</span>,<br>
  &nbsp;&nbsp;"engineer": <span class="term-output-highlight">"Tejas Goswami"</span>,<br>
  &nbsp;&nbsp;"role": <span class="term-output-highlight">"DevOps Engineer"</span>,<br>
  &nbsp;&nbsp;"company": <span class="term-output-highlight">"Reliance Jio"</span>,<br>
  &nbsp;&nbsp;"experience": <span class="term-output-highlight">"2+ Years Professional"</span>,<br>
  &nbsp;&nbsp;"state": <span class="term-output-highlight">"Enabled / Ready for Deployment"</span><br>
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
          <span class="term-prompt">tejas@devops-node:~$</span> Type <span class="term-output-highlight">'help'</span> or click buttons above to explore interactive commands.
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
      outputDiv.innerHTML = `<div class="term-output" style="color: #ef4444;">bash: command not found: ${cmdStr}. Type <span class="term-output-highlight">'help'</span> for list of commands.</div>`;
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

  // 3. Skill Filter Tabs
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

  // 4. Copy Email to Clipboard with Toast Notification
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
    }, 3000);
  }

  // 5. Active Nav Link on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
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
