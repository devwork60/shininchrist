"use client";

import { useRef, type ReactNode } from "react";
import clsx from "clsx";

interface VideoDialogButtonProps {
  src: string;
  text: string;
  icon?: ReactNode;
  className?: string;
}

/** Outlined gold button that opens a video in a dialog (closes with Esc, the Close button or a click outside). */
const VideoDialogButton = ({
  src,
  text,
  icon,
  className,
}: VideoDialogButtonProps) => {
  const dialog = useRef<HTMLDialogElement>(null);

  const close = () => {
    dialog.current?.querySelector("video")?.pause();
    dialog.current?.close();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className={clsx(
          "inline-flex items-center justify-center gap-2.5 rounded-full border border-primary-gold bg-transparent px-5 py-2.5 text-sm font-semibold text-white-color transition-colors duration-200 hover:bg-primary-gold lg:px-6 lg:py-3 lg:text-base",
          className,
        )}
      >
        {icon}
        {text}
      </button>

      <dialog
        ref={dialog}
        aria-label={text}
        onClick={(event) => event.target === dialog.current && close()}
        onClose={() => dialog.current?.querySelector("video")?.pause()}
        className="m-auto w-[min(92vw,960px)] rounded-xl bg-primary-green-deep p-3 backdrop:bg-black/70"
      >
        <video
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full rounded-lg bg-black"
        >
          <source src={src} type="video/mp4" />
        </video>
        <button
          type="button"
          onClick={close}
          className="mt-3 w-full rounded-md border border-white-color/30 py-2 text-sm font-semibold text-white-color hover:bg-white-color/10"
        >
          Close
        </button>
      </dialog>
    </>
  );
};

export default VideoDialogButton;
