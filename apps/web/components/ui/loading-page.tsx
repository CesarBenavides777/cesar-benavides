export default function Loading() {
  return (
    <div className="min-h-screen bg-white p-6 animate-pulse">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto space-y-20">
        {/* Hero Section */}
        <section className="space-y-6">
          <div className="h-12 w-96 max-w-full bg-gray-200 rounded" />
          <div className="h-6 w-72 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full max-w-2xl bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        </section>

        {/* Contact Form */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 w-12 bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-12 bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-12 bg-gray-200 rounded" />
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-32 w-full bg-gray-200 rounded" />
            </div>

            <div className="h-10 w-24 bg-gray-200 rounded" />
          </div>
        </section>
      </main>
    </div>
  );
}
