"use client";

import { useState } from "react";
import { ZoomableImage } from "./ZoomableImage";

export function ColdeyeEngineering() {
  const [activeTab, setActiveTab] = useState<string>("model-selection");

  return (
    <div className="w-full">
      {/* Module Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("model-selection")}
          className={`rounded-lg px-3.5 py-1.5 font-mono text-xs transition-colors ${
            activeTab === "model-selection"
              ? "border border-accent/50 bg-accent/15 text-accent font-semibold"
              : "border border-transparent text-muted hover:border-border hover:text-foreground"
          }`}
        >
          01. Model Selection
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("fine-tuning")}
          className={`rounded-lg px-3.5 py-1.5 font-mono text-xs transition-colors ${
            activeTab === "fine-tuning"
              ? "border border-accent/50 bg-accent/15 text-accent font-semibold"
              : "border border-transparent text-muted hover:border-border hover:text-foreground"
          }`}
        >
          02. Custom Dataset & Fine-Tuning
        </button>

        <span className="font-mono text-xs text-muted/50 cursor-not-allowed px-2 py-1">
          03. Tracking (in review)
        </span>
        <span className="font-mono text-xs text-muted/50 cursor-not-allowed px-2 py-1">
          04. Posture (in review)
        </span>
        <span className="font-mono text-xs text-muted/50 cursor-not-allowed px-2 py-1">
          05. Hand Interaction (in review)
        </span>
        <span className="font-mono text-xs text-muted/50 cursor-not-allowed px-2 py-1">
          06. Biometrics (in review)
        </span>
        <span className="font-mono text-xs text-muted/50 cursor-not-allowed px-2 py-1">
          07. Database (in review)
        </span>
      </div>

      {/* TAB 1: MODEL SELECTION & EVALUATION */}
      {activeTab === "model-selection" && (
        <div className="mt-8 space-y-6">
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
              Model Selection · Evaluation
            </h3>
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
              We started by testing a lightweight model (YOLO11s) directly on live camera feeds. During testing, bounding boxes were unstable across frames: detections constantly shifted in size and flickered on common room objects.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
              Vision Transformers (such as RT-DETR) were ruled out early in design. Their heavy compute requirements make them impractical for continuous real-time execution on consumer hardware.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
              We upgraded to <strong className="font-semibold text-foreground">YOLO11m</strong>, which immediately stabilized bounding boxes across all objects while maintaining a smooth local video stream.
            </p>
          </div>

          {/* Table positioned underneath, full width, spacious */}
          <div className="mt-6 overflow-hidden rounded-xl border border-border/80 bg-surface/20">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/70 bg-surface/40 font-mono text-[10px] uppercase tracking-wider text-muted">
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3">Architecture</th>
                  <th className="px-4 py-3">Observed Test Behavior</th>
                  <th className="px-4 py-3 text-right">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-[13px]">
                <tr className="hover:bg-surface/20">
                  <td className="px-4 py-3.5 font-mono font-medium text-foreground">YOLO11s</td>
                  <td className="px-4 py-3.5 text-muted">Compact CNN</td>
                  <td className="px-4 py-3.5 text-foreground/75">Flickering and shifting bounding boxes across frames</td>
                  <td className="px-4 py-3.5 text-right font-mono text-xs text-red-400">Rejected</td>
                </tr>
                <tr className="hover:bg-surface/20">
                  <td className="px-4 py-3.5 font-mono font-medium text-foreground">RT-DETR</td>
                  <td className="px-4 py-3.5 text-muted">Vision Transformer</td>
                  <td className="px-4 py-3.5 text-foreground/75">Heavy compute footprint for continuous local processing</td>
                  <td className="px-4 py-3.5 text-right font-mono text-xs text-amber-400">Ruled out</td>
                </tr>
                <tr className="bg-accent/5 hover:bg-accent/10">
                  <td className="px-4 py-3.5 font-mono font-semibold text-accent">YOLO11m</td>
                  <td className="px-4 py-3.5 text-muted">Balanced CNN</td>
                  <td className="px-4 py-3.5 text-foreground/90 font-medium">Stable object boundaries; smooth 30 FPS playback</td>
                  <td className="px-4 py-3.5 text-right font-mono text-xs font-semibold text-green-400">Selected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOM DATASET & FINE-TUNING */}
      {activeTab === "fine-tuning" && (
        <div className="mt-8 space-y-6">
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
              Custom Dataset · Fine-Tuning
            </h3>
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
              Pretrained models rely on the COCO dataset, which is restricted to 80 predefined object classes.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
              Everyday objects missing from this list could not be recognized reliably. For example, a PlayStation 5 controller was misclassified as a cell phone or a remote control.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
              We developed a dedicated dataset and transfer learning pipeline in <code className="rounded bg-surface/80 px-1.5 py-0.5 font-mono text-xs text-accent">ml/</code>:
            </p>

            <ul className="space-y-2 pt-1 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>
                  <strong className="font-mono text-xs text-foreground">ml/capture_dataset.py</strong>: Harvests crops directly from live video across diverse angles and lighting.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>
                  <strong className="font-mono text-xs text-foreground">ml/prepare_dataset.py</strong>: Formats YOLO annotations, splits train/validation sets, and writes <code className="font-mono text-xs text-muted">data.yaml</code>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>
                  <strong className="font-mono text-xs text-foreground">ml/train.py</strong>: Fine-tunes custom weights on top of <code className="font-mono text-xs text-muted">yolo11m.pt</code>.
                </span>
              </li>
            </ul>
          </div>

          {/* Images positioned underneath, restrained elegant size */}
          <div className="mt-6 pt-2">
            <div className="mx-auto grid max-w-xl grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col items-center">
                <ZoomableImage
                  src="/projects/coldeye/finetuning/avant.jpg"
                  alt="Pretrained COCO baseline misclassifying controller"
                  className="block w-full"
                >
                  <img
                    src="/projects/coldeye/finetuning/avant.jpg"
                    alt="Pretrained COCO baseline"
                    className="h-48 sm:h-56 w-full rounded-2xl shadow-xl object-cover transition-transform hover:scale-[1.01]"
                  />
                </ZoomableImage>
                <div className="mt-2.5 text-center">
                  <span className="inline-block rounded-full bg-red-400/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-red-400 uppercase tracking-wider">
                    Before · Pretrained COCO
                  </span>
                  <p className="mt-0.5 text-xs text-muted">
                    Controller misclassified as cell phone / remote
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <ZoomableImage
                  src="/projects/coldeye/finetuning/apres.jpg"
                  alt="Fine-tuned checkpoint accurately detecting PS5 controller"
                  className="block w-full"
                >
                  <img
                    src="/projects/coldeye/finetuning/apres.jpg"
                    alt="Fine-tuned checkpoint"
                    className="h-48 sm:h-56 w-full rounded-2xl shadow-xl object-cover transition-transform hover:scale-[1.01]"
                  />
                </ZoomableImage>
                <div className="mt-2.5 text-center">
                  <span className="inline-block rounded-full bg-green-400/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-green-400 uppercase tracking-wider">
                    After · Custom Checkpoint
                  </span>
                  <p className="mt-0.5 text-xs text-muted">
                    Correctly identified as ps5 controller
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
