"use client";

import { useEffect } from "react";

type IframeResizerProps = {
  /**
   * Origine autorisée à recevoir le message (URL du site WordPress parent).
   * En dev, on peut laisser "*" pour tester facilement.
   * En prod, mettre l'URL exacte, ex. "https://toituresboreal.ca".
   */
  targetOrigin?: string;
};

export function IframeResizer({ targetOrigin = "*" }: IframeResizerProps) {
  useEffect(() => {
    // Si on n'est pas dans une iframe, on ne fait rien
    if (window.self === window.top) return;

    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage(
        { type: "boreal-resize", height },
        targetOrigin
      );
    };

    // Envoi initial
    sendHeight();

    // Réagit aux changements de taille du contenu
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);

    // Réagit aux changements de taille de la fenêtre
    window.addEventListener("resize", sendHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sendHeight);
    };
  }, [targetOrigin]);

  return null;
}