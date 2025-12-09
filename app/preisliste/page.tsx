"use client";

export default function PreislistePage() {
  const pdfUrl = "/lunera-preisliste.pdf";

  return (
    <div className="fixed inset-0 bg-gray-100">
      <iframe
        src={pdfUrl}
        className="w-full h-full"
        style={{ border: "none" }}
      />
    </div>
  );
}
