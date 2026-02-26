import * as React from 'react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const transition = {
    type: 'spring',
    stiffness: 240,
    damping: 24,
    mass: 1,
};

const useEmblaControls = (emblaApi) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState([]);

    const onDotClick = React.useCallback(
        (index) => emblaApi?.scrollTo(index),
        [emblaApi],
    );

    const onPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const onNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onInit = React.useCallback((api) => {
        setScrollSnaps(api.scrollSnapList());
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    const onSelect = React.useCallback((api) => {
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    React.useEffect(() => {
        if (!emblaApi) return;
        onInit(emblaApi);
        emblaApi.on('reInit', onInit).on('select', onSelect);
        return () => {
            emblaApi.off('reInit', onInit).off('select', onSelect);
        };
    }, [emblaApi, onInit, onSelect]);

    return { selectedIndex, scrollSnaps, onDotClick, onPrev, onNext };
};

function MotionCarousel({ items, options }) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { ...options, loop: true, align: 'center', containScroll: false },
        [Autoplay({ delay: 5000, stopOnInteraction: false })]
    );

    const { selectedIndex, scrollSnaps, onDotClick, onPrev, onNext } = useEmblaControls(emblaApi);

    return (
        <div className="w-full flex flex-col gap-6 relative px-4 sm:px-10">
            {/* Main Viewport */}
            <div className="overflow-visible" ref={emblaRef}>
                <div className="flex flex-row" style={{ touchAction: 'pan-y pinch-zoom' }}>
                    {items.map((item, index) => {
                        const isActive = index === selectedIndex;

                        return (
                            <div
                                key={item.id || index}
                                className="flex-none px-4"
                                style={{
                                    flex: '0 0 85%', // Wider for mobile
                                    maxWidth: '900px', // Large desktop limit
                                }}
                            >
                                <div className="relative group">
                                    <motion.div
                                        className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] bg-[#111] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl"
                                        initial={false}
                                        animate={{
                                            scale: isActive ? 1 : 0.9,
                                            opacity: isActive ? 1 : 0.5,
                                        }}
                                        transition={transition}
                                    >
                                        {/* Project Image */}
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover object-top"
                                        />

                                        {/* Content Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 bg-gradient-to-t from-black/90 to-transparent text-white">
                                            <h3 className="text-xl sm:text-3xl font-bold mb-1">{item.title}</h3>
                                            <p className="text-xs sm:text-sm text-gray-400">Project Insight by Webwing24</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Controls Matching Screenshot */}
            <div className="flex items-center justify-between w-full mt-4 sm:mt-10">
                {/* Left Arrow */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onPrev}
                    className="rounded-xl size-10 sm:size-12 border-white/10 bg-white/5 text-white hover:bg-white/20 transition-all backdrop-blur-md"
                >
                    <ChevronLeft className="size-5" />
                </Button>

                {/* Center Pill + Dots */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white rounded-full px-5 py-2">
                        <span className="text-black text-xs font-bold whitespace-nowrap">Slide {selectedIndex + 1}</span>
                    </div>
                    <div className="flex gap-2">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => onDotClick(index)}
                                className={`size-2.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-white scale-125' : 'bg-white/30'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Arrow */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onNext}
                    className="rounded-xl size-10 sm:size-12 border-white/10 bg-white/5 text-white hover:bg-white/20 transition-all backdrop-blur-md"
                >
                    <ChevronRight className="size-5" />
                </Button>
            </div>
        </div>
    );
}

export { MotionCarousel };
