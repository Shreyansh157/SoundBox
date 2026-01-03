import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Heart, Award, CheckCircle, Plus, Minus, Headphones, Truck, Sliders } from "lucide-react";
import Navbar from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import { TEAM, TIMELINE } from "../data/data";

// --- FAQ DATA (Local to this page) ---
const FAQS = [
  {
    question: "Do you offer onsite technical support?",
    answer:
      "Absolutely. For large-scale events, we deploy a dedicated audio engineer to monitor levels, manage wireless frequencies, and ensure seamless execution from soundcheck to encore.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We understand events are fluid. Cancellations made 72 hours prior to the dispatch date receive a full refund. Within 72 hours, a 50% holding fee applies to cover equipment reservation costs.",
  },
  {
    question: "Do you deliver outside the city limits?",
    answer:
      "Yes. We service the greater metro area and can travel statewide for special commissions. Logistics fees are calculated based on mileage and equipment load.",
  },
  {
    question: "Can I demo the equipment before renting?",
    answer:
      "We encourage it. Visit our showroom by appointment to experience our catalog firsthand. Our specialists will help you curate the perfect setup for your specific venue acoustics.",
  },
];

const About = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="font-sans antialiased bg-brand-gray min-h-screen flex flex-col selection:bg-brand-gold selection:text-white">
      <Navbar />

      {/* ================= 1. CINEMATIC HERO ================= */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Our Philosophy</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-8">
              Amplify the <br />
              <span className="italic font-light">Human Connection.</span>
            </h1>
            <p className="text-xl text-white/80 font-light leading-relaxed">
              SoundBox isn't just a rental company. We are the invisible architecture behind the city's most memorable moments. We engineer the
              atmosphere so you can focus on the message.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. VALUES (Re-designed) ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Target,
                title: "Precision",
                desc: "We believe audio should be invisible. No feedback, no dropouts, just pure, crystal-clear sound delivered exactly as intended.",
              },
              {
                icon: Heart,
                title: "Passion",
                desc: "We are musicians and engineers first. We care about your mix as much as you do, curating gear we would use ourselves.",
              },
              {
                icon: Award,
                title: "Reliability",
                desc: "Our gear is triple-checked before dispatch. We don't believe in 'technical difficulties'—only flawless execution.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center justify-center group p-8 rounded-2xl border border-gray-100 bg-brand-gray hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-brand-dark text-brand-gold rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. NEW: OUR PROCESS ================= */}
      <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">How We Work</h2>
            <p className="text-white/60">From concept to curtain call.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>

            {[
              {
                icon: Headphones,
                step: "01",
                title: "Consultation",
                text: "We analyze your venue and requirements to build a custom sonic profile.",
              },
              { icon: Sliders, step: "02", title: "Curation", text: "Our engineers select the perfect combination of amps, arrays, and mics." },
              { icon: Truck, step: "03", title: "Execution", text: "Timely delivery, professional setup, and optional onsite management." },
            ].map((process, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-brand-dark border-4 border-brand-gold/20 flex items-center justify-center mb-8 relative z-10 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  <process.icon size={32} className="text-brand-gold" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-gold text-brand-dark font-bold rounded-full flex items-center justify-center text-sm">
                    {process.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{process.title}</h3>
                <p className="text-white/60 max-w-xs leading-relaxed">{process.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. THE FOUNDERS ================= */}
      <section className="py-24 bg-brand-gray">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Leadership</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mt-2">The Architects</h2>
            </div>
            <p className="text-gray-500 max-w-md mt-4 md:mt-0 text-right md:text-left">The engineers and creatives behind the technology.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-1">{member.role}</p>
                    <h3 className="text-2xl font-serif font-bold">{member.name}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed italic border-l-2 border-brand-gold pl-4">"{member.bio}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. TIMELINE ================= */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">Our Journey</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-[15px] md:left-1/2 top-0 h-full w-0.5 bg-gray-200 transform md:-translate-x-1/2"></div>

            {TIMELINE.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center justify-between mb-12 md:mb-24 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Content Side */}
                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                  <div
                    className={`bg-brand-gray p-8 rounded-2xl border border-gray-100 hover:border-brand-gold/50 transition-colors ${
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <span className="text-brand-gold font-bold text-xl mb-2 block">{item.year}</span>
                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-3">{item.title}</h3>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-[6px] md:left-1/2 w-5 h-5 bg-brand-gold rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 z-10"></div>

                {/* Empty Side (Desktop only) */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. NEW: FAQ SECTION ================= */}
      <section className="py-24 bg-brand-gray">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Support</span>
            <h2 className="text-4xl font-serif font-bold text-brand-dark mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300">
                <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                  <span className={`text-lg font-semibold ${openFaq === index ? "text-brand-gold" : "text-brand-dark"}`}>{faq.question}</span>
                  {openFaq === index ? <Minus size={20} className="text-brand-gold" /> : <Plus size={20} className="text-gray-400" />}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
