import { useCallback, useRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';

export function useMapSync() {
  const mapA = useRef<LeafletMap | null>(null);
  const mapB = useRef<LeafletMap | null>(null);
  const syncing = useRef(false);

  const syncFrom = useCallback((source: 'A' | 'B') => {
    if (syncing.current) return;
    syncing.current = true;

    const from = source === 'A' ? mapA.current : mapB.current;
    const to = source === 'A' ? mapB.current : mapA.current;

    if (from && to) {
      to.setView(from.getCenter(), from.getZoom(), { animate: false });
    }

    window.setTimeout(() => {
      syncing.current = false;
    }, 50);
  }, []);

  return { mapA, mapB, syncFrom };
}
