// app/page.tsx

"use client";

import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import MainDrawer from "@/components/Drawer/MainDrawer";

export default function Home() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="max-w-xl">
        <span className={title()}>Time, obrigado por este challenge!</span>
        <h2 className={subtitle({ class: "mt-4" })}>
          Foi um prazer desenvolvê-lo.
        </h2>
        <div className={subtitle({ class: "mt-4" })}>
          Fico no aguardo de críticas e sugestões de melhoria. 🚀
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        {" "}
        <MainDrawer />
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="https://github.com/edtech1985/drawer-challenge"
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
