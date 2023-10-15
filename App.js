function App() {
    const [taches, setTaches] = React.useState([]);
    const [nouvelleTache, setNouvelleTache] = React.useState('');
    const [alerte, setAlerte] = React.useState(null);


    const ajouterTache = () => {
        // Récupération de la valeur saisie dans le champ de texte et suppression des espaces vides au début et à la fin
        let nouvelleTacheTrimmed = nouvelleTache.trim();
        
        // Vérification si la valeur de la nouvelle tâche n'est pas une chaîne vide
        if (nouvelleTacheTrimmed !== '') {
            // Vérification si la tâche existe déjà dans la liste
            if (tacheExisteDeja(nouvelleTacheTrimmed)) {
                // Affichage du message d'alerte
                setAlerte('Cette tâche existe déjà.');
            } else {
                // Ajout de la nouvelle tâche à la liste
                const nouvelleTacheAvecActions = {
                    id: Date.now(),
                    texte: nouvelleTacheTrimmed,
                };
                setTaches([...taches, nouvelleTacheAvecActions]);
                setNouvelleTache('');
            }
        } else {
            // Affichage du message d'alerte si la tâche est vide
            setAlerte('Veuillez saisir une tâche.');
        }
    };

    const tacheExisteDeja = (nouvelleTache) => {
        // Parcours des tâches existantes
        return taches.some(tache => tache.texte === nouvelleTache);
    };

    // Affichage du message d'alerte
    React.useEffect(() => {
        if (alerte) {
            setTimeout(() => {
                setAlerte(null);
            }, 3000);
        }
    }, [alerte]);

    const toggleTacheBarree = (id) => {
        setTaches(
            taches.map(tache => {
                if (tache.id === id) {
                    return { ...tache, terminee: !tache.terminee };
                }
                return tache;
            })
        );
    };
    
    const supprimerTache = (id) => {
        setTaches(taches.filter(tache => tache.id !== id));
    };
    
    const modifierTacheExistante = (id) => {
        const tacheModifiee = window.prompt("Modifier la tâche :");
        if (tacheModifiee !== null) {
          setTaches(
            taches.map((tache) =>
              tache.id === id ? { ...tache, texte: tacheModifiee } : tache
            )
          );
        }
      };
    
    
    return (
        <section className="container">
            <br/>
            <h1 className="h1 mb-2 py-3 text-center">Ma ToDoList</h1>
            <div className="d-flex justify-content-center align-items-center text-center my-2">
                <span id="alert">{alerte}</span>
            </div>
            <div className="" >
                <div className="d-flex justify-content-center mb-3 ms-5">
                <input
                    className="form-control my-md-2 ms-5"
                    type="text"
                    value={nouvelleTache}
                    onChange={(e) => setNouvelleTache(e.target.value)}
                    placeholder="Nouvelle tâche"
                    required="required"
                />
                    <div className="w-75 d-flex flex-wrap ms-3">
                        <button 
                            type="button" 
                            className="rounded-2 btn btn-primary my-md-2" 
                            id="ajout"
                            onClick={ajouterTache}>Ajouter 
                            <img src="images/ajouter.png" alt="ajouter logo" className="mx-2" />
                        </button>                    
                    </div>  
                </div>
            </div>
            <div id="todolist" className="my-4">
                <h3>Mes tâches</h3>
                <ul>
                {taches.map((tache) => (
                    <li key={tache.id} className={tache.terminee ? 'tache-terminee' : ''}>
                        <span>{tache.texte}</span>
                        <div className="btn-group">
                            <button
                            type="button"
                            className="rounded-3 btn btn-info"
                            onClick={() => modifierTacheExistante(tache.id)}
                            >
                            Modifier <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button type="button" className="rounded-3 btn btn-success btn_terminer"
                                onClick={() => toggleTacheBarree(tache.id)}>
                                {tache.terminee ? 'Annuler Terminer' : 'Terminer'} <i className="fa-solid fa-check"></i>
                            </button>
                            <button type="button" className="rounded-3 btn btn-danger"
                                onClick={() => supprimerTache(tache.id)}>
                                Supprimer <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </section>
    );
}

ReactDOM.createRoot(document.getElementById('App')).render(<App />);