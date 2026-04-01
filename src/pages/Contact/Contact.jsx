import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("access_key", "2bf0ea97-75f5-4aac-b9d4-b7bb7c4edb1b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data.success ? "Success!" : "Error");

      if (data.success) {
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Error");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0f1e] px-4 pb-14 pt-20 text-white sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-2xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full rounded-2xl border border-purple-500/30 bg-[#0d1326] p-6 shadow-[0_0_40px_rgba(124,58,237,0.22)] sm:p-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-mono text-3xl font-bold tracking-tight text-purple-400 sm:text-4xl"
          >
            Establish Connection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-2 font-mono text-sm text-emerald-300 sm:text-base"
          >
            Handshake accepted.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8 space-y-5"
            onSubmit={onSubmit}
          >
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full rounded-lg border border-purple-500/40 bg-[#0a0f1e] px-4 py-3 font-mono text-sm text-gray-100 placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-emerald-400 focus:shadow-[0_0_0_1px_rgba(0,255,136,0.35),0_0_18px_rgba(0,255,136,0.28)]"
            />

            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-purple-500/40 bg-[#0a0f1e] px-4 py-3 font-mono text-sm text-gray-100 placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-emerald-400 focus:shadow-[0_0_0_1px_rgba(0,255,136,0.35),0_0_18px_rgba(0,255,136,0.28)]"
            />

            <textarea
              rows="5"
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="w-full resize-none rounded-lg border border-purple-500/40 bg-[#0a0f1e] px-4 py-3 font-mono text-sm text-gray-100 placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-emerald-400 focus:shadow-[0_0_0_1px_rgba(0,255,136,0.35),0_0_18px_rgba(0,255,136,0.28)]"
            />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-emerald-500 px-6 py-3 font-mono text-sm font-semibold tracking-wide text-[#0a0f1e] transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,255,136,0.35)]"
            >
              <span>Send Request</span>
              <Send className="h-4 w-4" />
            </button>

            {result && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="font-mono text-sm text-emerald-300"
              >
                {result}
              </motion.p>
            )}
          </motion.form>
        </motion.div>
      </section>
    </main>
  );
}
