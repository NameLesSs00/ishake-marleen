"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { MapPin, Send, Heart, ChevronDown, Clock, Music } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleGuestbookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !name.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "msg"), {
        name: name.trim(),
        message: message.trim(),
        timestamp: new Date()
      });
      setIsSubmitted(true);
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cream-500 selection:bg-cherry-300 selection:text-cherry-900">

      {/* 1. Immersive Hero Section */}
      <section className="relative h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Wedding Background"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Elegant Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-cherry-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cherry-900 via-transparent to-transparent opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-10 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-[family-name:var(--font-cormorant)] italic text-cherry-100 text-xl md:text-3xl tracking-widest mb-6 drop-shadow-md"
          >
            We are getting married
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-[family-name:var(--font-playfair)] font-bold text-6xl md:text-8xl lg:text-[10rem] text-cream-100 leading-none drop-shadow-2xl">
              Ishak
            </h1>
            <span className="font-[family-name:var(--font-dancing)] text-5xl md:text-7xl text-cherry-300 -my-4 md:-my-8 z-10 heartbeat drop-shadow-lg">
              &
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] font-bold text-6xl md:text-8xl lg:text-[10rem] text-cream-100 leading-none drop-shadow-2xl">
              Marleen
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 flex flex-col items-center gap-4 text-cherry-200"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-cherry-300 drop-shadow-md"></div>
              <p className="font-[family-name:var(--font-playfair)] text-xl tracking-[0.2em] uppercase drop-shadow-md">
                May 30, 2026
              </p>
              <div className="h-px w-16 bg-cherry-300 drop-shadow-md"></div>
            </div>

            <CountdownTimer />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 text-cherry-200 float-animation drop-shadow-md"
        >
          <span className="font-[family-name:var(--font-cormorant)] italic text-lg">Scroll Down</span>
          <ChevronDown size={28} className="animate-bounce" />
        </motion.div>
      </section>

      {/* 2. Letter to Guests */}
      <section className="py-28 px-6 bg-cream-500 relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cherry-900 to-transparent opacity-10"></div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          {/* Letter Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <p className="font-[family-name:var(--font-dancing)] text-4xl md:text-5xl text-cherry-700 mb-6 text-center lg:text-left">A Letter to Our Guests</p>
            <div className="card-glass bg-white/80 p-8 md:p-12 rounded-sm shadow-sm border border-cherry-100 relative">
              {/* Corner Ornaments */}
              <Heart size={12} className="absolute top-3 left-3 text-cherry-300 fill-cherry-300/10" />
              <Heart size={12} className="absolute top-3 right-3 text-cherry-300 fill-cherry-300/10" />
              <Heart size={12} className="absolute bottom-3 left-3 text-cherry-300 fill-cherry-300/10" />
              <Heart size={12} className="absolute bottom-3 right-3 text-cherry-300 fill-cherry-300/10" />

              <div className="absolute top-4 left-4 text-4xl text-cherry-200 font-serif opacity-30">"</div>
              <div className="absolute bottom-4 right-4 text-4xl text-cherry-200 font-serif rotate-180 opacity-30">"</div>
              <p className="font-[family-name:var(--font-cormorant)] text-xl leading-loose text-cherry-900 text-justify">
                Dearest family and friends,<br /><br />
                With joyful hearts and endless gratitude, we invite you to celebrate the beginning of our forever.<br /><br />
                Surrounded by love, faith, and the blessing of having you in our lives, we are excited to share this unforgettable day with the people closest to our hearts.<br /><br />
                Join us as we begin our new journey together.
              </p>
              <div className="mt-8 flex justify-center lg:justify-start">
                <span className="font-[family-name:var(--font-dancing)] text-3xl text-cherry-800">With love, I & M</span>
              </div>
            </div>
          </motion.div>

          {/* profile1 Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative w-full max-w-md mx-auto aspect-[1826/4032]">
              {/* Elegant Arched Frame */}
              <div className="absolute inset-0 rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl border-[8px] border-white z-10">
                <Image
                  src="/profile1.jpeg"
                  alt="Ishak and Marleen"
                  fill
                  sizes="(max-width: 1024px) 100vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              {/* Decorative Frame */}
              <div className="absolute -inset-4 rounded-t-full rounded-b-3xl border border-cherry-300 z-0"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. The Promise Section */}
      <section className="py-24 px-6 bg-cherry-50">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
          {/* profile2 Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative w-full max-w-md mx-auto aspect-[3/4]">
              {/* Elegant Arched Frame */}
              <div className="absolute inset-0 rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl border-[8px] border-white z-10">
                <Image
                  src="/profile21.jpeg"
                  alt="Ishak and Marleen together"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[70%_80%]"
                />
              </div>
              {/* Decorative Frame */}
              <div className="absolute -inset-4 rounded-t-full rounded-b-3xl border border-cherry-300 z-0"></div>
            </div>
          </motion.div>

          {/* Quote Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl text-cherry-900 mb-6 font-bold">Our Promise</h2>
            <div className="relative p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-cherry-100/50 mb-8 inline-block w-full">
              {/* Corner Ornaments on the Quote container */}
              <Heart size={10} className="absolute top-2 left-2 text-cherry-300 fill-cherry-300/10" />
              <Heart size={10} className="absolute top-2 right-2 text-cherry-300 fill-cherry-300/10" />
              <Heart size={10} className="absolute bottom-2 left-2 text-cherry-300 fill-cherry-300/10" />
              <Heart size={10} className="absolute bottom-2 right-2 text-cherry-300 fill-cherry-300/10" />

              <p className="font-[family-name:var(--font-cormorant)] text-2xl italic text-cherry-800 leading-relaxed">
                "And over all these virtues put on love, which binds them all together in perfect unity."
              </p>
              <p className="text-lg text-cherry-500 font-medium mt-2">— Colossians 3:14</p>
            </div>
            <p className="font-[family-name:var(--font-cormorant)] text-xl text-cherry-800 leading-loose">
              Every day spent together has been a blessing, a beautifully unfolding story written by God's own hand.
              We are incredibly blessed to have found in each other a lifelong partner, a best friend, and a home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Vertical Timeline */}
      <section className="py-28 px-4 bg-cream-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cherry-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <p className="font-[family-name:var(--font-dancing)] text-4xl text-cherry-600 mb-2">The Itinerary</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-5xl text-cherry-900">Flow of the Day</h2>
          </motion.div>

          <div className="relative border-l-2 border-cherry-300 ml-4 md:ml-1/2 md:left-1/2 md:-translate-x-1/2 space-y-16 py-8">

            {/* Event 1 - Reception */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative pl-8 md:pl-0 md:w-1/2 md:-ml-[2px] md:pr-12 text-left md:text-right"
            >
              <div className="absolute left-[-9px] md:right-[-9px] md:left-auto top-2 w-4 h-4 rounded-full bg-cherry-600 ring-4 ring-cream-500 shadow-md"></div>
              <div className="flex items-center gap-2 md:justify-end text-cherry-600 mb-2">
                <Clock size={18} />
                <span className="font-[family-name:var(--font-playfair)] font-bold text-xl">May 28 • 7:00 PM</span>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-cherry-900 mb-2">Reception</h3>
              <p className="font-[family-name:var(--font-cormorant)] text-lg text-cherry-700 mb-3">
                Join us for a joyful pre-wedding celebration.
              </p>
              <a href="https://maps.app.goo.gl/dBBx2XHesiXHWHNK8" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-cherry-50 rounded-full border border-cherry-200 hover:bg-cherry-100 transition-colors">
                <MapPin size={16} className="text-cherry-500" />
                <span className="font-[family-name:var(--font-cormorant)] text-cherry-800">Holyday Hurghada Hall</span>
              </a>
            </motion.div>

            {/* Event 2 - Guest Arrival */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative pl-8 md:pl-12 md:w-1/2 md:ml-auto text-left"
            >
              <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-cherry-600 ring-4 ring-cream-500 shadow-md"></div>
              <div className="flex items-center gap-2 text-cherry-600 mb-2">
                <Clock size={18} />
                <span className="font-[family-name:var(--font-playfair)] font-bold text-xl">May 30 • 8:30 PM</span>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-cherry-900 mb-2">Guest Arrival</h3>
              <p className="font-[family-name:var(--font-cormorant)] text-lg text-cherry-700">
                Finding your seats before the sacred vows begin.
              </p>
            </motion.div>

            {/* Event 3 - The Ceremony */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative pl-8 md:pl-0 md:w-1/2 md:-ml-[2px] md:pr-12 text-left md:text-right"
            >
              <div className="absolute left-[-9px] md:right-[-9px] md:left-auto top-2 w-4 h-4 rounded-full bg-cherry-600 ring-4 ring-cream-500 shadow-md"></div>
              <div className="flex items-center gap-2 md:justify-end text-cherry-600 mb-2">
                <Heart size={18} />
                <span className="font-[family-name:var(--font-playfair)] font-bold text-xl">May 30 • 9:00 PM</span>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-cherry-900 mb-2">The Ceremony</h3>
              <p className="font-[family-name:var(--font-cormorant)] text-lg text-cherry-700 mb-3">
                The sacrament of holy matrimony.
              </p>
              <a href="https://www.google.com/maps/place/%D9%83%D9%86%D9%8A%D8%B3%D8%A9+%D8%A7%D9%84%D8%A3%D9%86%D8%A8%D8%A7+%D8%B4%D9%86%D9%88%D8%AF%D8%A9+%D8%B1%D8%A6%D9%8A%D8%B3+%D8%A7%D9%84%D9%85%D8%AA%D9%88%D8%AD%D8%AF%D9%8A%D9%86+%D8%A8%D8%A7%D9%84%D8%BA%D8%B1%D8%AF%D9%82%D8%A9%E2%80%AD/data=!4m2!3m1!1s0x0:0x3665797d8d0c2bf2?sa=X&ved=1t:2428&ictx=111" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-cherry-50 rounded-full border border-cherry-200 hover:bg-cherry-100 transition-colors">
                <MapPin size={16} className="text-cherry-500" />
                <span className="font-[family-name:var(--font-cormorant)] text-cherry-800">Saint Shenouda Coptic Orthodox Church</span>
              </a>
            </motion.div>



          </div>
        </div>
      </section>

      {/* 5. The Bible Quote Section */}
      <section className="py-24 px-6 bg-cream-500">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Quote Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-1/2 text-center lg:text-right order-2 lg:order-1"
          >
            <div className="relative p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-cherry-100/50 inline-block w-full">
              {/* Corner Ornaments */}
              <Heart size={10} className="absolute top-2 left-2 text-cherry-300 fill-cherry-300/10" />
              <Heart size={10} className="absolute top-2 right-2 text-cherry-300 fill-cherry-300/10" />
              <Heart size={10} className="absolute bottom-2 left-2 text-cherry-300 fill-cherry-300/10" />
              <Heart size={10} className="absolute bottom-2 right-2 text-cherry-300 fill-cherry-300/10" />

              <div className="space-y-4 text-center">
                <p className="font-[family-name:var(--font-cormorant)] text-4xl text-cherry-800 leading-relaxed font-bold font-arabic">
                  "فوق كل شيء لتكن محبتكم بعضكم لبعض شديدة."
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-3xl italic text-cherry-800 leading-relaxed font-bold">
                  "Above all, love each other deeply."
                </p>
                <div className="pt-2 border-t border-cherry-200/50 inline-block mt-4">
                  <p className="text-xl text-cherry-600 font-medium">— 1 بطرس 4:8 | 1 Peter 4:8</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* profile3 Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 order-1 lg:order-2 -mt-12 lg:-mt-24"
          >
            <div className="relative w-full max-w-md mx-auto aspect-[672/1280]">
              {/* Elegant Arched Frame */}
              <div className="absolute inset-0 rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl border-[8px] border-white z-10">
                <Image
                  src="/profile3.jpeg"
                  alt="Ishak and Marleen together"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              {/* Decorative Frame */}
              <div className="absolute -inset-4 rounded-t-full rounded-b-3xl border border-cherry-300 z-0"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. The "Envelope" Blessing Section */}
      <section id="guestbook" className="py-28 px-4 bg-cherry-100 relative">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <p className="font-[family-name:var(--font-dancing)] text-4xl text-cherry-700 mb-2">Send a Little Love</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-cherry-900 font-bold">Digital Guestbook</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="perspective-1000"
          >
            {/* The Envelope */}
            <div className="bg-[#fcf8f2] p-8 md:p-12 shadow-2xl rounded-sm border-t-8 border-cherry-600 relative transform transition-transform border border-cherry-200/50">
              {/* Corner Ornaments */}
              <Heart size={12} className="absolute top-3 left-3 text-cherry-300 fill-cherry-300/10" />
              <Heart size={12} className="absolute top-3 right-3 text-cherry-300 fill-cherry-300/10" />
              <Heart size={12} className="absolute bottom-3 left-3 text-cherry-300 fill-cherry-300/10" />
              <Heart size={12} className="absolute bottom-3 right-3 text-cherry-300 fill-cherry-300/10" />

              {/* Postage Stamp Detail */}
              <div className="absolute top-6 right-6 w-12 h-14 border border-cherry-200 bg-cream-100 flex items-center justify-center rotate-3 opacity-70">
                <Heart size={20} className="text-cherry-300" />
              </div>

              <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-cherry-900 mb-6 border-b border-cherry-100 pb-4">
                To: Ishak & Marleen
              </h3>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <Heart size={48} className="mx-auto text-cherry-400 mb-4 animate-pulse" />
                  <h4 className="font-[family-name:var(--font-playfair)] text-2xl text-cherry-900 mb-2">Thank You!</h4>
                  <p className="font-[family-name:var(--font-cormorant)] text-lg text-cherry-700">Your beautiful wishes have been sent.</p>
                  <button onClick={() => setIsSubmitted(false)} className="mt-6 text-cherry-600 underline font-[family-name:var(--font-cormorant)]">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleGuestbookSubmit}>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name..."
                    className="w-full bg-white/60 p-4 rounded-xl text-xl outline-none text-cherry-950 placeholder:text-cherry-500 font-[family-name:var(--font-cormorant)] mb-4 border border-cherry-200 focus:border-cherry-400 focus:ring-2 focus:ring-cherry-100 transition-all shadow-inner"
                  />
                  <textarea
                    maxLength={1000}
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your wishes here..."
                    className="w-full bg-white/60 p-4 rounded-xl text-xl outline-none resize-none text-cherry-950 placeholder:text-cherry-500 font-[family-name:var(--font-cormorant)] leading-relaxed mb-6 border border-cherry-200 focus:border-cherry-400 focus:ring-2 focus:ring-cherry-100 transition-all shadow-inner"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-cherry-800 hover:bg-cherry-700 disabled:opacity-70 text-cream-100 font-[family-name:var(--font-playfair)] text-xl tracking-wider transition-colors flex items-center justify-center gap-3 shadow-md rounded-lg"
                  >
                    <Send size={20} />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Simple Footer */}
      <footer className="py-16 px-4 bg-cherry-900 text-center text-cream-100">
        <p className="font-[family-name:var(--font-playfair)] text-3xl mb-2 text-cream-100 font-bold">Ishak & Marleen</p>
        <p className="font-[family-name:var(--font-cormorant)] text-base text-cherry-200 opacity-90">We can't wait to celebrate with you.</p>
      </footer>
    </main>
  );
}
