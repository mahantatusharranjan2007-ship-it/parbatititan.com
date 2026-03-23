import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ChatWidget from './components/ChatWidget';
import { 
  Smartphone, 
  Battery, 
  Droplets, 
  Wifi, 
  Wrench, 
  ChevronRight, 
  Star, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const SERVICES = [
  { id: 'screen', title: 'Screen Repair', icon: Smartphone, desc: 'Cracked screen? We fix it in under 30 minutes.', price: 'From ₹499' },
  { id: 'battery', title: 'Battery Replacement', icon: Battery, desc: 'Restore your phone to 100% health.', price: 'From ₹399' },
  { id: 'water', title: 'Water Damage', icon: Droplets, desc: 'Dropped it in water? We can save it.', price: 'Free Diagnostic' },
  { id: 'signal', title: 'Signal Issues', icon: Wifi, desc: 'Fixing antenna and connectivity problems.', price: 'From ₹299' },
  { id: 'other', title: 'Hardware Repair', icon: Wrench, desc: 'Buttons, cameras, charging ports, and more.', price: 'Varies' },
];

const REVIEWS = [
  { id: 1, name: 'Sarah Jenkins', text: 'Fixed my iPhone screen in 20 minutes! Looks brand new.', rating: 5 },
  { id: 2, name: 'Mike Ross', text: 'Thought my water-damaged Samsung was dead. Parbati Titan\'s Mobile Shop saved all my photos.', rating: 5 },
  { id: 3, name: 'Emily Chen', text: 'Honest pricing and super friendly staff. Highly recommend.', rating: 5 },
];

function DiagnosticTool() {
  const [step, setStep] = useState(0);
  const [device, setDevice] = useState('');
  const [issue, setIssue] = useState('');

  const handleReset = () => {
    setStep(0);
    setDevice('');
    setIssue('');
  };

  const getDiagnosticMailto = () => {
    const bodyText = `| Field          | Details               |
|----------------|-----------------------|
| Customer Name  |                       |
| Phone Number   |                       |
| Device         | ${device}
| Issue          | ${issue}
| Photo          | Please attach photo   |`;
    return `mailto:parbatititans@gmail.com?subject=${encodeURIComponent(`Repair Appointment for ${device} - ${issue}`)}&body=${encodeURIComponent(bodyText)}`;
  };

  return (
    <div className="bg-white text-slate-900 rounded-3xl shadow-xl p-8 max-w-2xl mx-auto border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
        <motion.div 
          className="h-full bg-brand-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((step + 1) / 3) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <h3 className="text-2xl font-bold mb-6 text-center">Instant Diagnostic</h3>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-slate-600 text-center mb-6">What device needs fixing?</p>
            <div className="grid grid-cols-2 gap-4">
              {['iPhone', 'Samsung', 'Google Pixel', 'Other Android', 'iPad', 'Tablet'].map(d => (
                <button
                  key={d}
                  onClick={() => { setDevice(d); setStep(1); }}
                  className="p-4 rounded-xl border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-colors text-left font-medium flex justify-between items-center group"
                >
                  {d}
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-brand-500" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-slate-600 text-center mb-6">What seems to be the problem with your {device}?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setIssue(s.title); setStep(2); }}
                  className="p-4 rounded-xl border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-colors text-left font-medium flex items-center gap-3 group"
                >
                  <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                    <s.icon className="w-5 h-5" />
                  </div>
                  {s.title}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(0)} className="text-sm text-slate-500 hover:text-slate-800 mt-4 inline-block">
              &larr; Back
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">We can fix that!</h4>
            <p className="text-slate-600 mb-6">
              Your {device} with {issue.toLowerCase()} issues usually takes about 30-60 minutes to repair.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={getDiagnosticMailto()}
                className="px-6 py-3 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors inline-flex items-center justify-center"
              >
                Book Appointment
              </a>
              <button onClick={handleReset} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                Start Over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const getHeroMailto = () => {
    const bodyText = `| Field          | Details               |
|----------------|-----------------------|
| Customer Name  |                       |
| Phone Number   |                       |
| Device/Issue   |                       |
| Photo          | Please attach photo   |`;
    return `mailto:parbatititans@gmail.com?subject=${encodeURIComponent('Book a Repair')}&body=${encodeURIComponent(bodyText)}`;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-100 selection:text-brand-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
              <Wrench className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">Parbati Titan's Mobile Shop</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <a href="#services" className="hover:text-brand-600 transition-colors">Services</a>
            <a href="#diagnostic" className="hover:text-brand-600 transition-colors">Diagnose</a>
            <a href="#reviews" className="hover:text-brand-600 transition-colors">Reviews</a>
          </nav>
          <button className="px-5 py-2.5 bg-slate-900 text-white rounded-full font-medium text-sm hover:bg-slate-800 transition-colors">
            Contact Us
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-sm font-medium mb-6 border border-brand-100">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                  </span>
                  Open today until 8:00 PM
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                  We bring your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-400">devices</span> back to life.
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Fast, reliable, and affordable mobile repair services. Most repairs completed in under 30 minutes with a lifetime warranty on parts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={getHeroMailto()}
                    className="px-8 py-4 bg-brand-600 text-white rounded-full font-medium hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 group"
                  >
                    Book a Repair
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-50 transition-all border border-slate-200 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    +91 8456946705
                  </button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-full bg-gradient-to-tr from-brand-100 to-blue-50 absolute -inset-4 blur-3xl opacity-50 -z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?q=80&w=1000&auto=format&fit=crop" 
                  alt="Phone repair" 
                  className="rounded-3xl shadow-2xl object-cover aspect-[4/3] w-full"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">4.9/5</div>
                    <div className="text-sm text-slate-500">Based on 500+ reviews</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Diagnostic Section */}
        <section id="diagnostic" className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">What's wrong with your device?</h2>
              <p className="text-slate-400 text-lg">Use our quick diagnostic tool to get an instant estimate for your repair.</p>
            </div>
            
            <DiagnosticTool />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
                <p className="text-slate-600 text-lg">Professional repair services for all major brands and models. If it has a screen, we can probably fix it.</p>
              </div>
              <button className="text-brand-600 font-medium hover:text-brand-700 flex items-center gap-2 group shrink-0">
                View all services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, i) => (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-transparent hover:border-slate-100 group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-sm mb-6 group-hover:scale-110 transition-transform group-hover:bg-brand-600 group-hover:text-white">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-2">{service.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-medium text-slate-900">{service.price}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-24 bg-brand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Loved by locals</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {REVIEWS.map((review, i) => (
                <motion.div 
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-brand-100/50"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-slate-700 mb-6 font-medium leading-relaxed">"{review.text}"</p>
                  <div className="font-bold text-slate-900">{review.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                  <Wrench className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">Parbati Titan's Mobile Shop</span>
              </div>
              <p className="text-slate-500 max-w-sm mb-6">
                Your trusted partner for fast, reliable, and affordable mobile device repairs.
              </p>
              <div className="flex gap-4 text-slate-400">
                {/* Social placeholders */}
                <div className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer" />
                <div className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer" />
                <div className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  +91 8456946705
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                  <span>Keonjhar, Khireitangiri<br />Near GP, 758046</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Hours</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  Mon-Fri: 9am - 8pm
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4" />
                  Sat: 10am - 6pm
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4" />
                  Sun: Closed
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Parbati Titan's Mobile Shop. All rights reserved.
          </div>
        </div>
      </footer>
      <ChatWidget />
    </div>
  );
}
