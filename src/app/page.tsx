import { About } from "@/components/sections/about";
import { Advantage } from "@/components/sections/advantage";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Technologies } from "@/components/sections/technologies";
import { Testimonials } from "@/components/sections/testimonials";
import { SocialDock } from "@/components/ui/social-dock";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
      <Portfolio />
      <Technologies />
      <Advantage />
      <Testimonials />
      <Faq />
      <Contact />
      <SocialDock />
    </>
  );
}
