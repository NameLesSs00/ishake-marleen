"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Heart, MessageCircleHeart } from "lucide-react";
import { motion } from "framer-motion";

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  timestamp: any;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "msg"), orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgsData: GuestMessage[] = [];
      snapshot.forEach((doc) => {
        msgsData.push({ id: doc.id, ...doc.data() } as GuestMessage);
      });
      setMessages(msgsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-cream-500 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <MessageCircleHeart className="mx-auto text-cherry-600 mb-4" size={48} />
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl text-cherry-900 font-bold mb-4">
            Guestbook Messages
          </h1>
          <p className="font-[family-name:var(--font-cormorant)] text-xl text-cherry-700 max-w-2xl mx-auto">
            A collection of beautiful wishes and blessings from our beloved friends and family.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Heart className="text-cherry-400 animate-ping" size={48} />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 bg-white/40 rounded-3xl border border-cherry-100">
            <p className="font-[family-name:var(--font-cormorant)] text-2xl text-cherry-500">
              No messages yet. Be the first to leave a blessing!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {messages.map((msg, idx) => {
              const isLong = msg.message.length > 220;
              const isVeryLong = msg.message.length > 400;
              
              // Dynamic classes depending on text length
              let cardColSpan = "col-span-1";
              if (isVeryLong) {
                cardColSpan = "col-span-1 md:col-span-2 lg:col-span-3";
              } else if (isLong) {
                cardColSpan = "col-span-1 md:col-span-2";
              }

              let fontSize = "text-xl";
              if (isVeryLong) {
                fontSize = "text-lg md:text-xl";
              } else if (isLong) {
                fontSize = "text-lg";
              }

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`bg-white p-8 rounded-2xl shadow-sm border border-cherry-100 relative group hover:shadow-md transition-shadow flex flex-col justify-between ${cardColSpan}`}
                >
                  <Heart size={12} className="absolute top-4 left-4 text-cherry-200 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <Heart size={12} className="absolute bottom-4 right-4 text-cherry-200 opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex-grow min-w-0 w-full">
                    <p className={`font-[family-name:var(--font-cormorant)] ${fontSize} text-cherry-950 leading-relaxed mb-6 italic whitespace-pre-wrap break-words break-all`}>
                      "{msg.message}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 border-t border-cherry-50 pt-4 mt-auto min-w-0 w-full">
                    <div className="w-10 h-10 rounded-full bg-cherry-50 flex items-center justify-center border border-cherry-100 flex-shrink-0">
                      <span className="font-[family-name:var(--font-playfair)] text-cherry-700 font-bold text-lg">
                        {msg.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-[family-name:var(--font-playfair)] font-bold text-lg text-cherry-800 break-all leading-snug">
                        {msg.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
