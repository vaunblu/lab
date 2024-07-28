import { LoveThis } from "./_components/love-this";
import { Toolbar } from "./_components/toolbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-12">
      <LoveThis />
      {/* <Toolbar /> */}
    </main>
  );
}
