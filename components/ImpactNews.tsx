"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Newspaper,
  Share2,
  Bookmark,
  ExternalLink,
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  actionUrl: string;
  isExternal?: boolean;
}

const news: NewsItem[] = [
  {
    id: "1",
    title: "500 New Seedlings Planted in Lagos Mangrove Belt",
    summary:
      "Community volunteers and students joined forces to restore degraded mangrove edges, improving coastal resilience and biodiversity.",
    date: "2025-08-15",
    category: "Planting",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=60",
    readTime: "3 min read",
    actionUrl: "/news/mangrove-planting-lagos",
  },
  {
    id: "2",
    title: "Partnership Expands Reforestation in Northern Nigeria",
    summary:
      "New collaboration accelerates planting in erosion‑prone savanna corridors while creating green jobs for local youth.",
    date: "2025-08-20",
    category: "Partnership",
    image:
      "https://images.unsplash.com/photo-1647220576336-f2e94680f3b8?auto=format&fit=crop&w=900&q=60",
    readTime: "4 min read",
    actionUrl: "/news/northern-nigeria-partnership",
  },
  {
    id: "3",
    title: "Drones Track Early Growth Success Rates",
    summary:
      "High‑resolution imagery feeds survival analytics enabling targeted interventions where needed most.",
    date: "2025-08-24",
    category: "Innovation",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=60",
    readTime: "5 min read",
    actionUrl: "/news/drone-tracking-success",
  },
  {
    id: "4",
    title: "Women-Led Cooperative Nurtures 10,000 Seedlings",
    summary:
      "A rural cooperative scales climate action while generating sustainable household income streams.",
    date: "2025-08-28",
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=900&q=60",
    readTime: "4 min read",
    actionUrl: "/news/women-led-cooperative",
  },
  {
    id: "5",
    title: "Soil Health Boost from Multi-Species Mix",
    summary:
      "Early indicators show improved soil moisture retention where diverse native seedlings were introduced.",
    date: "2025-08-29",
    category: "Research",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=60",
    readTime: "6 min read",
    actionUrl: "https://research.onemilliontrees.org/soil-health-study",
    isExternal: true,
  },
];

export default function ImpactNews() {
  const handleShare = async (item: NewsItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.summary,
          url: window.location.origin + item.actionUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.origin + item.actionUrl);
    }
  };

  const handleBookmark = (item: NewsItem) => {
    // In a real app, this would save to user's bookmarks
    console.log("Bookmarked:", item.title);
    // You could also show a toast notification here
  };

  const handleReadMore = (item: NewsItem) => {
    if (item.isExternal) {
      window.open(item.actionUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = item.actionUrl;
    }
  };
  return (
    <section className="py-28 bg-white" aria-labelledby="impact-news-heading">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium ring-1 ring-green-200/50">
                <Newspaper className="w-4 h-4" />
                Latest Updates
              </span>
            </div>
            <h2
              id="impact-news-heading"
              className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4"
            >
              Impact Gallery
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Discover real-time field updates and community achievements. Click
              to explore stories, share impact, and get involved in ongoing
              initiatives.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="/news"
              className="inline-flex items-center gap-2 text-green-700 font-medium hover:text-green-800 transition-colors"
            >
              View all updates <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/get-involved"
              className="inline-flex items-center gap-2 text-green-700 font-medium hover:text-green-800 transition-colors"
            >
              Get Involved <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:grid-rows-2 auto-rows-[220px]">
          {news.slice(0, 5).map((item, i) => {
            const isFeature = i === 0;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: i * 0.06 }}
                viewport={{ once: true }}
                className={[
                  "group relative overflow-hidden rounded-2xl ring-1 ring-gray-200/60 bg-gray-100 cursor-pointer",
                  isFeature
                    ? "lg:col-span-3 lg:row-span-2 h-[460px]"
                    : "h-[220px]",
                ].join(" ")}
                onClick={() => handleReadMore(item)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={
                    isFeature
                      ? "(max-width:1024px) 100vw, 60vw"
                      : "(max-width:1024px) 100vw, 40vw"
                  }
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />

                {/* Action buttons overlay */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(item);
                    }}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-gray-900 transition-colors shadow-sm"
                    title="Share this story"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(item);
                    }}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-gray-900 transition-colors shadow-sm"
                    title="Bookmark this story"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <div
                  className={[
                    "absolute inset-0 flex flex-col justify-end",
                    isFeature ? "p-7 md:p-9" : "p-4",
                  ].join(" ")}
                >
                  <span className="inline-flex self-start mb-3 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-medium tracking-wide text-emerald-700 ring-1 ring-emerald-200">
                    {item.category}
                  </span>
                  <h3
                    className={[
                      "font-semibold leading-snug text-white drop-shadow",
                      isFeature
                        ? "text-2xl md:text-3xl max-w-[34ch]"
                        : "text-sm md:text-base line-clamp-2",
                    ].join(" ")}
                  >
                    {item.title}
                  </h3>
                  {isFeature && (
                    <p className="mt-5 text-[13px] md:text-sm text-white/85 leading-relaxed max-w-[68ch] line-clamp-[10]">
                      {item.summary}
                    </p>
                  )}
                  <div className="mt-5 flex items-center justify-between text-[11px] text-white/65">
                    <div className="flex items-center gap-3">
                      <time dateTime={item.date}>
                        {new Date(item.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span className="text-white/50">•</span>
                      <span>{item.readTime}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-emerald-300 group-hover:text-emerald-200 font-medium">
                      Read more
                      {item.isExternal ? (
                        <ExternalLink className="w-3 h-3" />
                      ) : (
                        <ArrowRight className="w-3 h-3" />
                      )}
                    </span>
                  </div>
                </div>
                {isFeature && (
                  <div className="absolute left-0 top-0 p-5 flex gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600/85 backdrop-blur text-[10px] font-medium text-white ring-1 ring-emerald-300/40">
                      Latest
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-600/85 backdrop-blur text-[10px] font-medium text-white ring-1 ring-blue-300/40">
                      Featured
                    </span>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
