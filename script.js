const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Ajuster la taille du canvas à la section Hero
function resizeCanvas() {
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Caractères binaires uniquement (0 et 1)
const chars = '01';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);

// Tableau stockant la position Y de chaque colonne
let drops = [];
function initDrops() {
  columns = Math.floor(canvas.width / fontSize);
  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100; // Positions de départ décalées
  }
}
initDrops();
window.addEventListener('resize', initDrops);

// Animation de la pluie binaire
function drawMatrix() {
  // Effet de traînée fondu (transparence progressive)
  ctx.fillStyle = 'rgba(9, 13, 22, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Style des chiffres : Cyan lumineux / Bleu Cyber
  ctx.fillStyle = '#00f2fe';
  ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

  for (let i = 0; i < drops.length; i++) {
    // Choisir 0 ou 1 au hasard
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    
    // Dessiner le chiffre
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Réinitialiser la colonne quand elle atteint le bas
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

// Boucle d'animation à 30 FPS pour un effet rétro fluide
setInterval(drawMatrix, 33);

document.addEventListener("DOMContentLoaded", () => {
  const categoryNodes = document.querySelectorAll(".category-node, .freq-channel");

  categoryNodes.forEach((node, index) => {
    node.addEventListener("click", (e) => {
      e.preventDefault();

      // Récupérer le nom et la page cible
      const labelElement = node.querySelector(".node-label, .freq-title");
      const categoryName = labelElement ? labelElement.textContent.trim() : `NODE_${index + 1}`;
      
      // Déterminer la page de destination en fonction du texte
      let targetPage = "index.html";
      if (categoryName.includes("ABOUT")) targetPage = "about.html";
      else if (categoryName.includes("PROJECTS")) targetPage = "projects.html";
      else if (categoryName.includes("PRICING") || categoryName.includes("TARIFS")) targetPage = "pricing.html";
      else if (categoryName.includes("CONTACT")) targetPage = "contact.html";

      // Lancer le scan et rediriger à la fin
      triggerBiometricScan(categoryName, targetPage);
    });
  });
});

function triggerBiometricScan(targetName, redirectUrl) {
  const overlay = document.getElementById("biometric-loader");
  const targetLabel = document.getElementById("bio-target-name");
  const progressBar = document.getElementById("bio-progress-bar");
  const timerLabel = document.getElementById("bio-timer");
  const statusLabel = document.getElementById("bio-status-text");

  if (!overlay) return;

  targetLabel.textContent = targetName;
  overlay.classList.add("active");

  const totalDuration = 3000; // 10 secondes
  const updateInterval = 100;
  let elapsedTime = 0;

  const messages = [
    "ANALYZING RETINAL PATTERN...",
    "VERIFYING BIOMETRIC CLEARANCE...",
    "DECRYPTING SECURE NODE...",
    "SYNCHRONIZING SYSTEM DATA...",
    "ACCESS GRANTED // REDIRECTING..."
  ];

  const timer = setInterval(() => {
    elapsedTime += updateInterval;
    const progressPercent = (elapsedTime / totalDuration) * 100;
    const remainingSeconds = ((totalDuration - elapsedTime) / 1000).toFixed(1);

    progressBar.style.width = `${progressPercent}%`;
    timerLabel.textContent = `${Math.max(0, remainingSeconds)}s`;

    if (progressPercent < 25) statusLabel.textContent = messages[0];
    else if (progressPercent < 50) statusLabel.textContent = messages[1];
    else if (progressPercent < 75) statusLabel.textContent = messages[2];
    else if (progressPercent < 95) statusLabel.textContent = messages[3];
    else statusLabel.textContent = messages[4];

    // Une fois les 10 secondes écoulées -> Redirection vers la nouvelle page
    if (elapsedTime >= totalDuration) {
      clearInterval(timer);
      setTimeout(() => {
        overlay.classList.remove("active");
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      }, 300);
    }
  }, updateInterval);
}

document.addEventListener("DOMContentLoaded", () => {
  initCardScanner();
});

function initCardScanner() {
  const cards = document.querySelectorAll(".cyber-card");

  cards.forEach((card, cardIndex) => {
    // 1. Activer le mode scan sur la carte
    card.classList.add("scanning");

    // Récupérer tous les enfants directs de la carte (titres, textes, tags...)
    const cardChildren = Array.from(card.children);

    // 2. Décalage pour scanner les cartes les unes après les autres (ou simultanément)
    const cardDelay = cardIndex * 300; // 300ms de décalage entre chaque carte

    setTimeout(() => {
      const scanDuration = 2200; // Durée exacte de l'animation CSS (2.2s)
      const totalItems = cardChildren.length;

      // 3. Révéler les éléments au fur et a mesure que le laser descend
      cardChildren.forEach((child, itemIndex) => {
        // Calcul du timing en fonction de la position de l'élément dans la carte
        const revealDelay = (scanDuration / (totalItems + 1)) * (itemIndex + 1);

        setTimeout(() => {
          child.classList.add("revealed");
        }, revealDelay);
      });

      // 4. Une fois le scan terminé : nettoyer la classe pour arrêter le scanner
      setTimeout(() => {
        card.classList.remove("scanning");
      }, scanDuration + 200);

    }, cardDelay);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initDroneEntrance();
});

function initDroneEntrance() {
  const droneWrapper = document.getElementById("droneWrapper");
  if (droneWrapper) {
    // Petit délai avant l'entrée du drone
    setTimeout(() => {
      droneWrapper.classList.add("centered");
    }, 300);
  }
}