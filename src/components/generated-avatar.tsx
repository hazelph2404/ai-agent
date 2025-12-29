"use client";

import { useMemo } from "react";
import { createAvatar, type Style } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import Image from "next/image";
import { cn } from "@/lib/utils";

type GeneratedAvatarProps = {
  seed: string;
  className?: string;
  shape?: "square" | "circle";      // UI shape
  size?: number;
  style?: Style<Record<string, unknown>>; // DiceBear style (initials, botttsNeutral, etc.)
  options?: Record<string, unknown>; // extra DiceBear options if you want
};

export default function GeneratedAvatar({
  seed,
  className,
  shape = "square",
  size = 64,
  style = initials,
  options,
}: GeneratedAvatarProps) {
  const dataUri = useMemo(() => {
    const avatar = createAvatar(style, { seed, ...(options ?? {}) });
    const svg = avatar.toString();
    const base64 = btoa(unescape(encodeURIComponent(svg)));
    return `data:image/svg+xml;base64,${base64}`;
  }, [seed, style, options]);

  return (
    <Image
      src={dataUri}
      alt="Avatar"
      width={size}
      height={size}
      className={cn(
        shape === "circle" ? "rounded-full" : "rounded-md",
        className
      )}
      unoptimized
    />
  );
}
