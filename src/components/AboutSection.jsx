import React from 'react';
import { motion } from 'motion/react';

const AboutSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-white to-[#f8faff] dark:from-gray-900 dark:to-black"></div>
            <div className="absolute top-20 right-[-10%] w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-[-10%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="container px-4 mx-auto">
                {/* Header Section matching Why Choose Us style */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col lg:flex-row items-center gap-8 mb-20"
                >
                    <div className="lg:w-1/2">
                        <h2 className="why-title text-[#273d4e] dark:text-white">
                            About<br />
                            Us
                        </h2>
                    </div>
                    <div className="lg:w-1/2">
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed border-l-4 border-orange-500 pl-6">
                            Crafting digital experiences that empower brands to reach their full potential. We blend innovation with technical excellence to deliver results that matter.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col lg:flex-row items-center gap-16"
                >
                    {/* Image Section */}
                    <motion.div variants={itemVariants} className="lg:w-1/2 relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                            <img
                                src="assets/img/about-2.jpg"
                                alt="Modern Digital Agency"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>

                        {/* Experience Card Overlay */}
                        <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl z-20 backdrop-blur-md border border-white/20">
                            <div className="text-4xl font-bold text-orange-600 mb-1">10+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Years of Innovation</div>
                        </div>

                        {/* Decorative Dot Grid */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:20px_20px] -z-10"></div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div variants={itemVariants} className="lg:w-1/2">
                        <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                            Our Mission
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
                            Transforming Ideas Into <span className="text-orange-600">Digital Reality</span>
                        </h3>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                            At WebWing24, we don't just build websites; we create digital experiences that resonate with your audience.
                            Our team blends artistry with data-driven strategies to elevate your brand landscape.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                                    <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast Results</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Rapid development cycles without compromising quality.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 flex-shrink-0 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                                    <svg className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure Design</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Security-first approach in every line of code.</p>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                        >
                            Discover Our Vision
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
