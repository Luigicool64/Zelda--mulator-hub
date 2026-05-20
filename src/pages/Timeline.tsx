// Timeline.tsx
import React, { useState, useRef, useEffect } from 'react';
import './Timeline.css';

interface TimelineEvent {
  id: string;
  titleJp: string;
  titleFr: string;
  icon: string;
  description: string;
  year?: string;
  platform?: string[];
  branch: 'defeat' | 'child' | 'adult' | 'common' | 'oot';
}

// Tous les événements
const timelineEvents: TimelineEvent[] = [
  // === AVANT OOT (commun) ===
  {
    id: 'creation',
    titleJp: '天地創造',
    titleFr: 'La Création du Monde',
    icon: '🌌',
    branch: 'common',
    description: 'Il y a très longtemps, les trois déesses d\'or Din, Nayru et Farore apparurent dans le chaos. Après leur départ, elles laissèrent derrière elles la Triforce.'
  },
  {
    id: 'skyward-sword',
    titleJp: 'スカイウォードソード',
    titleFr: 'Skyward Sword',
    icon: '⚔️',
    branch: 'common',
    year: '2011',
    platform: ['Wii', 'Switch'],
    description: 'Link, un jeune habitant de l\'île Céleste, vit sa chère amie Zelda tomber sur la Terre interdite. Guidé par l\'esprit de l\'épée Fi, il descendit sur la terre pour la sauver.'
  },
  {
    id: 'minish-cap',
    titleJp: 'ふしぎのぼうし',
    titleFr: 'The Minish Cap',
    icon: '🍄',
    branch: 'common',
    year: '2004',
    platform: ['GBA'],
    description: 'Le sorcier Vaati transforma la princesse Zelda en pierre. Link, aidé d\'un chapeau parlant nommé Ezlo, partit sauver la princesse.'
  },
  {
    id: 'four-swords',
    titleJp: '４つの剣',
    titleFr: 'Four Swords',
    icon: '🗡️',
    branch: 'common',
    year: '2002',
    platform: ['GBA'],
    description: 'Un héros muni de l\'épée légendaire Four Sword, qui lui permettait de se diviser en quatre, vainquit Vaati et le scella dans l\'épée.'
  },

  // === OCARINA OF TIME (point de divergence) ===
  {
    id: 'ocarina-of-time',
    titleJp: '時のオカリナ',
    titleFr: 'Ocarina of Time',
    icon: '🎵',
    branch: 'oot',
    year: '1998',
    platform: ['N64', '3DS', 'Switch'],
    description: 'Link rencontra la princesse Zelda pour empêcher Ganondorf de s\'emparer de la Triforce. Sept ans plus tard, Link se réveilla en héros et parcourut le temps pour sauver Hyrule. C\'est à ce moment que l\'histoire se divise en trois branches.'
  },

  // === BRANCHE DÉFAITE ===
  {
    id: 'link-to-past',
    titleJp: '神々のトライフォース',
    titleFr: 'A Link to the Past',
    icon: '⚡',
    branch: 'defeat',
    year: '1991',
    platform: ['SNES', 'GBA', 'Switch'],
    description: 'Un sorcier maléfique nommé Aganhim apparut. Link partit sauver les descendants des sept sages et pénétrer dans le Monde Noir où Ganon l\'attendait.'
  },
  {
    id: 'links-awakening',
    titleJp: '夢をみる島',
    titleFr: "Link's Awakening",
    icon: '🏝️',
    branch: 'defeat',
    year: '1993',
    platform: ['GB', 'GBC', 'Switch'],
    description: 'Link s\'embarqua pour un voyage. Une violente tempête fit naufrage son bateau. Il se réveilla sur l\'île de Cocolint, qui n\'était qu\'un rêve.'
  },
  {
    id: 'oracle-games',
    titleJp: 'ふしぎの木の実',
    titleFr: 'Oracle of Ages & Seasons',
    icon: '🌳',
    branch: 'defeat',
    year: '2001',
    platform: ['GBC'],
    description: 'Link fut transporté par la Triforce dans les terres d\'Holodrum et de Labrynna. Il dut sauver les deux oracles.'
  },
  {
    id: 'link-between-worlds',
    titleJp: '神々のトライフォース２',
    titleFr: 'A Link Between Worlds',
    icon: '🖼️',
    branch: 'defeat',
    year: '2013',
    platform: ['3DS'],
    description: 'Le sorcier Yuga apparut, scellant les descendants des sages dans des tableaux. Link acquit le pouvoir de traverser les murs.'
  },
  {
    id: 'tri-force-heroes',
    titleJp: 'トライフォース３銃士',
    titleFr: 'Tri-Force Heroes',
    icon: '👥',
    branch: 'defeat',
    year: '2015',
    platform: ['3DS'],
    description: 'Trois jeunes gens furent choisis comme héros pour affronter la sorcière dans son repaire.'
  },
  {
    id: 'echoes-of-wisdom',
    titleJp: '知恵のかりもの',
    titleFr: 'Echoes of Wisdom',
    icon: '🧠',
    branch: 'defeat',
    year: '2024',
    platform: ['Switch'],
    description: 'Link disparut dans une faille mystérieuse. La princesse Zelda se lança dans une aventure pour sauver son peuple.'
  },
  {
    id: 'zelda-1',
    titleJp: 'ゼルダの伝説',
    titleFr: 'The Legend of Zelda',
    icon: '🗺️',
    branch: 'defeat',
    year: '1986',
    platform: ['NES', 'GBA', 'Switch'],
    description: 'Ganon déroba la Triforce de la Force. Link aida Impa à retrouver les morceaux de la Triforce de la Sagesse.'
  },
  {
    id: 'adventure-of-link',
    titleJp: 'リンクの冒険',
    titleFr: 'The Adventure of Link',
    icon: '⚔️',
    branch: 'defeat',
    year: '1987',
    platform: ['NES', 'GBA', 'Switch'],
    description: 'Link partit à la recherche de la Triforce du Courage pour réveiller la princesse Zelda endormie.'
  },

  // === BRANCHE ENFANCE ===
  {
    id: 'majoras-mask',
    titleJp: 'ムジュラの仮面',
    titleFr: "Majora's Mask",
    icon: '🎭',
    branch: 'child',
    year: '2000',
    platform: ['N64', '3DS', 'Switch'],
    description: 'Link arriva dans le monde parallèle de Termina, où la Lune menaçait de s\'écraser. Il dut revivre sans cesse les trois mêmes jours pour sauver Termina.'
  },
  {
    id: 'twilight-princess',
    titleJp: 'トワイライトプリンセス',
    titleFr: 'Twilight Princess',
    icon: '🐺',
    branch: 'child',
    year: '2006',
    platform: ['GC', 'Wii', 'Wii U', 'Switch'],
    description: 'Link tomba dans le Royaume du Crépuscule. Il y rencontra Midna, une mystérieuse impératrice.'
  },
  {
    id: 'four-swords-adventures',
    titleJp: '４つの剣 ＋',
    titleFr: 'Four Swords Adventures',
    icon: '🗡️✨',
    branch: 'child',
    year: '2004',
    platform: ['GC', 'GBA'],
    description: 'Une ombre ressemblant à Link apparut et enleva Zelda. Link décida de dégainer la Four Sword.'
  },

  // === BRANCHE ADULTE ===
  {
    id: 'wind-waker',
    titleJp: '風のタクト',
    titleFr: 'The Wind Waker',
    icon: '🌊',
    branch: 'adult',
    year: '2002',
    platform: ['GC', 'Wii U'],
    description: 'Link fut sauvé par le Roi Lion Rouge, un bateau parlant qui lui révéla la résurrection de Ganondorf.'
  },
  {
    id: 'phantom-hourglass',
    titleJp: '夢幻の砂時計',
    titleFr: 'Phantom Hourglass',
    icon: '⌛',
    branch: 'adult',
    year: '2007',
    platform: ['DS'],
    description: 'Un bateau fantôme apparut et Tetra disparut. Link partit à la recherche du Sablier des Rêves.'
  },
  {
    id: 'spirit-tracks',
    titleJp: '大地の汽笛',
    titleFr: 'Spirit Tracks',
    icon: '🚂',
    branch: 'adult',
    year: '2009',
    platform: ['DS'],
    description: 'Le démon Malock déroba le corps de Zelda. Devenue un esprit, Zelda accompagna Link.'
  },

  // === POSITION NON SPÉCIFIÉE (après toutes les branches) ===
  {
    id: 'breath-of-wild',
    titleJp: 'ブレス オブ ザ ワイルド',
    titleFr: 'Breath of the Wild',
    icon: '🏔️',
    branch: 'common',
    year: '2017',
    platform: ['Wii U', 'Switch'],
    description: 'Link se réveilla dans la Chambre de la Résurrection. Le royaume d\'Hyrule avait été détruit par Fléau Ganon il y a cent ans.'
  },
  {
    id: 'tears-of-kingdom',
    titleJp: 'ティアーズ オブ ザ キングダム',
    titleFr: 'Tears of the Kingdom',
    icon: '💧',
    branch: 'common',
    year: '2023',
    platform: ['Switch'],
    description: 'Link et Zelda découvrirent une momie mystérieuse qui projeta le château vers le ciel.'
  }
];

export const Timeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [activeBranch, setActiveBranch] = useState<'all' | 'defeat' | 'child' | 'adult'>('all');
  const contentRef = useRef<HTMLDivElement>(null);

  // Filtrer par branche
  const filteredEvents = timelineEvents.filter(event => {
    if (activeBranch === 'all') return true;
    if (event.branch === 'oot') return true; // OoT toujours visible
    if (event.branch === 'common') return true; // Commun toujours visible
    return event.branch === activeBranch;
  });

  const handleEventClick = (event: TimelineEvent) => {
    if (selectedEvent?.id === event.id) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(event);
    }
  };

  useEffect(() => {
    if (selectedEvent && contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedEvent]);

  // Compter les jeux par branche (après OoT)
  const defeatCount = timelineEvents.filter(e => e.branch === 'defeat').length;
  const childCount = timelineEvents.filter(e => e.branch === 'child').length;
  const adultCount = timelineEvents.filter(e => e.branch === 'adult').length;

  // Séparer les événements avant/après OoT
  const beforeOot = timelineEvents.filter(e => e.branch === 'common' && e.id !== 'ocarina-of-time');
  const ootEvent = timelineEvents.find(e => e.id === 'ocarina-of-time');
  const afterOot = timelineEvents.filter(e => e.branch !== 'common' && e.branch !== 'oot');

  return (
    <div className="timeline-container">
      {/* En-tête */}
      <div className="timeline-header">
        <h1 className="timeline-title">
          <span className="title-jp">ゼルダの伝説</span>
          <span className="title-fr">La Légende d'Hyrule</span>
        </h1>
        <p className="timeline-subtitle">
          L'histoire officielle de la saga Zelda, avec les 3 branches temporelles après Ocarina of Time.
        </p>
      </div>

      {/* Timeline */}
      <div className="timeline-wrapper">
        <div className="timeline-line" />

        {/* Partie 1: Avant OoT */}
        {beforeOot.map((event, index) => (
          <div
            key={event.id}
            className={`timeline-item ${selectedEvent?.id === event.id ? 'active' : ''}`}
          >
            <div className="timeline-marker" onClick={() => handleEventClick(event)}>
              <span className="marker-icon">{event.icon}</span>
              <div className="marker-pulse" />
            </div>
            <div className="timeline-content">
              <div className="timeline-card" onClick={() => handleEventClick(event)}>
                <div className="card-branch">
                  <span className="branch-tag common">⭐ Ère commune</span>
                </div>
                <h3 className="card-title">
                  <span className="title-jp-small">{event.titleJp}</span>
                  <span className="title-fr-small">{event.titleFr}</span>
                </h3>
                {event.year && <div className="card-year">📅 {event.year}</div>}
                <p className="card-preview">{event.description.substring(0, 100)}...</p>
                <div className="card-read-more">Lire la suite →</div>
              </div>
            </div>
          </div>
        ))}

        {/* Ocarina of Time - Point de divergence */}
        {ootEvent && (
          <div className="divergence-point">
            <div
              className={`timeline-item divergence ${selectedEvent?.id === ootEvent.id ? 'active' : ''}`}
            >
              <div className="timeline-marker" onClick={() => handleEventClick(ootEvent)}>
                <span className="marker-icon">{ootEvent.icon}</span>
                <div className="marker-pulse" />
              </div>
              <div className="timeline-content">
                <div className="timeline-card divergence-card" onClick={() => handleEventClick(ootEvent)}>
                  <div className="card-branch">
                    <span className="branch-tag divergence">⚡ POINT DE DIVERGENCE ⚡</span>
                  </div>
                  <h3 className="card-title">
                    <span className="title-jp-small">{ootEvent.titleJp}</span>
                    <span className="title-fr-small">{ootEvent.titleFr}</span>
                  </h3>
                  {ootEvent.year && <div className="card-year">📅 {ootEvent.year}</div>}
                  <p className="card-preview">{ootEvent.description}</p>
                </div>
              </div>
            </div>

            {/* 3 BOUTONS DE BRANCHE - APRÈS OoT */}
            <div className="branch-buttons">
              <button
                className={`branch-btn ${activeBranch === 'all' ? 'active' : ''}`}
                onClick={() => setActiveBranch('all')}
              >
                <span className="branch-icon">🌐</span>
                <span>Toutes les branches</span>
              </button>

              <button
                className={`branch-btn defeat ${activeBranch === 'defeat' ? 'active' : ''}`}
                onClick={() => setActiveBranch('defeat')}
              >
                <span className="branch-icon">💀</span>
                <span>Branche de la Défaite</span>
                <span className="branch-count">{defeatCount}</span>
              </button>

              <button
                className={`branch-btn child ${activeBranch === 'child' ? 'active' : ''}`}
                onClick={() => setActiveBranch('child')}
              >
                <span className="branch-icon">🧒</span>
                <span>Branche de l'Enfance</span>
                <span className="branch-count">{childCount}</span>
              </button>

              <button
                className={`branch-btn adult ${activeBranch === 'adult' ? 'active' : ''}`}
                onClick={() => setActiveBranch('adult')}
              >
                <span className="branch-icon">🧔</span>
                <span>Branche de l'Adulte</span>
                <span className="branch-count">{adultCount}</span>
              </button>
            </div>

            {/* Indicateur visuel de séparation */}
            <div className="branch-separator">
              <span>┌─────────────────────────────────────────────────┐</span>
              <span>│  L'HISTOIRE SE DIVISE EN TROIS BRANCHES │</span>
              <span>└─────────────────────────────────────────────────┘</span>
            </div>
          </div>
        )}

        {/* Partie 2: Après OoT (selon branche sélectionnée) */}
        {filteredEvents
          .filter(e => e.branch !== 'common' && e.branch !== 'oot')
          .map((event, index) => (
            <div
              key={event.id}
              className={`timeline-item ${selectedEvent?.id === event.id ? 'active' : ''}`}
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <div className="timeline-marker" onClick={() => handleEventClick(event)}>
                <span className="marker-icon">{event.icon}</span>
                <div className="marker-pulse" />
              </div>
              <div className="timeline-content">
                <div className="timeline-card" onClick={() => handleEventClick(event)}>
                  <div className="card-branch">
                    {event.branch === 'defeat' && <span className="branch-tag defeat">💀 Branche Défaite</span>}
                    {event.branch === 'child' && <span className="branch-tag child">🧒 Branche Enfance</span>}
                    {event.branch === 'adult' && <span className="branch-tag adult">🧔 Branche Adulte</span>}
                  </div>
                  <h3 className="card-title">
                    <span className="title-jp-small">{event.titleJp}</span>
                    <span className="title-fr-small">{event.titleFr}</span>
                  </h3>
                  {event.year && (
                    <div className="card-year">
                      📅 {event.year}
                      {event.platform && (
                        <span className="card-platforms">{event.platform.join(' · ')}</span>
                      )}
                    </div>
                  )}
                  <p className="card-preview">{event.description.substring(0, 100)}...</p>
                  <div className="card-read-more">Lire la suite →</div>
                </div>
              </div>
            </div>
          ))}

        {/* BotW/TotK à la fin */}
        {timelineEvents.filter(e => e.id === 'breath-of-wild' || e.id === 'tears-of-kingdom').map((event) => (
          <div
            key={event.id}
            className={`timeline-item ${selectedEvent?.id === event.id ? 'active' : ''}`}
          >
            <div className="timeline-marker" onClick={() => handleEventClick(event)}>
              <span className="marker-icon">{event.icon}</span>
              <div className="marker-pulse" />
            </div>
            <div className="timeline-content">
              <div className="timeline-card" onClick={() => handleEventClick(event)}>
                <div className="card-branch">
                  <span className="branch-tag common">❓ Position non spécifiée</span>
                </div>
                <h3 className="card-title">
                  <span className="title-jp-small">{event.titleJp}</span>
                  <span className="title-fr-small">{event.titleFr}</span>
                </h3>
                {event.year && <div className="card-year">📅 {event.year}</div>}
                <p className="card-preview">{event.description.substring(0, 100)}...</p>
                <div className="card-read-more">Lire la suite →</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Détail */}
      {selectedEvent && (
        <div className="timeline-detail" ref={contentRef}>
          <div className="detail-header">
            <div className="detail-icon">{selectedEvent.icon}</div>
            <div>
              <h2 className="detail-title">
                <span className="detail-jp">{selectedEvent.titleJp}</span>
                <span className="detail-fr">{selectedEvent.titleFr}</span>
              </h2>
              {selectedEvent.year && <div className="detail-year">{selectedEvent.year}</div>}
            </div>
            <button className="detail-close" onClick={() => setSelectedEvent(null)}>✕</button>
          </div>
          <div className="detail-body">
            <p>{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;