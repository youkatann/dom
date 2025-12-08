'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from "@emailjs/browser";

function PopupForm({ isOpen, onClose }) {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_2d24g6b",
        "template_32eq42r",
        formRef.current,
        "mTZ5a1TP3ivCvDlpt"
      )
      .then(
        () => {
          setLoading(false);
          setSent(true);

          setTimeout(() => {
            setSent(false);
            onClose();
          }, 1500);
        },
        () => {
          setLoading(false);
          alert("Помилка надсилання форми");
        }
      );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
          >
            <div className="relative bg-neutral rounded-3xl shadow-2xl w-full max-w-lg p-10 text-neutral-900">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-neutral-500 hover:text-black text-xl"
              >
                ✕
              </button>

              <h2 className="text-3xl font-extrabold text-accent mb-6 text-center uppercase">
                Отримати фінансові розрахунки
              </h2>

              {!sent && (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <input
                    name="name"
                    placeholder="Ваше ім’я"
                    required
                    className="border border-accent/20 bg-white rounded-xl py-3 px-4"
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="border border-accent/20 bg-white rounded-xl py-3 px-4"
                  />

                  <textarea
                    name="message"
                    placeholder="Ваше повідомлення"
                    required
                    className="border border-accent/20 bg-white rounded-xl py-3 px-4 h-28 resize-none"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-accent text-white font-bold py-3 rounded-xl hover:bg-[#e64413] transition tracking-wide uppercase"
                  >
                    {loading ? "Надсилання..." : "Надіслати"}
                  </button>
                </form>
              )}

              {sent && (
                <div className="text-center text-xl font-bold text-green-600 py-6">
                  Повідомлення надіслано!
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}



export default function CTAButton({ title }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="py-[0px] md:py-[12px] px-[0px] md:px-[16px] text-[12px] md:text-[16px] flex justify-center items-center font-bold uppercase relative group cursor-pointer leading-[1]"
      >
        <span className="flex items-center gap-2">
          <span className="text-[24px] md:text-[36px] italic">(</span>{' '}
          <span className="group-hover:text-accent transition">{title}</span>{' '}
          <span className="text-[24px] md:text-[36px] italic">)</span>
        </span>
      </button>

      <PopupForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
