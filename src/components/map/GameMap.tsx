// GameMap.tsx
import React, { useState, useCallback, useMemo } from 'react';
import { mmLocations, ootLocations, type Location, type Check } from '../../data/locations';
import { useGameStore } from '../../store/gameStore';
import './GameMap.css';

type GameType = 'oot' | 'mm';

interface GameMapProps {
  completedChecks?: string[];
  onCheckToggle?: (locationId: string, checkName: string) => void;
  onLocationClick?: (location: Location) => void;
  selectedRegion?: string;
  filterCompleted?: boolean;
}

export const GameMap: React.FC<GameMapProps> = ({
  completedChecks = [],
  onCheckToggle,
  onLocationClick,
  selectedRegion = 'all',
  filterCompleted = false
}) => {
  const { currentGame, setCurrentGame } = useGameStore();
  const [tooltipLocation, setTooltipLocation] = useState<{ x: number; y: number; location: Location } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [zoom, setZoom] = useState(1);

  const currentLocations: Location[] = currentGame === 'mm' ? mmLocations : ootLocations;

  const isCheckCompleted = useCallback((checkName: string): boolean => {
    return completedChecks.includes(checkName);
  }, [completedChecks]);

  const areCheckRequirementsMet = useCallback((check: Check): boolean => {
    if (!check.requirements || check.requirements.length === 0) return true;
    return check.requirements.every(req => isCheckCompleted(req));
  }, [isCheckCompleted]);

  const getCompletedChecksCount = useCallback((location: Location): number => {
    return location.checks.filter(check => isCheckCompleted(check.name)).length;
  }, [isCheckCompleted]);

  const isLocationComplete = useCallback((location: Location): boolean => {
    return getCompletedChecksCount(location) === location.checks.length;
  }, [getCompletedChecksCount]);

  const areLocationRequirementsMet = useCallback((location: Location): boolean => {
    if (!location.requirements || location.requirements.length === 0) return true;
    return location.requirements.every(req => isCheckCompleted(req));
  }, [isCheckCompleted]);

  const filteredLocations = useMemo(() => {
    let filtered = [...currentLocations];
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(loc => loc.region === selectedRegion);
    }
    if (filterCompleted) {
      filtered = filtered.filter(loc => !isLocationComplete(loc));
    }
    return filtered;
  }, [currentLocations, selectedRegion, filterCompleted, isLocationComplete]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleReset = () => setZoom(1);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    if (onLocationClick) onLocationClick(location);
  };

  const handleCheckToggle = (checkName: string) => {
    if (selectedLocation && onCheckToggle) {
      onCheckToggle(selectedLocation.id, checkName);
    }
  };

  const handleGameSwitch = (game: GameType) => {
    setCurrentGame(game);
    setSelectedLocation(null);
    setTooltipLocation(null);
  };

  const handleMouseEnter = (e: React.MouseEvent, location: Location) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltipLocation({ x: rect.right + 10, y: rect.top, location });
  };

  const handleMouseLeave = () => setTooltipLocation(null);

  const globalCompletionRate = useMemo(() => {
    let totalChecks = 0, completed = 0;
    currentLocations.forEach(loc => {
      totalChecks += loc.checks.length;
      completed += getCompletedChecksCount(loc);
    });
    if (totalChecks === 0) return 0;
    return Math.round((completed / totalChecks) * 100);
  }, [currentLocations, getCompletedChecksCount]);

  const showProgress = globalCompletionRate > 0;

  const renderModal = () => {
    if (!selectedLocation) return null;
    const totalChecks = selectedLocation.checks.length;
    const completedCount = getCompletedChecksCount(selectedLocation);

    return (
      <div className="modal-overlay" onClick={() => setSelectedLocation(null)}>
        <div className="location-modal" onClick={e => e.stopPropagation()}>
          <div className="location-modal-header">
            <span className="location-modal-icon">{selectedLocation.icon}</span>
            <h3>{selectedLocation.name}</h3>
            <button className="location-modal-close" onClick={() => setSelectedLocation(null)}>✕</button>
          </div>
          <div className="location-modal-body">
            <div className="location-region">
              <span>📍 {selectedLocation.region}</span>
              <span className={`location-type ${selectedLocation.type}`}>
                {selectedLocation.type === 'dungeon' ? '🏛️ Donjon' : '📍 Zone'}
              </span>
            </div>
            {showProgress && (
              <div className="location-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(completedCount / totalChecks) * 100}%` }} />
                </div>
                <div className="progress-text">{completedCount}/{totalChecks} complétés</div>
              </div>
            )}
            {selectedLocation.requirements && selectedLocation.requirements.length > 0 && (
              <div className="location-requirements">
                <h4>🔒 Accès requis :</h4>
                <div className="requirements-list">
                  {selectedLocation.requirements.map(req => (
                    <span key={req} className={`requirement-badge ${isCheckCompleted(req) ? 'met' : 'missing'}`}>
                      {isCheckCompleted(req) ? '✅' : '❌'} {req}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="location-checks">
              <h4>📦 Coffres & Épreuves :</h4>
              <ul>
                {selectedLocation.checks.map(check => {
                  const isCompleted = isCheckCompleted(check.name);
                  const requirementsMet = areCheckRequirementsMet(check);
                  return (
                    <li key={check.name} className={`check-item ${isCompleted ? 'completed' : requirementsMet ? 'accessible' : 'locked'}`}
                      onClick={() => requirementsMet && !isCompleted && handleCheckToggle(check.name)}>
                      <span className="check-status">{isCompleted ? '✅' : requirementsMet ? '⬜' : '🔒'}</span>
                      <span className="check-name">{check.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTooltip = () => {
    if (!tooltipLocation) return null;
    const { x, y, location } = tooltipLocation;
    const completed = getCompletedChecksCount(location);
    const total = location.checks.length;

    return (
      <div className="map-tooltip" style={{ position: 'fixed', left: x, top: y }}>
        <strong>{location.name}</strong>
        <div className="tooltip-progress">{completed}/{total}</div>
      </div>
    );
  };

  const renderLocationMarker = (location: Location) => {
    const isComplete = isLocationComplete(location);
    const isAccessible = areLocationRequirementsMet(location);
    const completedCount = getCompletedChecksCount(location);
    const totalChecks = location.checks.length;

    let statusClass = 'locked';
    if (isComplete) statusClass = 'completed';
    else if (isAccessible) statusClass = 'unlocked';

    return (
      <div key={location.id} className={`map-location ${location.type} ${statusClass}`}
        style={{ left: `${location.x}%`, top: `${location.y}%` }}
        onClick={() => handleLocationClick(location)}
        onMouseEnter={(e) => handleMouseEnter(e, location)}
        onMouseLeave={handleMouseLeave}>
        <div className="location-icon">{location.icon}</div>
        {totalChecks > 0 && completedCount === totalChecks && <div className="location-check">✓</div>}
        <div className="location-tooltip">
          <div>{location.name}</div>
          <div>{completedCount}/{totalChecks}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="game-map-container">
      <div className="map-header">
        <div className="map-title-section">
          <h3 className="map-title">🗺️ Carte du Monde</h3>
          <div className="game-selector">
            <button className={`game-select-btn ${currentGame === 'oot' ? 'active' : ''}`} onClick={() => handleGameSwitch('oot')}>🗡️ Ocarina of Time</button>
            <button className={`game-select-btn ${currentGame === 'mm' ? 'active' : ''}`} onClick={() => handleGameSwitch('mm')}>🎭 Majora's Mask</button>
          </div>
        </div>
        <div className="map-controls">
          <button onClick={handleZoomIn}>+</button>
          <button onClick={handleZoomOut}>-</button>
          <button onClick={handleReset}>⟳</button>
        </div>
      </div>

      {showProgress && (
        <div className="global-progress">
          <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: `${globalCompletionRate}%` }} /></div>
          <div className="progress-text">{globalCompletionRate}% complété</div>
        </div>
      )}

      <div className="map-grid" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}>
        {filteredLocations.map(renderLocationMarker)}
        {filteredLocations.length === 0 && <div className="map-empty"><p>Aucun lieu trouvé</p></div>}
      </div>

      <div className="map-legend">
        <div className="legend-item"><div className="legend-dot unlocked" /><span>Débloqué</span></div>
        <div className="legend-item"><div className="legend-dot locked" /><span>Verrouillé</span></div>
        <div className="legend-item"><div className="legend-dot completed" /><span>Complété</span></div>
        <div className="legend-item"><div className="legend-dot dungeon" /><span>Donjon</span></div>
      </div>

      {renderModal()}
      {renderTooltip()}
    </div>
  );
};

export default GameMap;