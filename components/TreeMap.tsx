"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mockTrees } from "@/data/mockTrees";
import { Tree } from "@/types/tree";
import TreeDetailModal from "./TreeDetailModal";
import TreeQuickViewModal from "./TreeQuickViewModal";
import { Card } from "@/components/ui/card";
import { TreePine, Loader2, MapPin } from "lucide-react";

// Set your Mapbox access token from environment variable
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

const ALL_STATUSES = [
  "healthy",
  "growing",
  "planted",
  "needs-attention",
] as const;

const statusMeta: Record<string, { label: string; color: string }> = {
  healthy: { label: "Healthy", color: "#16a34a" },
  growing: { label: "Growing", color: "#3b82f6" },
  planted: { label: "Planted", color: "#eab308" },
  "needs-attention": { label: "Needs Care", color: "#f97316" },
};

const TreeMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [statusFilters, setStatusFilters] = useState<string[]>([
    ...ALL_STATUSES,
  ]);
  const [search, setSearch] = useState("");
  const [showLegend, setShowLegend] = useState(true);

  const filteredTrees = useMemo(() => {
    return mockTrees.filter(
      (t) =>
        statusFilters.includes(t.status) &&
        (t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.species.toLowerCase().includes(search.toLowerCase()) ||
          t.location.state.toLowerCase().includes(search.toLowerCase()))
    );
  }, [statusFilters, search]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map centered on Nigeria
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [8.6753, 9.082], // Nigeria center
      zoom: 5.5,
      minZoom: 5,
      maxZoom: 12,
      maxBounds: [
        [2.0, 4.0], // Southwest Nigeria
        [15.0, 14.0], // Northeast Nigeria
      ],
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      setMapLoaded(true);

      // Add Nigeria boundary GeoJSON
      map.addSource("nigeria-boundary", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [2.668, 4.273],
                [3.7, 4.4],
                [4.5, 4.7],
                [5.0, 5.3],
                [5.8, 5.8],
                [6.5, 6.2],
                [7.2, 6.8],
                [8.0, 7.5],
                [8.8, 8.5],
                [9.5, 9.3],
                [10.2, 10.0],
                [11.0, 11.2],
                [11.8, 12.0],
                [12.5, 13.0],
                [13.2, 13.5],
                [14.0, 13.4],
                [14.5, 12.8],
                [14.2, 11.5],
                [13.5, 10.8],
                [13.0, 10.0],
                [12.5, 9.0],
                [11.8, 8.2],
                [11.0, 7.5],
                [10.2, 6.8],
                [9.5, 6.2],
                [8.8, 5.8],
                [8.0, 5.3],
                [7.2, 4.9],
                [6.5, 4.7],
                [5.8, 4.5],
                [5.0, 4.4],
                [4.2, 4.3],
                [3.5, 4.2],
                [2.668, 4.273],
              ],
            ],
          },
        },
      });

      // Add Nigeria boundary layer with fill
      map.addLayer({
        id: "nigeria-fill",
        type: "fill",
        source: "nigeria-boundary",
        paint: {
          "fill-color": "#f0fdf4",
          "fill-opacity": 0.3,
        },
      });

      // Add Nigeria boundary outline
      map.addLayer({
        id: "nigeria-outline",
        type: "line",
        source: "nigeria-boundary",
        paint: {
          "line-color": "#16a34a",
          "line-width": 3,
          "line-opacity": 0.8,
        },
      });

      // Add state density circles as heatmap
      const nigerianStates = [
        { name: "Lagos", coords: [3.3792, 6.5244], trees: 15420 },
        { name: "Abuja (FCT)", coords: [7.3986, 9.0765], trees: 12350 },
        { name: "Kano", coords: [8.5136, 11.9962], trees: 8920 },
        { name: "Rivers", coords: [7.0498, 4.8156], trees: 11200 },
        { name: "Oyo", coords: [3.947, 7.3775], trees: 9850 },
        { name: "Kaduna", coords: [7.4388, 10.5264], trees: 7630 },
        { name: "Cross River", coords: [8.5988, 5.8702], trees: 14200 },
        { name: "Plateau", coords: [8.8583, 9.8965], trees: 6540 },
        { name: "Enugu", coords: [7.4941, 6.4254], trees: 5320 },
        { name: "Delta", coords: [5.6804, 5.8904], trees: 8760 },
        { name: "Borno", coords: [13.15, 11.8333], trees: 4230 },
        { name: "Sokoto", coords: [5.2476, 13.0059], trees: 3890 },
      ];

      // Add state density data
      const stateFeatures = nigerianStates.map((state) => ({
        type: "Feature" as const,
        properties: {
          name: state.name,
          trees: state.trees,
          density: state.trees / 1000,
        },
        geometry: {
          type: "Point" as const,
          coordinates: state.coords,
        },
      }));

      map.addSource("state-density", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stateFeatures,
        },
      });

      // Add heatmap layer for state density
      map.addLayer({
        id: "state-heatmap",
        type: "heatmap",
        source: "state-density",
        paint: {
          "heatmap-weight": ["get", "density"],
          "heatmap-intensity": 0.5,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "#dcfce7",
            0.4,
            "#86efac",
            0.6,
            "#4ade80",
            0.8,
            "#22c55e",
            1,
            "#16a34a",
          ],
          "heatmap-radius": 50,
          "heatmap-opacity": 0.6,
        },
      });

      // Add state labels
      map.addLayer({
        id: "state-labels",
        type: "symbol",
        source: "state-density",
        layout: {
          "text-field": [
            "format",
            ["get", "name"],
            { "font-scale": 0.9 },
            "\n",
            {},
            ["get", "trees"],
            { "font-scale": 0.8 },
            " trees",
            { "font-scale": 0.7 },
          ],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-size": 12,
          "text-anchor": "center",
          "text-offset": [0, 0],
        },
        paint: {
          "text-color": "#16a34a",
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        },
      });

      // Initial markers will be added in separate effect once mapLoaded true
      setMapLoaded(true);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Add / update markers when filters or search change
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    // clear existing
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    filteredTrees.forEach((tree) => {
      // Create custom marker element
      const el = document.createElement("div");
      el.className = "tree-marker";

      const color = statusMeta[tree.status]?.color || statusMeta.healthy.color;

      el.innerHTML = `
          <div class="tree-marker-container" style="position: relative; cursor: pointer;">
            <div class="tree-marker-pulse" style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 30px;
              height: 30px;
              background: ${color};
              border-radius: 50%;
              opacity: 0.3;
              animation: pulse 2s infinite;
            "></div>
            <div class="tree-marker-icon" style="
              position: relative;
              width: 24px;
              height: 24px;
              background: ${color};
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" style="transform: rotate(45deg);">
                <path d="M12 2L8 7h3v4h2V7h3L12 2zm0 6l-4 5h3v7h2v-7h3l-4-5z"/>
              </svg>
            </div>
          </div>
        `;

      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([tree.location.lng, tree.location.lat])
        .addTo(mapRef.current as mapboxgl.Map);

      // Add popup with improved styling
      const popupContent = `
          <div style="padding: 8px; min-width: 180px;">
            <h3 style="font-weight: 600; font-size: 14px; margin-bottom: 2px;">${tree.name}</h3>
            <p style="color: #666; font-size: 12px; margin-bottom: 6px; font-style: italic;">${tree.species}</p>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 3px;">
              <span style="color: #666;">Location:</span>
              <span style="font-size: 10px;">${tree.location.city}, ${tree.location.state}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 3px;">
              <span style="color: #666;">Status:</span>
              <span style="
                background: ${color}20;
                color: ${color};
                padding: 1px 6px;
                border-radius: 8px;
                font-size: 9px;
                font-weight: 600;
              ">${tree.status}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 6px;">
              <span style="color: #666;">CO₂ Offset:</span>
              <span style="font-size: 10px;">${tree.carbonOffset} kg/year</span>
            </div>
            <button onclick="window.viewTreeDetails('${tree.id}')" style="
              width: 100%;
              padding: 6px;
              background: linear-gradient(to right, #16a34a, #15803d);
              color: white;
              border: none;
              border-radius: 4px;
              font-size: 11px;
              font-weight: 600;
              cursor: pointer;
            ">View Details</button>
          </div>
        `;

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: "tree-popup",
      }).setHTML(popupContent);

      marker.setPopup(popup);

      // Add click handler for marker icon - shows quick view modal
      el.addEventListener("click", () => {
        setSelectedTree(tree);
        setIsQuickViewOpen(true);
      });

      markersRef.current.push(marker);
    });

    // global helper for popup button - shows detail modal
    if (typeof window !== "undefined") {
      (
        window as unknown as { viewTreeDetails?: (id: string) => void }
      ).viewTreeDetails = (id: string) => {
        const tree = mockTrees.find((t) => t.id === id);
        if (tree) {
          setSelectedTree(tree);
          setIsDetailModalOpen(true);
        }
      };
    }
  }, [filteredTrees, mapLoaded]);

  const toggleStatus = (status: string) => {
    setStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const clearFilters = () => {
    setStatusFilters([...ALL_STATUSES]);
    setSearch("");
  };

  return (
    <>
      <section
        id="map"
        className="relative py-12 md:py-20 bg-gradient-to-b from-green-50/60 via-white to-green-50/40"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium ring-1 ring-green-200/50">
                  <MapPin className="w-4 h-4" />
                  Explore Trees
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Tree Explorer
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Search, filter, and explore live data from our tree planting
                efforts across Nigeria. Click any marker or list item to view
                details.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, species or state"
                  className="w-72 max-w-full rounded-xl border border-gray-200 bg-white/70 backdrop-blur px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  {filteredTrees.length}
                </span>
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-green-700 font-medium hover:underline"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Map area */}
            <div className="lg:col-span-8 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-green-100/60 bg-white/40 backdrop-blur">
                <div
                  ref={mapContainerRef}
                  className="w-full h-[calc(100vh-200px)] min-h-[600px]"
                />
                {!mapLoaded && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
                      <p className="text-gray-600">Loading map...</p>
                    </div>
                  </div>
                )}

                {/* Legend / filters toggle */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <button
                    onClick={() => setShowLegend((s) => !s)}
                    className="px-3 py-2 rounded-lg bg-white/90 text-xs font-medium shadow hover:bg-white transition"
                  >
                    {showLegend ? "Hide Legend" : "Show Legend"}
                  </button>
                  {showLegend && (
                    <Card className="p-4 pr-6 bg-white/95 backdrop-blur shadow-xl border-0 w-60 space-y-3 text-sm">
                      <p className="font-semibold text-gray-800">
                        Status Filters
                      </p>
                      <div className="space-y-2">
                        {ALL_STATUSES.map((s) => {
                          const active = statusFilters.includes(s);
                          const meta = statusMeta[s];
                          return (
                            <button
                              key={s}
                              onClick={() => toggleStatus(s)}
                              className={`group w-full flex items-center gap-3 rounded-lg px-2 py-1.5 text-left border text-xs transition ${
                                active
                                  ? "border-green-500 bg-green-50"
                                  : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                              }`}
                            >
                              <span className="relative flex h-3 w-3">
                                <span
                                  style={{ background: meta.color }}
                                  className="h-3 w-3 rounded-full absolute inset-0 opacity-70 group-hover:scale-110 transition"
                                />
                              </span>
                              <span className="flex-1 font-medium capitalize">
                                {meta.label}
                              </span>
                              <span className="text-[10px] text-gray-500">
                                {mockTrees.filter((t) => t.status === s).length}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            {/* Side list */}
            <div className="lg:col-span-4 space-y-4">
              <Card className="p-4 bg-white/80 backdrop-blur border-0 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <TreePine className="w-5 h-5 text-green-600" /> Trees (
                    {filteredTrees.length})
                  </h3>
                  <span className="text-xs text-gray-500">
                    {statusFilters.length === ALL_STATUSES.length
                      ? "All statuses"
                      : `${statusFilters.length} active`}
                  </span>
                </div>
                <div className="max-h-[calc(100vh-280px)] min-h-[520px] overflow-y-auto pr-1 custom-scroll space-y-2">
                  {filteredTrees.map((tree) => (
                    <button
                      key={tree.id}
                      onClick={() => {
                        setSelectedTree(tree);
                        setIsQuickViewOpen(true);
                        mapRef.current?.flyTo({
                          center: [tree.location.lng, tree.location.lat],
                          zoom: 9,
                          essential: true,
                        });
                      }}
                      className="w-full text-left bg-white/70 hover:bg-green-50 border border-green-100 rounded-xl p-3 flex flex-col gap-1 transition shadow-sm hover:shadow"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm text-gray-800 truncate">
                          {tree.name}
                        </p>
                        <span
                          style={{
                            background:
                              (statusMeta[tree.status]?.color || "#16a34a") +
                              "22",
                            color: statusMeta[tree.status]?.color,
                          }}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize"
                        >
                          {tree.status.replace("-", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {tree.species}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {tree.location.city}, {tree.location.state} •{" "}
                        {tree.carbonOffset}kg CO₂/yr
                      </p>
                    </button>
                  ))}
                  {filteredTrees.length === 0 && (
                    <p className="text-xs text-gray-500 italic p-4 text-center">
                      No trees match your filters.
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <TreeDetailModal
        tree={selectedTree}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        .mapboxgl-popup {
          max-width: none !important;
        }

        .mapboxgl-popup-content {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          padding: 0;
          overflow: hidden;
        }

        .mapboxgl-popup-tip {
          display: none;
        }

        .tree-marker-container:hover .tree-marker-icon {
          transform: rotate(-45deg) scale(1.1);
        }

        .tree-marker-icon {
          transition: transform 0.2s;
        }

        .mapboxgl-ctrl-group {
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .mapboxgl-ctrl-group button {
          border-radius: 8px;
        }
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
};

export default TreeMap;
