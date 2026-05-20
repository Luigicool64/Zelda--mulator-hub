import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Guide.css';

export function Guide() {
  const [activeSection, setActiveSection] = useState('rando');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="guide-page">
      <div className="guide-header">
        <h1 className="guide-title">📖 Guide complet du Randomizer</h1>
        <p className="guide-subtitle">Apprenez à maîtriser le mode Randomizer sur Ocarina of Time et Majora's Mask</p>
      </div>

      <div className="guide-nav">
        <button 
          className={`guide-nav-btn ${activeSection === 'rando' ? 'active' : ''}`}
          onClick={() => setActiveSection('rando')}
        >
          🎲 Faire une partie Rando
        </button>
        <button 
          className={`guide-nav-btn ${activeSection === 'vanilla' ? 'active' : ''}`}
          onClick={() => setActiveSection('vanilla')}
        >
          🗡️ Mode Vanilla
        </button>
        <button 
          className={`guide-nav-btn ${activeSection === 'randomizers' ? 'active' : ''}`}
          onClick={() => setActiveSection('randomizers')}
        >
          📦 Randomizers officiels
        </button>
        <button 
          className={`guide-nav-btn ${activeSection === 'tips' ? 'active' : ''}`}
          onClick={() => setActiveSection('tips')}
        >
          💡 Conseils avancés
        </button>
        <button 
          className={`guide-nav-btn ${activeSection === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveSection('faq')}
        >
          ❓ FAQ Rando
        </button>
      </div>

      <div className="guide-content">
        {/* Section Rando - Faire une partie */}
        {activeSection === 'rando' && (
          <div className="guide-section">
            <h2>🎲 Comment faire une partie Randomizer</h2>
            <p>Suivez ce guide étape par étape pour jouer votre première partie Randomizer.</p>

            {/* Étape 1 */}
            <div className="step-card">
              <div className="step-header">
                <div className="step-number">1</div>
                <h3>Choisissez votre jeu</h3>
              </div>
              <div className="step-content">
                <p>Deux jeux sont disponibles :</p>
                <div className="game-choice">
                  <div className="game-option oot">
                    <span className="game-icon">🗡️</span>
                    <div>
                      <strong>Ocarina of Time</strong>
                      <span>9 donjons, 45 items, 12 chants</span>
                    </div>
                  </div>
                  <div className="game-option mm">
                    <span className="game-icon">🎭</span>
                    <div>
                      <strong>Majora's Mask</strong>
                      <span>4 donjons, 35 items, 24 masques</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="step-card">
              <div className="step-header">
                <div className="step-number">2</div>
                <h3>Générez un seed avec un randomizer officiel</h3>
              </div>
              <div className="step-content">
                <p>Utilisez l'un de ces randomizers pour générer votre seed :</p>
                <div className="links-grid">
                  <a href="https://ootrandomizer.com/" target="_blank" className="link-card">
                    <span className="link-icon">🗡️</span>
                    <div>
                      <h4>OOT Randomizer</h4>
                      <p>Pour Ocarina of Time</p>
                    </div>
                  </a>
                  <a href="https://mmrandomizer.com/" target="_blank" className="link-card">
                    <span className="link-icon">🎭</span>
                    <div>
                      <h4>Majora's Mask Randomizer</h4>
                      <p>Pour Majora's Mask</p>
                    </div>
                  </a>
                </div>
                <div className="info-card">
                  <h4>⚙️ Configuration recommandée pour débuter</h4>
                  <ul>
                    <li><strong>Logique:</strong> Glitchless (sans glitch)</li>
                    <li><strong>Mélange:</strong> Items uniquement</li>
                    <li><strong>Départ:</strong> Épée de bois et bouclier</li>
                    <li><strong>Hints:</strong> Activés</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="step-card">
              <div className="step-header">
                <div className="step-number">3</div>
                <h3>Téléchargez votre ROM randomisée</h3>
              </div>
              <div className="step-content">
                <p>Après avoir généré votre seed :</p>
                <ol>
                  <li>Cliquez sur "Generate Patch" ou "Download ROM"</li>
                  <li>Le randomizer va créer une ROM personnalisée</li>
                  <li>Téléchargez également le <strong>Spoiler Log</strong> (optionnel mais recommandé)</li>
                </ol>
                <div className="alert alert-info">
                  💡 <strong>Astuce :</strong> Le spoiler log vous indique où se trouve chaque objet. Très utile si vous êtes bloqué !
                </div>
              </div>
            </div>

            {/* Étape 4 */}
            <div className="step-card">
              <div className="step-header">
                <div className="step-number">4</div>
                <h3>Importez votre ROM sur la plateforme</h3>
              </div>
              <div className="step-content">
                <p>Rendez-vous dans la <Link to="/library" className="inline-link">bibliothèque</Link> :</p>
                <ol>
                  <li>Sélectionnez votre jeu (OOT ou MM)</li>
                  <li>Sélectionnez le mode <span className="badge-rando">Randomizer</span></li>
                  <li>Glissez-déposez votre ROM téléchargée</li>
                  <li>(Optionnel) Importez le spoiler log</li>
                </ol>
              </div>
            </div>

            {/* Étape 5 */}
            <div className="step-card">
              <div className="step-header">
                <div className="step-number">5</div>
                <h3>Lancez la partie</h3>
              </div>
              <div className="step-content">
                <p>Une fois la ROM importée :</p>
                <ol>
                  <li>Cliquez sur "Jouer"</li>
                  <li>L'émulateur se lance automatiquement</li>
                  <li>Le tracker détecte vos items automatiquement</li>
                  <li>Utilisez la carte pour vous orienter</li>
                </ol>
              </div>
            </div>

            {/* Étape 6 - Système de hints */}
            <div className="step-card">
              <div className="step-header">
                <div className="step-number">6</div>
                <h3>Utilisez le système de hints</h3>
              </div>
              <div className="step-content">
                <p>Le système de hints vous aide quand vous êtes bloqué :</p>
                <div className="hint-system">
                  <div className="hint-rule">
                    <span className="hint-icon">✅</span>
                    <span>1 check = 1 progression</span>
                  </div>
                  <div className="hint-arrow">→</div>
                  <div className="hint-rule">
                    <span className="hint-icon">📊</span>
                    <span>10 checks = 1 hint</span>
                  </div>
                  <div className="hint-arrow">→</div>
                  <div className="hint-rule">
                    <span className="hint-icon">💡</span>
                    <span>1 hint = localisation d'un item</span>
                  </div>
                </div>
                <div className="alert alert-success">
                  🎯 <strong>Exemple :</strong> Vous cherchez le Hookshot ? Utilisez un hint, il vous dira dans quel coffre il se trouve !
                </div>
              </div>
            </div>

            {/* Tableau récapitulatif */}
            <div className="summary-table">
              <h3>📋 Récapitulatif des étapes</h3>
              <table>
                <thead>
                  <tr><th>Étape</th><th>Action</th><th>Durée</th></tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>Choisir le jeu</td><td>1 min</td></tr>
                  <tr><td>2</td><td>Générer un seed</td><td>2-5 min</td></tr>
                  <tr><td>3</td><td>Télécharger la ROM</td><td>1 min</td></tr>
                  <tr><td>4</td><td>Importer la ROM</td><td>1 min</td></tr>
                  <tr><td>5</td><td>Lancer la partie</td><td>Instant</td></tr>
                  <tr><td>6</td><td>Jouer et utiliser les hints</td><td>Variable</td></tr>
                </tbody>
               </table>
            </div>

            <div className="guide-footer">
              <Link to="/library" className="btn-primary">🎮 Commencer une partie Rando</Link>
            </div>
          </div>
        )}

        {/* Section Vanilla */}
        {activeSection === 'vanilla' && (
          <div className="guide-section">
            <h2>🗡️ Mode Vanilla - Le jeu original</h2>
            <p>Jouez aux jeux exactement comme ils ont été conçus par Nintendo.</p>
            
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Importez une ROM Vanilla</h4>
                  <p>Utilisez une ROM non modifiée d'Ocarina of Time ou Majora's Mask</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Lancez le jeu</h4>
                  <p>Cliquez sur "Jouer" dans la bibliothèque</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Suivez votre progression</h4>
                  <p>Le tracker enregistre automatiquement vos objets</p>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h4>📜 Particularités du mode Vanilla</h4>
              <ul>
                <li>Histoire originale intacte</li>
                <li>Objets à leurs emplacements d'origine</li>
                <li>Progression linéaire classique</li>
                <li>Idéal pour les premières parties</li>
              </ul>
            </div>
          </div>
        )}

        {/* Section Randomizers officiels */}
        {activeSection === 'randomizers' && (
          <div className="guide-section">
            <h2>📦 Randomizers officiels</h2>
            <p>Voici les randomizers les plus utilisés par la communauté</p>

            <div className="links-grid">
              <a href="https://ootrandomizer.com/" target="_blank" className="link-card large">
                <span className="link-icon">🗡️</span>
                <div>
                  <h3>OOT Randomizer</h3>
                  <p>Le randomizer original pour Ocarina of Time</p>
                  <span className="link-url">ootrandomizer.com</span>
                </div>
              </a>
              <a href="https://mmrandomizer.com/" target="_blank" className="link-card large">
                <span className="link-icon">🎭</span>
                <div>
                  <h3>Majora's Mask Randomizer</h3>
                  <p>Randomizer pour Majora's Mask</p>
                  <span className="link-url">mmrandomizer.com</span>
                </div>
              </a>
              <a href="https://ootmm.com/" target="_blank" className="link-card large">
                <span className="link-icon">⚡</span>
                <div>
                  <h3>OOTMM Combo Randomizer</h3>
                  <p>Les deux jeux combinés en un seul randomizer</p>
                  <span className="link-url">ootmm.com</span>
                </div>
              </a>
            </div>

            <div className="info-card">
              <h4>📝 Comment utiliser un randomizer</h4>
              <ol>
                <li>Téléchargez le randomizer correspondant à votre jeu</li>
                <li>Chargez votre ROM vanilla (non modifiée)</li>
                <li>Configurez les options (difficulté, logique, etc.)</li>
                <li>Générez le seed et sauvegardez la ROM randomisée</li>
                <li>Importez la ROM dans notre bibliothèque</li>
                <li>Jouez et suivez votre progression avec notre tracker</li>
              </ol>
            </div>
          </div>
        )}

        {/* Section Conseils avancés */}
        {activeSection === 'tips' && (
          <div className="guide-section">
            <h2>💡 Conseils avancés pour le Randomizer</h2>
            
            <div className="info-card">
              <h4>🎯 Logique de progression</h4>
              <ul>
                <li>Vérifiez TOUS les coffres, même les plus improbables</li>
                <li>Parlez à tous les PNJ, ils peuvent donner des objets</li>
                <li>Notez mentalement où vous avez déjà cherché</li>
                <li>Priorisez les zones accessibles sans items</li>
              </ul>
            </div>

            <div className="info-card">
              <h4>🗺️ Stratégies d'exploration</h4>
              <ul>
                <li>Commencez par la plaine d'Hyrule / Clock Town</li>
                <li>Explorez tous les magasins et grottes</li>
                <li>N'oubliez pas les zones cachées et les puits</li>
                <li>Les donjons de fin de jeu peuvent contenir des items essentiels</li>
              </ul>
            </div>

            <div className="info-card">
              <h4>🎮 Gestion des hints</h4>
              <ul>
                <li>N'utilisez pas vos hints trop tôt</li>
                <li>Gardez-les pour les items qui vous débloquent</li>
                <li>Un hint = localisation précise d'un item</li>
                <li>Priorisez les items clés (Hookshot, Arc, etc.)</li>
              </ul>
            </div>

            <div className="shortcuts">
              <h3>⌨️ Raccourcis clavier utiles</h3>
              <table className="shortcuts-table">
                <thead>
                  <tr><th>Touche</th><th>Action</th><th>Utilité</th></tr>
                </thead>
                <tbody>
                  <tr><td>←↑↓→</td><td>Déplacement</td><td>Se déplacer dans le monde</td></tr>
                  <tr><td>A / B</td><td>Actions</td><td>Attaquer, interagir</td></tr>
                  <tr><td>Enter</td><td>Start / Pause</td><td>Menu, inventaire</td></tr>
                  <tr><td>Shift</td><td>Bouton Z</td><td>Cibler les ennemis</td></tr>
                  <tr><td>WASD / Space</td><td>Boutons C</td><td>Utiliser les items</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section FAQ Rando */}
        {activeSection === 'faq' && (
          <div className="guide-section">
            <h2>❓ Questions fréquentes sur le Randomizer</h2>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(0)}>
                <h4>Quelle est la différence entre Vanilla et Rando ?</h4>
                <span className={`faq-icon ${openFaq === 0 ? 'open' : ''}`}>▼</span>
              </div>
              {openFaq === 0 && (
                <div className="faq-answer">
                  <p>Vanilla = jeu original sans modification. Rando = tous les objets sont mélangés aléatoirement, chaque partie est unique.</p>
                </div>
              )}
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(1)}>
                <h4>Dois-je connaître le jeu vanilla pour jouer en rando ?</h4>
                <span className={`faq-icon ${openFaq === 1 ? 'open' : ''}`}>▼</span>
              </div>
              {openFaq === 1 && (
                <div className="faq-answer">
                  <p>Oui, il est fortement recommandé de connaître le jeu original avant de se lancer dans le randomizer, car vous devrez explorer et déduire où se trouvent les objets.</p>
                </div>
              )}
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(2)}>
                <h4>Comment obtenir des hints ?</h4>
                <span className={`faq-icon ${openFaq === 2 ? 'open' : ''}`}>▼</span>
              </div>
              {openFaq === 2 && (
                <div className="faq-answer">
                  <p>Chaque 10 checks complétés vous donne 1 hint utilisable pour localiser un item. Un check = coffre important, quête, puzzle, etc.</p>
                </div>
              )}
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(3)}>
                <h4>Puis-je importer mon propre spoiler log ?</h4>
                <span className={`faq-icon ${openFaq === 3 ? 'open' : ''}`}>▼</span>
              </div>
              {openFaq === 3 && (
                <div className="faq-answer">
                  <p>Oui, dans la bibliothèque vous pouvez importer le spoiler log généré par votre randomizer. Cela vous permet de connaître l'emplacement exact de chaque objet.</p>
                </div>
              )}
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(4)}>
                <h4>Combien de temps dure une partie rando ?</h4>
                <span className={`faq-icon ${openFaq === 4 ? 'open' : ''}`}>▼</span>
              </div>
              {openFaq === 4 && (
                <div className="faq-answer">
                  <p>En moyenne entre 2 et 10 heures selon la difficulté, votre expérience et la chance. Un speedrunner peut finir en moins d'une heure !</p>
                </div>
              )}
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(5)}>
                <h4>Quels sont les items les plus importants à trouver ?</h4>
                <span className={`faq-icon ${openFaq === 5 ? 'open' : ''}`}>▼</span>
              </div>
              {openFaq === 5 && (
                <div className="faq-answer">
                  <p>Pour OOT : Hookshot, Arc, Bombes, Épée, Bouclier. Pour MM : Masques de transformation (Deku, Goron, Zora), Arc, Bombe.</p>
                </div>
              )}
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(6)}>
                <h4>Que faire si je suis complètement bloqué ?</h4>
                <span className={`faq-icon ${openFaq === 6 ? 'open' : ''}`}>▼</span>
              </div>
              {openFaq === 6 && (
                <div className="faq-answer">
                  <p>Utilisez vos hints ! Si vous n'en avez plus, vérifiez le spoiler log ou consultez la communauté sur Discord. Vous pouvez aussi générer un nouveau seed.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}