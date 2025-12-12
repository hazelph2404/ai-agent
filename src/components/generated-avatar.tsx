"use client";
import {useMemo} from 'react';
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import Image from "next/image";

export default function GeneratedAvatar({ seed, className }: { seed: string; className?: string }) {
    const dataUri = useMemo(() => {
        const avatar = createAvatar(initials, { seed });
        const svg = avatar.toString();
        const base64 = btoa(unescape(encodeURIComponent(svg)));
        return `data:image/svg+xml;base64,${base64}`;
    }, [seed]);
}
