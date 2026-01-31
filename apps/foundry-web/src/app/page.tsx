import { ProjectWizard } from '../components/ProjectWizard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            A1 App Foundry
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            From Pitch to Production. The luxury meta-builder for startups.
          </p>
        </div>

        <ProjectWizard />
      </div>
    </main>
  );
}
