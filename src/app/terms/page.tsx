/**
 * Terms of Service page with information about site usage and policies
 */
import MainLayout from "@/components/layout/main-layout";

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="font-punk text-3xl md:text-4xl text-center mb-8">
          <span className="text-primary">TERMS</span> OF SERVICE
        </h1>
        
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <p className="text-muted-foreground text-center mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <h2 className="font-punk text-xl">1. Introduction</h2>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of the Sick Beasts website, including any content, functionality, and services offered on or through the website. By using our website, you accept and agree to be bound by these Terms. Please read these Terms carefully before you start using the website.
          </p>
          
          <h2 className="font-punk text-xl mt-8">2. Intellectual Property</h2>
          <p>
            The Sick Beasts website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Sick Beasts, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          
          <h2 className="font-punk text-xl mt-8">3. Prohibited Uses</h2>
          <p>
            You may use the Sick Beasts website only for lawful purposes and in accordance with these Terms. You agree not to use the website:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any &quot;junk mail,&quot; &quot;chain letter,&quot; &quot;spam,&quot; or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate Sick Beasts, a Sick Beasts employee, another user, or any other person or entity.</li>
            <li>To engage in any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of the website, or which, as determined by us, may harm Sick Beasts or users of the website, or expose them to liability.</li>
          </ul>
          
          <h2 className="font-punk text-xl mt-8">4. Products and Purchases</h2>
          <p>
            All products are subject to availability. We reserve the right to discontinue any products at any time. Prices for all products are subject to change without notice. We reserve the right to refuse any order you place with us. All purchases through our site are subject to our Shipping & Returns policy.
          </p>
          
          <h2 className="font-punk text-xl mt-8">5. User Contributions</h2>
          <p>
            The website may contain message boards, chat rooms, personal web pages or profiles, forums, bulletin boards, and other interactive features that allow users to post, submit, publish, display, or transmit to other users or other persons content or materials. All User Contributions must comply with the Content Standards set out in these Terms.
          </p>
          
          <h2 className="font-punk text-xl mt-8">6. Disclaimer of Warranties</h2>
          <p>
            You understand that we cannot and do not guarantee or warrant that files available for downloading from the internet or the website will be free of viruses or other destructive code. You are responsible for implementing sufficient procedures and checkpoints to satisfy your particular requirements for anti-virus protection and accuracy of data input and output, and for maintaining a means external to our site for any reconstruction of any lost data.
          </p>
          
          <h2 className="font-punk text-xl mt-8">7. Limitation of Liability</h2>
          <p>
            In no event will we, our affiliates or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the website, any websites linked to it, any content on the website or such other websites, including any direct, indirect, special, incidental, consequential, or punitive damages.
          </p>
          
          <h2 className="font-punk text-xl mt-8">8. Changes to Terms</h2>
          <p>
            We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of the website following the posting of revised Terms means that you accept and agree to the changes.
          </p>
          
          <h2 className="font-punk text-xl mt-8">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="bg-card p-4 rounded-md mt-2">
            <p>Email: legal@sickbeasts.com</p>
            <p>Address: 123 Skate Street, Eco City, EC 12345</p>
          </div>
          
          <div className="text-center mt-12">
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