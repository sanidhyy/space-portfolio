"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { EarthCanvas } from "./earth-canvas";

const slideIn = (direction: string, type: string, delay: number, duration: number) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

const contactConfig = {
  p: "Get in touch",
  h2: "Contact.",
  form: {
    name: {
      span: "Your Name",
      placeholder: "What's your name?",
    },
    email: { 
      span: "Your Email", 
      placeholder: "What's your email? Enter correctly to receive a response." 
    },
    message: {
      span: "Your Message",
      placeholder: "What do you want to say?",
    },
  },
};

const INITIAL_STATE = {
  name: "",
  email: "",
  message: "",
};

const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
};

export const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if env vars are set
    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.accessToken) {
      alert("EmailJS configuration missing. Please check environment variables.");
      return;
    }
    
    setLoading(true);

    emailjs
      .send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          form_name: form.name,
          to_name: "Priyansh Singhal", // Replace with your name
          from_email: form.email,
          to_email: "lallu.lalla123321@gmail.com", // Replace with your email
          message: form.message,
        },
        emailjsConfig.accessToken
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm(INITIAL_STATE);
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong.");
        }
      );
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative z-0 w-full h-screen px-6 sm:px-16 py-10 sm:py-16"
    >
      <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="bg-[#050816] bg-opacity-90 flex-[0.75] rounded-2xl p-8 border border-[#2A0E61]"
        >
          {/* Header */}
          <div>
            <p className="sm:text-[18px] text-[14px] text-gray-300 uppercase tracking-wider">
              {contactConfig.p}
            </p>
            <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
              {contactConfig.h2}
            </h2>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            {Object.keys(contactConfig.form).map((input) => {
              const { span, placeholder } = contactConfig.form[input as keyof typeof contactConfig.form];
              const Component = input === "message" ? "textarea" : "input";

              return (
                <label key={input} className="flex flex-col">
                  <span className="mb-4 font-medium text-white">{span}</span>
                  <Component
                    type={input === "email" ? "email" : "text"}
                    name={input}
                    value={form[input as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="bg-[#1A1A2E] placeholder:text-gray-400 rounded-lg border border-[#2A0E61] px-6 py-4 font-medium text-white outline-none focus:border-[#7042f88b]"
                    {...(input === "message" && { rows: 7 })}
                  />
                </label>
              );
            })}
            <button
              type="submit"
              className="bg-[#7042f88b] hover:bg-[#7042f8] transition-colors w-fit rounded-xl px-8 py-3 font-bold text-white shadow-md outline-none"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </motion.section>
  );
};