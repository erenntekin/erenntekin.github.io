"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export function StaggerList<T>({
  items,
  keyFn,
  renderItem,
  as = "ul",
  itemAs = "li",
  className,
  itemClassName,
}: {
  items: T[];
  keyFn: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  as?: "ul" | "div";
  itemAs?: "li" | "div";
  className?: string;
  itemClassName?: string;
}) {
  const Container = as === "ul" ? motion.ul : motion.div;
  const Item = itemAs === "li" ? motion.li : motion.div;

  return (
    <Container
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={className}
    >
      {items.map((it) => (
        <Item key={keyFn(it)} variants={item} className={itemClassName}>
          {renderItem(it)}
        </Item>
      ))}
    </Container>
  );
}
