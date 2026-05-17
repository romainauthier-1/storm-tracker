const API_URL = 'http://localhost:3000';

// Récupérer le bouton submit
document.querySelector('input[type="submit"]').addEventListener('click', (e) => {
  e.preventDefault(); // Empêche le rechargement de la page
  
  // TON CODE ICI
  // 1. Récupérer les valeurs des inputs
  const date = document.getElementById('date_balade').value;
  const duree = document.getElementById('duree_balade').value;
  const lieu = document.getElementById('lieu_balade').value;
  const rencontreChecked = document.querySelector('input[name="rencontres_balade"]:checked');
  const rencontre = rencontreChecked ? rencontreChecked.value === 'true' : false;
  //const list_rencontre = document.getElementById('list_rencontres_balades').value;
  const pipiChecked = document.querySelector('input[name="pipi_balade"]:checked');
  const pipi = pipiChecked ? pipiChecked.value === 'true' : false;
  const cacaChecked = document.querySelector('input[name="caca_balade"]:checked');
  const caca = cacaChecked ? cacaChecked.value === 'true' : false;
  const noteCaca = document.getElementById('note_caca_balade').value;
  const commentCaca = document.getElementById('comment_caca_balade').value;
  const aMangeChecked = document.querySelector('input[name="nourriture_balade"]:checked');
  const aMange = aMangeChecked ? aMangeChecked.value === 'true' : false;
  const aMangeQuoi = document.getElementById('comment_nourriture_balade').value;
  const comment = document.getElementById('comment_balade').value;
  // 2. Créer un objet avec toutes les données
  const baladeData = {
    date: date,
    duree: Number(duree),
    lieu: lieu,
    rencontres: [],
    pipi: pipi,
    caca : {
        fait_caca: caca,
        note_caca: Number(noteCaca),
        comment_caca: commentCaca,
    },
    nourriture: {
        a_mangé: aMange,
        comment_nourriture: aMangeQuoi,
    },
    comment: comment,
  };
  console.log('Données à envoyer: ', baladeData);
  // 3. Envoyer avec fetch POST vers /balades
fetch('http://localhost:3000/balades', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(baladeData)
})
  .then(response => response.json())
  .then(data => {
    console.log('Réponse du serveur:', data);
    
    if (data.result) { //équivalent à if (data.result === true)
      alert('Balade ajoutée avec succès ! 🎉');
      // TODO : Réinitialiser le formulaire et afficher la balade
    } else {
      alert('Erreur lors de l\'ajout');
    }
  })
  .catch(error => {
    console.error('Erreur:', error);
    alert('Erreur de connexion au serveur');
  });
});

// Fonction pour charger et afficher les balades
function loadBalades() {
  fetch('http://localhost:3000/balades')
    .then(response => response.json())
    .then(data => {
      console.log('Balades reçues:', data);

    //Récupération des données
    data.balades.forEach(balade => {
    const pipiText = balade.pipi ? 'A fait pipi' : 'N\'a pas fait pipi';
    const cacaText = balade.caca.fait_caca ? 'A fait caca' : 'N\'a pas fait caca';
    const mangeText = balade.nourriture.a_mangé ? 'A mangé des choses pendant la balade' : 'N\'a rien mangé pendant la balade';

    //Création nouveau container
    const container = document.getElementById('balades_list');
    //Ajout du container avec les informations
    container.insertAdjacentHTML('beforeend',`
                <div class="balade_card">
            <h2>${balade.lieu} | ${new Date(balade.date).toLocaleDateString('fr-FR')}</h2>
            <p>Durée : ${balade.duree} minutes</p>
            <div class="rencontres">
                ${balade.rencontres.length > 0 ? `
                    <p>Rencontres:</p>
                    <ul>
                    ${balade.rencontres.map(chien => `
                        <li>${chien.nom} (${chien.proprietaire}) - Storm l'aime: ${chien.storm_like}/5</li>
                    `).join('')}
                    </ul>
                ` : '<p>Aucune rencontre</p>'}
            </div>
            <p>${pipiText}</p>
            <div class="caca">
                <p>${cacaText}</p>
                ${balade.caca.fait_caca ? `
                <p>Note: ${balade.caca.note_caca}/5</p>
                <p>Commentaire: ${balade.caca.comment_caca}</p>
                ` : ''}
            </div>
            <div class="nourriture">
                <p>${mangeText}</p>
                ${balade.nourriture.a_mangé ? `
                <p>Notes: ${balade.nourriture.comment_nourriture}</p>
                ` : ''}
            </div>
            <p class="comment_general">Commentaire : ${balade.comment}</p>
        </div>
        `);
      }
    )
})
    .catch(error => {
      console.error('Erreur:', error);
    });
};
// Charger les balades au démarrage de la page
loadBalades();

//Écouter changements radio buttons formulaire
const rencontresDiv = document.querySelector('.si_rencontre');

document.querySelectorAll('input[name="rencontres_balade"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'true') {
            rencontresDiv.classList.remove('hidden');
        } else {
            rencontresDiv.classList.add('hidden');
        };
    });
});

//Créer dynamiquement liste de chiens connus
const selectListChiens = document.getElementById('list_rencontres_balade');

function loadChiens() {
    fetch('http://localhost:3000/chiens')
        .then(r => r.json())
        .then(data => {
            data.chiens.forEach(chien => {
                const option = document.createElement('option');
                option.value = chien._id;
                option.textContent = `${chien.nom} (${chien.proprietaire})`;
                selectListChiens.appendChild(option);
            })
        })
        .catch(err => {
            console.error('❌ Erreur chargement chiens :', err)
        });
};

//Charger la liste de chiens
loadChiens();

//Ajout d'un nouveau chien
const btnAddChien = document.querySelector('input[value="✚ Ajouter un nouveau chien"]');

btnAddChien.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Demander les infos
  const nom = prompt('Nom du chien ?');
  const proprio = prompt('Nom du propriétaire ?');
  const stormLike = prompt('Note Storm (0-5) ?');
  const comment = prompt('Commentaire (optionnel) ?');
  
  // Si l'utilisateur annule, on arrête
  if (!nom || !proprio) {
    alert('Nom et propriétaire obligatoires !');
    return;
  }
  
  // Créer l'objet chien
  const newChien = {
    nom: nom,
    proprietaire: proprio,
    first_rencontre: new Date(),
    nb_rencontres: 1,
    storm_like: Number(stormLike) || 0,
    comment: comment || ''
  };
  
  // Envoyer au backend
  fetch('http://localhost:3000/chiens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newChien)
  })
    .then(res => res.json())
    .then(data => {
      if (data.result) {
        alert('Chien ajouté ! 🐕');
        // Recharger la liste
        selectListChiens.innerHTML = '';  // Vider
        loadChiens();  // Recharger
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
});