import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

const slides = [
  {
    eyebrow: "New season, considered picks",
    title: "Discover products you'll love",
    description: "Quality goods, honest prices, and a shopping experience that gets out of your way.",
    cta: { label: "Shop Now", to: "/products" },
    secondaryCta: { label: "Explore Categories", to: "/products" },
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80",
  },
  {
    eyebrow: "Just landed",
    title: "The tech edit, refreshed",
    description: "Headphones, keyboards, and everyday carry — tested by us, picked for you.",
    cta: { label: "Shop Electronics", to: "/products?category=electronics" },
    secondaryCta: { label: "See What's New", to: "/products" },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
  },
  {
    eyebrow: "Limited time",
    title: "Up to 30% off select styles",
    description: "Seasonal favorites at a better price, while stock lasts.",
    cta: { label: "Shop the Sale", to: "/products" },
    secondaryCta: { label: "View Details", to: "/products" },
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
  },
];

const AUTOPLAY_MS = 5500;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }, [index]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [next, paused]);

  const slide = slides[index];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  const imgVariants = {
    enter: { opacity: 0, scale: 1.06 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  };

  return (
    <section
      className="relative overflow-hidden border-b border-line bg-stone-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div className="relative max-w-lg" style={{ minHeight: 260 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mb-3 text-xs font-medium uppercase tracking-wider text-brass-600"
              >
                {slide.eyebrow}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.45 }}
                className="font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45 }}
                className="mt-4 text-base text-ink-500"
              >
                {slide.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.45 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Button as={Link} to={slide.cta.to} size="lg" variant="accent">
                  {slide.cta.label} <ArrowRight size={16} />
                </Button>
                <Button as={Link} to={slide.secondaryCta.to} size="lg" variant="outline">
                  {slide.secondaryCta.label}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-square">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={index}
              src={slide.image}
              alt=""
              custom={direction}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>

          {/* Arrows */}
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-stone-50/80 text-ink backdrop-blur transition-colors hover:bg-stone-50"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-stone-50/80 text-ink backdrop-blur transition-colors hover:bg-stone-50"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className="relative h-1.5 overflow-hidden rounded-full bg-stone-50/50"
                style={{ width: i === index ? 24 : 8, transition: "width 0.3s ease" }}
              >
                {i === index && !paused && (
                  <motion.span
                    key={index}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-brass-500"
                  />
                )}
                {i === index && paused && <span className="absolute inset-0 bg-brass-500" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
