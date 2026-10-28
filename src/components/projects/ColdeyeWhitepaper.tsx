"use client";

import Link from "next/link";
import { ZoomableImage } from "./ZoomableImage";
import { RevealOnMount } from "@/components/motion/RevealOnMount";

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-2.5 w-2.5 border-accent/70 pointer-events-none ${className}`} />;
}

export function ColdeyeWhitepaper() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Top Navigation */}
      <RevealOnMount>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects/coldeye"
            className="inline-flex items-center gap-1.5 rounded-sm border border-border/80 bg-surface/40 px-3.5 py-1.5 font-sans text-xs font-medium text-foreground/80 transition-all hover:border-accent/40 hover:bg-surface/70 hover:text-foreground"
          >
            <span>←</span>
            <span>Back to Coldeye showcase</span>
          </Link>
          <span className="rounded-sm border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
            Architecture Whitepaper
          </span>
        </div>

        {/* Clean Header */}
        <div className="mt-8">
          <h1 className="font-serif text-2xl font-semibold text-accent sm:text-3xl">
            Coldeye Architecture Whitepaper
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80 sm:text-base">
            Design choices, detector benchmarks, custom dataset fine-tuning, and real-time event reasoning on local hardware.
          </p>
        </div>
      </RevealOnMount>

      <div className="mt-12 space-y-12">
        {/* SECTION 1: SYSTEM PREMISE */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
            <span className="mr-2.5 font-mono text-xs font-normal text-muted">01.</span>
            System Premise · Local Hardware
          </h2>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            Coldeye runs entirely on a single computer without any cloud connection. Camera feeds never leave the room, which protects personal privacy and removes network delays.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            Running several neural models at the same time is the main challenge. Detection, pose estimation, tracking, facial recognition, and OCR all share the same GPU and CPU. Every component is chosen for speed and steady frame rates rather than raw model size.
          </p>
        </section>

        {/* SECTION 2: END-TO-END PIPELINE OVERVIEW */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
            <span className="mr-2.5 font-mono text-xs font-normal text-muted">02.</span>
            Pipeline Overview
          </h2>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            The architecture is structured as a sequential pipeline from raw frames to queryable database records:
          </p>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-5 pt-1">
            <div className="rounded-sm border border-border/80 bg-surface/30 p-3.5 text-center">
              <span className="font-mono text-[10px] uppercase text-accent">Step 01</span>
              <p className="mt-1 font-sans text-xs font-semibold text-foreground">Capture Loop</p>
              <p className="mt-0.5 text-[11px] text-muted">OpenCV thread</p>
            </div>
            <div className="rounded-sm border border-border/80 bg-surface/30 p-3.5 text-center">
              <span className="font-mono text-[10px] uppercase text-accent">Step 02</span>
              <p className="mt-1 font-sans text-xs font-semibold text-foreground">Perception</p>
              <p className="mt-0.5 text-[11px] text-muted">YOLO11m + Pose</p>
            </div>
            <div className="rounded-sm border border-border/80 bg-surface/30 p-3.5 text-center">
              <span className="font-mono text-[10px] uppercase text-accent">Step 03</span>
              <p className="mt-1 font-sans text-xs font-semibold text-foreground">Tracking</p>
              <p className="mt-0.5 text-[11px] text-muted">ByteTrack IDs</p>
            </div>
            <div className="rounded-sm border border-border/80 bg-surface/30 p-3.5 text-center">
              <span className="font-mono text-[10px] uppercase text-accent">Step 04</span>
              <p className="mt-1 font-sans text-xs font-semibold text-foreground">Event Logic</p>
              <p className="mt-0.5 text-[11px] text-muted">Posture & pickup</p>
            </div>
            <div className="rounded-sm border border-border/80 bg-surface/30 p-3.5 text-center">
              <span className="font-mono text-[10px] uppercase text-accent">Step 05</span>
              <p className="mt-1 font-sans text-xs font-semibold text-foreground">Persistence</p>
              <p className="mt-0.5 text-[11px] text-muted">SQLite WAL + API</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: STREAM INGESTION */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
            <span className="mr-2.5 font-mono text-xs font-normal text-muted">03.</span>
            Stream Ingestion
          </h2>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            The system reads camera frames using OpenCV. It works with USB webcams, mobile phone cameras, RTSP streams, and video files.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            If video capture and model inference run together in a single loop, frames queue up in memory. Any slowdown in the model creates delay on screen. To prevent this, video capture runs in its own thread. It always hands over the newest frame and drops older ones during heavy compute spikes.
          </p>
        </section>

        {/* SECTION 4: DETECTOR SELECTION */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
            <span className="mr-2.5 font-mono text-xs font-normal text-muted">04.</span>
            Detector Selection · Benchmarks
          </h2>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            The detector is the core of the pipeline. It finds people and room objects to feed the tracking and interaction logic. Choosing the right architecture requires balancing accuracy against continuous runtime footprint.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            <strong className="text-foreground">Why a CNN rather than a Vision Transformer?</strong> Vision transformers like RT-DETR require heavy memory bandwidth to run global attention across the image. On a local computer running in the background, this causes loud fan noise and frame drops whenever other applications are open. A convolutional network focuses on local pixel areas, using much less memory while staying quiet and steady.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            <strong className="text-foreground">Why single-stage rather than two-stage?</strong> Two-stage models like Faster R-CNN first suggest regions and then crop and classify them one by one. This causes delays when multiple people enter the room. A single-stage detector scans the full image in one pass, keeping processing time completely predictable.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            <strong className="text-foreground">Empirical model selection:</strong> We first tested YOLO11s for its minimal compute footprint. In real camera tests, bounding boxes flickered and jittered between frames, which broke tracking continuity on held objects. Upgrading to YOLO11m stabilized object boundaries across consecutive frames while still running smoothly in real time.
          </p>

          <div className="relative mt-3 overflow-hidden rounded-sm border border-border/80 bg-surface/30 p-1">
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
                  <td className="px-4 py-3.5 text-foreground/75">Bounding box flickering and unstable boundaries across frames</td>
                  <td className="px-4 py-3.5 text-right font-mono text-xs text-red-400">Rejected</td>
                </tr>
                <tr className="hover:bg-surface/20">
                  <td className="px-4 py-3.5 font-mono font-medium text-foreground">RT-DETR</td>
                  <td className="px-4 py-3.5 text-muted">Vision Transformer</td>
                  <td className="px-4 py-3.5 text-foreground/75">Heavy compute footprint causing frame drops on continuous streams</td>
                  <td className="px-4 py-3.5 text-right font-mono text-xs text-amber-400">Ruled out</td>
                </tr>
                <tr className="bg-accent/5 hover:bg-accent/10">
                  <td className="px-4 py-3.5 font-mono font-semibold text-accent">YOLO11m</td>
                  <td className="px-4 py-3.5 text-muted">Balanced CNN</td>
                  <td className="px-4 py-3.5 text-foreground/90 font-medium">Stable object boundaries with smooth real-time playback</td>
                  <td className="px-4 py-3.5 text-right font-mono text-xs font-semibold text-green-400">Selected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5: TRANSFER LEARNING & CUSTOM DATASET */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
            <span className="mr-2.5 font-mono text-xs font-normal text-muted">05.</span>
            Custom Dataset · Fine-Tuning
          </h2>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            Pretrained models only recognize the 80 classes in the COCO dataset. Everyday room objects like a gaming controller or glasses case are not included. The base model misclassified a PS5 controller as a phone or remote control.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            We built a custom dataset pipeline in <code className="rounded-sm bg-surface/80 px-1.5 py-0.5 font-mono text-xs text-accent">ml/</code> to fix this gap:
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-1">
            <div className="rounded-sm border border-border/70 bg-surface/30 p-4">
              <span className="font-mono text-xs font-semibold text-accent">capture_dataset.py</span>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/80">
                Samples images across varying room lighting, rotations, and hand grips directly from the camera feed.
              </p>
            </div>
            <div className="rounded-sm border border-border/70 bg-surface/30 p-4">
              <span className="font-mono text-xs font-semibold text-accent">prepare_dataset.py</span>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/80">
                Structures bounding box annotations, partitions train and validation splits, and formats dataset files.
              </p>
            </div>
            <div className="rounded-sm border border-border/70 bg-surface/30 p-4">
              <span className="font-mono text-xs font-semibold text-accent">train.py</span>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/80">
                Fine-tunes base weights using transfer learning until classification and localization loss stabilize.
              </p>
            </div>
          </div>

          {/* Before / After Images (Without giant card encadrements) */}
          <div className="mt-4 pt-1">
            <div className="mx-auto grid max-w-xl grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col items-center">
                <ZoomableImage
                  src="/projects/coldeye/finetuning/avant.jpg"
                  alt="Pretrained COCO baseline misclassifying controller"
                  className="inline-block"
                >
                  <img
                    src="/projects/coldeye/finetuning/avant.jpg"
                    alt="Pretrained COCO baseline"
                    className="max-h-48 sm:max-h-52 w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-md transition-transform hover:scale-[1.01]"
                  />
                </ZoomableImage>
                <p className="mt-2 text-center text-xs text-muted">
                  <span className="font-semibold text-red-400">Before:</span> Pretrained COCO misclassifying controller
                </p>
              </div>

              <div className="flex flex-col items-center">
                <ZoomableImage
                  src="/projects/coldeye/finetuning/apres.jpg"
                  alt="Fine-tuned checkpoint accurately detecting PS5 controller"
                  className="inline-block"
                >
                  <img
                    src="/projects/coldeye/finetuning/apres.jpg"
                    alt="Fine-tuned checkpoint"
                    className="max-h-48 sm:max-h-52 w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-md transition-transform hover:scale-[1.01]"
                  />
                </ZoomableImage>
                <p className="mt-2 text-center text-xs text-muted">
                  <span className="font-semibold text-green-400">After:</span> Custom checkpoint detecting controller
                </p>
              </div>
            </div>
          </div>

          {/* Training Loss Curve Graph (No outer card, centered, with caption below) */}
          <div className="mt-6 flex flex-col items-center">
            <ZoomableImage
              src="/projects/coldeye/finetuning/results.png"
              alt="Training loss curves and validation metrics"
              className="inline-block max-w-full"
            >
              <img
                src="/projects/coldeye/finetuning/results.png"
                alt="Training loss curves"
                className="max-h-60 sm:max-h-72 w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-md transition-transform hover:scale-[1.01]"
              />
            </ZoomableImage>
            <p className="mt-2 text-center text-xs text-muted">
              Convergence curves across bounding box regression, classification loss, and mAP metrics
            </p>
          </div>
        </section>

        {/* SECTION 6: MULTI-TARGET TRACKING */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
            <span className="mr-2.5 font-mono text-xs font-normal text-muted">06.</span>
            Multi-Target Tracking
          </h2>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            We chose ByteTrack over DeepSORT. DeepSORT runs a second neural network on every detected box to extract appearance embeddings, which slows down the system when multiple objects appear.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            ByteTrack associates detections using Kalman filter motion predictions and box overlap. It tracks targets through brief occlusions without extra neural computation.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            During tests, fast entries produced blurry edges that briefly created ghost entities. We resolved this by requiring detections to persist across multiple consecutive frames before confirming a new entity.
          </p>

          <div className="mt-3 flex flex-col items-center">
            <ZoomableImage
              src="/projects/coldeye/entities.png"
              alt="Multi-target tracking visualization"
              className="inline-block"
            >
              <img
                src="/projects/coldeye/entities.png"
                alt="Multi-target tracking visualization"
                className="max-h-52 sm:max-h-60 w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-md transition-transform hover:scale-[1.01]"
              />
            </ZoomableImage>
            <p className="mt-2 text-center text-xs text-muted">
              Persistent tracking with bounding box IDs across continuous frames
            </p>
          </div>
        </section>

        {/* SECTION 7: SKELETAL POSE & POSTURE */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
            <span className="mr-2.5 font-mono text-xs font-normal text-muted">07.</span>
            Pose Estimation · Posture Detection
          </h2>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            We use YOLO11n-pose to extract 17 body keypoints per person and classify sitting versus standing. The nano model was selected because pose estimation needs much less capacity than dense object detection.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            In early tests with a webcam framing only the upper torso, the model hallucinated ankles and reported standing while the person was sitting. We fixed this by checking lower-body joint confidence across consecutive frames. When legs are hidden behind a desk, posture estimation pauses so it does not guess wrong.
          </p>

          <div className="mt-3 flex flex-col items-center">
            <ZoomableImage
              src="/projects/coldeye/room-sat.png"
              alt="Geometric posture classification showing sitting state"
              className="inline-block"
            >
              <img
                src="/projects/coldeye/room-sat.png"
                alt="Geometric posture classification showing sitting state"
                className="max-h-52 sm:max-h-60 w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-md transition-transform hover:scale-[1.01]"
              />
            </ZoomableImage>
            <p className="mt-2 text-center text-xs text-muted">
              Geometric joint angle analysis classifying sitting state
            </p>
          </div>
        </section>

        {/* SECTION 8: HAND-OBJECT INTERACTIONS */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
            <span className="mr-2.5 font-mono text-xs font-normal text-muted">08.</span>
            Hand-Object Spatial Interactions
          </h2>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            Detecting when someone picks up an item must run without wearable sensors. Heavy 3D hand mesh models were tested but discarded because they overloaded the GPU alongside detection and pose.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            Instead, we estimate the hand position by projecting outward from the wrist along the forearm line. When the hand remains in contact with an object, the pickup is confirmed. The item stays linked to the person until sustained separation registers a put-down.
          </p>

          <div className="mt-3 flex flex-col items-center">
            <ZoomableImage
              src="/projects/coldeye/desk-pickup.png"
              alt="Hand-object pickup interaction on desk"
              className="inline-block"
            >
              <img
                src="/projects/coldeye/desk-pickup.png"
                alt="Hand-object pickup interaction on desk"
                className="max-h-52 sm:max-h-60 w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-md transition-transform hover:scale-[1.01]"
              />
            </ZoomableImage>
            <p className="mt-2 text-center text-xs text-muted">
              Hand-object proximity detection confirming item pickup from desk
            </p>
          </div>
        </section>

        {/* SECTION 9: FACE PRIVACY & BIOMETRICS */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
            <span className="mr-2.5 font-mono text-xs font-normal text-muted">09.</span>
            Face Privacy · Biometric Enrollment
          </h2>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            Privacy is active by default. Faces are detected and pixelated directly on each frame before any image is shown on screen or saved to disk. A toggle in the dashboard allows blurring to be turned on or off at any moment.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            Biometric identification remains strictly opt-in. When a user chooses to enroll, DeepFace generates face embeddings stored locally in SQLite.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            Biometric face verification is compute-heavy. Running it directly in the main capture loop freezes the video stream. We isolate face matching into a separate background process so video playback stays smooth.
          </p>

          <div className="mt-3 flex flex-col items-center">
            <ZoomableImage
              src="/projects/coldeye/entity-woman.png"
              alt="Frame-level face pixelation and demographic profile"
              className="inline-block"
            >
              <img
                src="/projects/coldeye/entity-woman.png"
                alt="Frame-level face pixelation and demographic profile"
                className="max-h-52 sm:max-h-60 w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-md transition-transform hover:scale-[1.01]"
              />
            </ZoomableImage>
            <p className="mt-2 text-center text-xs text-muted">
              Automatic frame-level face pixelation with opt-in demographic enrollment
            </p>
          </div>
        </section>

        {/* SECTION 10: ON-DEMAND OCR */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
            <span className="mr-2.5 font-mono text-xs font-normal text-muted">10.</span>
            On-Demand Text Extraction (OCR)
          </h2>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            Reading text on held objects requires careful resource management. Running recognition on every video frame quickly overloads the machine.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            <strong className="text-foreground">Why on-demand?</strong> Coldeye triggers OCR only when an item is held up near the lens. This avoids extra workload during regular monitoring.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            <strong className="text-foreground">Why EasyOCR over Tesseract?</strong> Traditional Tesseract converts images to black and white first, which often fails under uneven room lighting or tilted packaging. EasyOCR finds and reads text directly with neural models, handling real-world objects reliably.
          </p>
        </section>

        {/* SECTION 11: CONCURRENCY & PERSISTENCE */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
            <span className="mr-2.5 font-mono text-xs font-normal text-muted">11.</span>
            Concurrency · Non-Blocking Storage
          </h2>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            The backend separates vision processing, data storage, and the web interface.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            Events are written to SQLite in Write-Ahead Logging (WAL) mode. Standard SQLite locks the file during writes, which crashes web queries when the vision engine writes a rapid stream of vision events. WAL mode lets FastAPI read data freely while the vision loop appends records.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
            FastAPI serves live video and events to the Next.js dashboard for real-time monitoring and timeline playback.
          </p>

          <div className="mt-3 flex flex-col items-center">
            <ZoomableImage
              src="/projects/coldeye/activity.png"
              alt="Live activity timeline and event stream"
              className="inline-block"
            >
              <img
                src="/projects/coldeye/activity.png"
                alt="Live activity timeline and event stream"
                className="max-h-52 sm:max-h-60 w-auto max-w-full rounded-sm border border-white/10 object-contain shadow-md transition-transform hover:scale-[1.01]"
              />
            </ZoomableImage>
            <p className="mt-2 text-center text-xs text-muted">
              Real-time activity log streamed to the web dashboard
            </p>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-8 font-sans text-xs">
          <Link
            href="/projects/coldeye"
            className="inline-flex items-center gap-1.5 rounded-sm border border-border/80 bg-surface/40 px-3.5 py-1.5 font-medium text-foreground/80 transition-all hover:border-accent/40 hover:bg-surface/70 hover:text-foreground"
          >
            <span>←</span>
            <span>Back to Coldeye showcase</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-sm border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-medium text-accent transition-all hover:bg-accent/20 hover:text-accent"
          >
            <span>View all projects</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
