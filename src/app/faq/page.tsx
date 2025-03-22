/**
 * FAQ page with frequently asked questions about products and shipping
 */
"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/main-layout";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategoryProps {
  title: string;
  faqs: FAQ[];
}

function FAQItem({ question, answer }: FAQ) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between py-4 text-left font-punk focus:outline-none"
      >
        <span>{question}</span>
        <span className="text-primary">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="pb-4 text-muted-foreground">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

function FAQCategory({ title, faqs }: FAQCategoryProps) {
  return (
    <div className="mb-10">
      <h2 className="font-punk text-2xl mb-6">{title}</h2>
      <div className="rounded-lg border border-border">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  const productFAQs: FAQ[] = [
    {
      question: "What materials are your t-shirts made of?",
      answer: "Our t-shirts are made from 100% organic cotton or a blend of recycled polyester and organic cotton, depending on the specific product. All materials are sourced sustainably and produced with minimal environmental impact."
    },
    {
      question: "How do I find my size?",
      answer: "We provide a detailed size guide on each product page. Our t-shirts generally run true to size, but we recommend checking the measurements to ensure the perfect fit. If you're between sizes, we suggest sizing up for a more comfortable fit."
    },
    {
      question: "How should I care for my t-shirt?",
      answer: "To extend the life of your t-shirt and minimize environmental impact, we recommend washing in cold water, turning the garment inside out before washing, avoiding bleach, and line drying when possible. If using a dryer, use a low heat setting."
    },
    {
      question: "Are your designs printed to order?",
      answer: "Yes, all our t-shirts are printed on demand when you place your order. This reduces waste and ensures we don't overproduce stock that might not sell."
    }
  ];

  const shippingFAQs: FAQ[] = [
    {
      question: "How long will shipping take?",
      answer: "Since our products are printed on demand, it typically takes 2-3 business days to produce your order, followed by 3-5 business days for standard shipping. Express shipping options are available at checkout."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes! We ship worldwide. International shipping times vary by location but typically take 7-14 business days after production is complete."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of delivery for unworn items in original condition. However, due to the custom nature of our products, we can only accept returns for size issues or manufacturing defects."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this to track your package's journey directly on our website or through the carrier's tracking service."
    }
  ];

  const sustainabilityFAQs: FAQ[] = [
    {
      question: "How sustainable are your production methods?",
      answer: "Our print-on-demand model eliminates overproduction waste. We use water-based inks that are less harmful to the environment, and our production partners utilize energy-efficient equipment and ethical labor practices."
    },
    {
      question: "What packaging do you use?",
      answer: "All our products are shipped in recycled and biodegradable packaging. We avoid plastic whenever possible and use paper tape and recycled paper mailers."
    },
    {
      question: "Do you offset your carbon footprint?",
      answer: "Yes, we calculate and offset the carbon footprint associated with production and shipping of all orders. We partner with verified carbon offset programs that focus on forest conservation and renewable energy."
    },
    {
      question: "How do you ensure ethical manufacturing?",
      answer: "We only work with production partners who can demonstrate fair wages, safe working conditions, and ethical treatment of workers. We conduct regular reviews of our supply chain to maintain these standards."
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="font-punk text-3xl md:text-4xl text-center mb-8">
          <span className="text-primary">FREQUENTLY</span> ASKED QUESTIONS
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <FAQCategory title="PRODUCTS" faqs={productFAQs} />
          <FAQCategory title="SHIPPING & RETURNS" faqs={shippingFAQs} />
          <FAQCategory title="SUSTAINABILITY" faqs={sustainabilityFAQs} />
          
          <div className="mt-12 text-center">
            <h2 className="font-punk text-2xl mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find the answer you&apos;re looking for? Please contact our support team.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-primary hover:bg-primary/90 text-white font-punk py-2 px-6 rounded-md transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 