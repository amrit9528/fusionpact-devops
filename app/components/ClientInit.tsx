"use client";

import { useEffect } from "react";
import { initFirebase } from "../utils/firebase";

export default function ClientInit() {
  useEffect(() => {
    // Remove any automatically added attributes that cause hydration mismatches
    const body = document.querySelector("body");
    if (body) {
      body.removeAttribute("cz-shortcut-listen");
    }

    // Initialize Firebase
    initFirebase();
  }, []);

  return null;
}
