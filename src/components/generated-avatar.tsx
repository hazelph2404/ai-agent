"use client";

import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import Image from "next/image";

export default function GeneratedAvatar({ seed, className }: { seed: string; className?: string }) {
  const avatar = createAvatar(initials, {
    seed,
  });

  const svg = avatar.toString();
  const base64 = Buffer.from(svg).toString("base64");
  const dataUri = `data:image/svg+xml;base64,${base64}`;

  return (
    <Image
      src={dataUri}
      alt="avatar"
      width={36}
      height={36}
      className={className}
    />
  );
}
