
const modulesData = {
    vidocq: {
        title: "1. L'Œil de Vidocq",
        html: `
            <p><strong>Scénario :</strong> Lors de votre ronde aléatoire dans la cour du Lycée Arago, vous remarquez une poubelle déplacée juste sous la fenêtre du 1er étage.</p>
            <p>Quelle est votre analyse ?</p>
            <button class="choice-btn" onclick="checkMultipleChoice(false, 'Faux. Ce n\'est pas un comportement normal. La sécurité exige de la méfiance.')">A. Aucun danger, c'est sûrement le vent ou les agents d'entretien.</button>
            <button class="choice-btn" onclick="checkMultipleChoice(true, 'Correct ! La poubelle sert de marchepied. Il y a un risque d\'intrusion par escalade. Il faut la replacer et signaler.')">B. Risque d'intrusion (Tentative d'escalade).</button>
            <button class="choice-btn" onclick="checkMultipleChoice(false, 'Faux. La poubelle n\'est pas un point sensible, c\'est l\'outil qui facilite l\'intrusion.')">C. C'est un point sensible.</button>
            <div id="feedback-area"></div>
        `
    },
    desc: {
        title: "2. Simulateur DESC",
        html: `
            <p><strong>Situation :</strong> Vous contrôlez l'accès au stade. Un individu tente de passer avec une bouteille en verre (interdite). Il s'énerve.</p>
            <p>Choisissez la phrase correcte pour l'étape <strong>D (Décrire)</strong> de la méthode DESC :</p>
            <button class="choice-btn" onclick="checkMultipleChoice(false, 'Faux. C\'est un jugement de valeur qui va aggraver le conflit.')">A. "Monsieur, vous le faites exprès de provoquer les agents ?"</button>
            <button class="choice-btn" onclick="checkMultipleChoice(true, 'Correct ! Les faits, rien que les faits, sans jugement.')">B. "Monsieur, je constate que vous portez une bouteille en verre, ce qui est interdit par le règlement."</button>
            <button class="choice-btn" onclick="checkMultipleChoice(false, 'Faux. Ceci est la phase S (Spécifier), pas D (Décrire).')">C. "Monsieur, jetez cette bouteille immédiatement."</button>
            <div id="feedback-area"></div>
        `
    },
    radio: {
        title: "3. Radio Express",
        html: `
            <p><strong>Transmission :</strong> Épelez l'indicatif suivant selon l'alphabet et les chiffres radio : <strong>AB-50-CD</strong></p>
            <input type="text" id="radio-input" placeholder="Ex: Alpha Bravo...">
            <button class="module-btn" style="width:100%" onclick="checkRadio()">Valider la transmission</button>
            <div id="feedback-area"></div>
        `
    },
    juridique: {
        title: "4. L'Arène Juridique",
        html: `
            <p><strong>Scénario :</strong> Vous supervisez la sécurité d'un rassemblement pour le "Trophée des lycées" au Parc de Choisy-le-Roi. Vous surprenez un individu en train de forcer la portière d'un véhicule de l'organisation avec un tournevis. Il tente de s'enfuir.</p>
            <p>Pouvez-vous l'appréhender et le maintenir physiquement ?</p>
            <button class="choice-btn" onclick="checkMultipleChoice(false, 'Faux. Le vol à la roulotte et la dégradation sont des délits, pas de simples contraventions.')">A. Non, c'est une simple contravention (dégradation).</button>
            <button class="choice-btn" onclick="checkMultipleChoice(true, 'Correct ! C\'est un délit flagrant (Art. 53 CPP / L3312-1 CPP). L\'Art. 73 CPP / L1511-1 CPP vous autorise à l\'appréhender avec une contrainte nécessaire et proportionnée.')">B. Oui, c'est un délit flagrant puni d'emprisonnement (Art. 73 CPP / L1511-1 CPP).</button>
            <button class="choice-btn" onclick="checkMultipleChoice(false, 'Faux. La légitime défense (Art. 122-5) s\'applique pour repousser une atteinte injustifiée, ici on est dans le cadre de l\'appréhension de l\'auteur d\'un délit en fuite.')">C. Oui, au titre de la légitime défense des personnes.</button>
            <div id="feedback-area"></div>
        `
    },
    rapport: {
        title: "5. Chrono-Rapport",
        html: `
            <p><strong>Exercice de rédaction :</strong> Vous venez de découvrir une porte fracturée (Art. 54 CPP). Rédigez le fait (1 ou 2 phrases). <em>Rappel : La méthode QQOQCP exige d'être factuel !</em></p>
            <textarea id="rapport-input" rows="4"></textarea>
            <button class="module-btn" style="width:100%" onclick="checkRapport()">Soumettre le rapport</button>
            <div id="feedback-area"></div>
        `
    }
};

function loadModule(moduleId) {
    document.getElementById('menu').classList.remove('active');
    const mod = document.getElementById('module');
    mod.classList.add('active');
    
    document.getElementById('module-title').innerText = modulesData[moduleId].title;
    document.getElementById('module-content').innerHTML = modulesData[moduleId].html;
}

function goHome() {
    document.getElementById('module').classList.remove('active');
    document.getElementById('menu').classList.add('active');
}

function showFeedback(isSuccess, message) {
    const fb = document.getElementById('feedback-area');
    fb.innerHTML = `<div class="feedback ${isSuccess ? 'success' : 'error'}">${message}</div>`;
}

function checkMultipleChoice(isCorrect, msg) {
    showFeedback(isCorrect, msg);
}

function checkRadio() {
    const answer = document.getElementById('radio-input').value.toLowerCase().replace(/[^a-z0-9]/g, '');
    const expected1 = "alphabravo3et2zérocharliedelta";
    const expected2 = "alphabravo3et2zerocharliedelta";
    
    if (answer === expected1 || answer === expected2) {
        showFeedback(true, "Correct ! Communication claire et réglementaire (collationnée).");
    } else {
        showFeedback(false, "Faux. La bonne réponse est : Alpha Bravo 3 et 2 Zéro Charlie Delta.");
    }
}

function checkRapport() {
    const text = document.getElementById('rapport-input').value.toLowerCase();
    if (text.includes("je pense") || text.includes("il me semble") || text.includes("peut-être") || text.includes("sûrement")) {
        showFeedback(false, "Vice de procédure ! Un compte rendu doit être strictement factuel. Évitez les interprétations telles que 'Je pense' ou 'Il me semble'.");
    } else if (text.length < 15) {
        showFeedback(false, "Rapport trop court. Soyez précis et appliquez la méthode QQOQCP (Qui, Quoi, Où...).");
    } else {
        showFeedback(true, "Rapport validé ! Écrit factuel et professionnel préservant la validité juridique de l'intervention.");
    }
}
