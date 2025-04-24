"use client";

import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import MainDrawer from "@/components/Drawer/MainDrawer";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>
          Time, obrigado por este challenge! Foi um prazer desenvolvê-lo.
        </span>

        <div className={subtitle({ class: "mt-4" })}>
          Fico no aguardo de críticas e sugestões de melhoria. 🚀
        </div>
      </div>

      <div className="flex gap-3">
        <MainDrawer />

        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
