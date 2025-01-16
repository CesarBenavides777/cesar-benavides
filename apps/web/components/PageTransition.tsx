"use client";

import { m, AnimatePresence, LazyMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { use, useRef } from "react";
const loadFeatures = () => import("@/utils/features").then((res) => res.default);


function FrozenRouter(props: { children: React.ReactNode }) {
  const context = use(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  if (!frozen) {
    return <>{props.children}</>;
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

const variants = {
  hidden: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const PageTransitionEffect = ({ children }: { children: React.ReactNode }) => {
  // The `key` is tied to the url using the `usePathname` hook.
  const key = usePathname();

  return (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <FrozenRouter key={key}>
          <m.div
            key={key}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.2 }}
          >
            {children}
          </m.div>
        </FrozenRouter>
      </AnimatePresence>
    </LazyMotion>
  );
};

export default PageTransitionEffect;
