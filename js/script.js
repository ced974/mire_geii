// CHANGEMENT DE COULEURS
const colorInputs = document.querySelectorAll(".color");

// Évenement de couleurs
colorInputs.forEach((input) => {
	input.addEventListener("input", () => {
		document.documentElement.style.setProperty(`--${input.id}`, input.value);
		localStorage.setItem(`--${input.id}`, input.value);
	});
});

// Détection présence d'une ou plusieurs couleurs dans le local storage
const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");

if (localStorage.getItem("--color1")) {
	color1.value = localStorage.getItem("--color1");
	color1.dispatchEvent(new Event("input", { bubbles: true }));
}

if (localStorage.getItem("--color2")) {
	color2.value = localStorage.getItem("--color2");
	color2.dispatchEvent(new Event("input", { bubbles: true }));
}

// GESTION SETTINGS
const menuSetting = document.getElementsByClassName("Settings")[0];
const menuSettingColor = document.getElementsByClassName("colorPalette")[0];

function gestionSettings(context) {
	switch (context) {
		case "colorSetting":
			menuSettingColor.style.opacity = "1";
			menuSetting.style.opacity = "0";

			menuSettingColor.style.visibility = "visible";
			menuSetting.style.visibility = "hidden";
			break;
		case "retourSetting":
			menuSettingColor.style.opacity = "0";
			menuSetting.style.opacity = "1";

			menuSettingColor.style.visibility = "hidden";
			menuSetting.style.visibility = "visible";
			break;
	}
}

// Permet de reset les configurations de couleurs
function ResetColor() {
	color1.value = "#f08505";
	color2.value = "#f9d547";

	color1.dispatchEvent(new Event("input", { bubbles: true }));
	color2.dispatchEvent(new Event("input", { bubbles: true }));
}

// GESTION BDD + AFFICHAGE
const matrice = document.querySelector(".Matrice");

// Fonction qui retourne une promesse avec les données
function fetchData() {
	return new Promise((resolve, reject) => {
		const data = [
			{
				titre: "Emploi du Temps",
				url: "https://wwwgeii.univ-lyon1.fr/ade",
				img: "./new_image/Ade.png",
				display: true,
			},
			{
				titre: "Courrier Electronique",
				url: "http://www.univ-lyon1.fr/owa",
				img: "./new_image/Outlook.png",
				display: true,
			},
			{
				titre: "Ma Scol",
				url: "http://mascol.univ-lyon1.fr/",
				img: "./new_image/Mascol.png",
				display: true,
			},
			{
				titre: "Guide Etudiant",
				url: "http://poursuiteetudegeii.univ-lyon1.fr/guide.php",
				img: "./new_image/guide.png",
				display: true,
			},
			{
				titre: "Saisie Info Etudiant",
				url: "http://poursuiteetudegeii.univ-lyon1.fr/info_etud/saisie_info.php",
				img: "./new_image/SaisieEtudiant.png",
				display: true,
			},
			{
				titre: "Accès Classeur PE",
				url: "http://iutgrci-geiiweb3.univ-lyon1.fr/peclasseur",
				img: "./new_image/PE.png",
				display: false,
			},
			{
				titre: "Stages (Elipse)",
				url: "http://elipse.univ-lyon1.fr/index.php/fr/",
				img: "./new_image/Elipse.png",
				display: true,
			},
			{
				titre: "Moodle",
				url: "https://moodle.univ-lyon1.fr/",
				img: "./new_image/Moodle.png",
				display: true,
			},
			{
				titre: "Claco",
				url: "https://clarolineconnect.univ-lyon1.fr/",
				img: "./new_image/Claroline_connect.png",
				display: true,
			},
			{
				titre: "Gitlab",
				url: "https://forge.univ-lyon1.fr/",
				img: "./new_image/GitLab.png",
				display: true,
			},
			{
				titre: "Relevé de BUT",
				url: "http://geii-notes.univ-lyon1.fr/",
				img: "./new_image/Bulletin.png",
				display: true,
			},
			{
				titre: "Facebook GEII",
				url: "https://www.facebook.com/pages/GEii-Lyon-Villeurbanne/1456804237947689",
				img: "./new_image/Facebook.png",
				display: true,
			},
			{
				titre: "LinkedIn GEII",
				url: "https://fr.linkedin.com/pub/geii-lyon-villeurbanne/100/6a7/2b0",
				img: "./new_image/Linkedin.png",
				display: true,
			},
			{
				titre: "Boite à outils",
				url: "https://etu.univ-lyon1.fr/outils/outils-des-etudiants-763730.kjsp?RH=ETUDIANTS",
				img: "./new_image/BoiteAOutils.png",
				display: true,
			},
			{
				titre: "Izly",
				url: "http://www.izly.fr/",
				img: "./new_image/Izly.png",
				display: true,
			},
			{
				titre: "Quota Impression",
				url: "https://iutgrci-print.univ-lyon1.fr/",
				img: "./new_image/Imprimante.png",
				display: true,
			},
		];

		if (data) {
			resolve(data);
		} else {
			reject("Erreur lors de la récupération des données.");
		}
	});
}

// Utilisation de la promesse
fetchData()
	.then((json) => {
		json.forEach((e) => {
			matrice.innerHTML += f(e);
		});
		addAnimationVanilla();
	})
	.catch((error) => {
		console.error("Une erreur s'est produite : ", error);
	});

// Fonction ajout élement du slider
function f(elmt) {
	let res = "";
	if (elmt.display) {
		res = '<div class="Element" data-tilt>';
		res += '<A HREF="' + elmt.url + '" TARGET=_blank>';
		res += '<li><img src="' + elmt.img + '"/>';
		res += "</li></A><h4>" + elmt.titre + "</h4></div>";
	}
	return res;
}

// Animation des cartes qui bougent en fonction de la souris
function addAnimationVanilla() {
	// Sélectionne tous les éléments avec la classe "Slide" dans le carrousel Flickity
	const mainTitle = document.querySelectorAll(".accueil");
	const Element = document.querySelectorAll(".Element");

	// Initialise Vanilla Tilt sur tous les éléments avec la classe "Slide"
	VanillaTilt.init(mainTitle, {
		max: 15, // max tilt rotation (degrees)
		glare: true, // if it should have a "glare" effect
		"max-glare": 0.09,
		speed: 800, // Speed of the enter/exit transition
		gyroscope: true, // Boolean to enable/disable device orientation detection,
		scale: 1.09, // 2 = 200%, 1.5 = 150%, etc..
	});

	VanillaTilt.init(Element, {
		max: 15, // Angle maximal de basculement
		speed: 400, // Vitesse de l'effet de basculement
		glare: true, // Activer la luminosité de reflet
		gyroscope: true, // Boolean to enable/disable device orientation detection,
		"max-glare": 0.09, // Intensité de la luminosité de reflet
		scale: 1.09, // 2 = 200%, 1.5 = 150%, etc..
	});
}
