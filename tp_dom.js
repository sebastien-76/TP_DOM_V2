const boutonChoixNotation = document.getElementById("bouton_choix_notation");
const boutonInitial = document.getElementById("bouton_initial");
const choixNotation = document.getElementById("choix_notation");
const note = document.getElementById("note");
const couleur = document.getElementById("couleur");
const input = document.getElementById("input");
const listeInput = document.getElementsByClassName("input");
const boutonReset = document.getElementById("bouton_reset");
const noteRegex = /^[1-5]{1}$/;
const couleurRegex = /^[1-4&é"']{1}$/;

// Action sur le bouton de hoix de notation
boutonChoixNotation.addEventListener("click", () => {
    // Lorsque qu'on click sur le bouton, on cache le texte initial et on affiche le choix de notation
        if (boutonInitial.getAttribute("hidden") == null) {
            localStorage.clear();
        } 
        boutonInitial.setAttribute("hidden", "true")
        choixNotation.removeAttribute("hidden")
    // Switch le type de notation
    note.toggleAttribute("hidden");
    couleur.toggleAttribute("hidden");
    for (let element of listeInput) {  
        element.removeAttribute("hidden");
    };
    // Bascule le background en blanc ou en vert suivant le type de notation
    for (let element of listeInput) {
        const parentElementNode = element.parentNode;
        const previous = parentElementNode.previousElementSibling;
        const idEleve = previous.getAttribute("id");
        if (couleur.hidden) {
            element.style.backgroundColor = ("white");
            if (localStorage.length !== 0) {
                element.value = localStorage.getItem("note."+idEleve);
            }
        }
        else {
            console.log(couleur.hidden);
            element.style.backgroundColor = ("green");
            element.value =("");
            if (localStorage.length !== 0) {
                element.style.backgroundColor = (localStorage.getItem("couleur."+idEleve));
            } 
        };
    };
        // Focus sur le premier input
        input.focus();
});

for (let element of listeInput) {
    element.addEventListener("keyup", () => {
        // Declaration des constantes nécessaires à la boucle
        const parentElementNode = element.parentNode;
        const previous = parentElementNode.previousElementSibling;
        const idEleve = previous.getAttribute("id");
        const grandParentElementNode = parentElementNode.parentNode;
        const next = grandParentElementNode.nextElementSibling;
        const nextClass = next.querySelector("button");
        const nextInput = next.querySelector("input");

        // Cas de la notation par note
        if (couleur.hidden) {
               /* Vérification de la regex pour les notes */
           if (noteRegex.test(element.value)) {
               // Si regex ok, passage du focus en dessous sauf pour le dernier 
                localStorage.setItem("note."+idEleve, element.value);
                if ((next != null) && nextClass == null) {
                    nextInput.focus();
                } else {
                    element.blur(); 
                }
           } else {
                // Sinon regex ko, on vide l'input et message pour demander de rentrer une note correcte
                element.value = "";
                alert("veuillez entrer une note entre 1 et 5!");
                }
           } 
        else {
            // Cas de la notation par couleur
            // Vérification de la regex couleur
            if (couleurRegex.test(element.value)) {
                // Si ok, on tranforme l'entrée en couleur et on supprimer l'entrée
                switch (element.value) {
                    case '1':
                    case "&":
                        element.style.backgroundColor = ("red");
                        localStorage.setItem("couleur."+idEleve, "red");
                        element.value = ("");
                        break;
                    case '2':
                    case 'é':
                        element.style.backgroundColor = ("orange");
                        localStorage.setItem("couleur."+idEleve, "orange");
                        element.value = ("");
                        break;
                    case '3':
                    case '"':
                        element.style.backgroundColor = ("yellow");
                        localStorage.setItem("couleur."+idEleve, "yellow");
                        element.value = ("");
                        break;
                    case '4':
                    case '\'':
                        element.style.backgroundColor = ("green");
                        localStorage.setItem("couleur."+idEleve, "green");
                        element.value = ("");
                        break;
                };
                // Passage du focus en dessous
                if ((next != null) && nextClass == null) {
                    nextInput.focus();
                } else {
                    element.blur();
                };
            } else {
                // Si regex ko, on vide l'entréé et on demande une nouvelle entrée
                element.value = "";
                alert("veuillez entrer une des quatre couleurs autorisées!");
                }
            }
        }   
    )};

// Bouton pour reseter le note par type de notation
boutonReset.addEventListener("click", () => {
    for (let element of listeInput) {
        const parentElementNode = element.parentNode;
        const previous = parentElementNode.previousElementSibling;
        const idEleve = previous.getAttribute("id");
        element.value = "";
        if (couleur.hidden) {
            localStorage.removeItem("note."+idEleve);
        } else {
            localStorage.removeItem("couleur."+idEleve);
            element.style.backgroundColor = ("green");
        };
        input.focus();
    }   
});
