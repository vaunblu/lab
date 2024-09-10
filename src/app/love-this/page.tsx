import { LoveThis } from "./love-this";
import imageInterstellar from "./interstellar.jpg";
import imageHer from "./her.jpg";
import imageMurph from "./murph.jpg";
import imageScarlett from "./scarlett.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex h-screen flex-col space-y-12 overflow-hidden bg-background p-14 pt-24 text-xl leading-relaxed">
      <Image
        src={imageHer}
        alt="Interstellar cover"
        placeholder="blur"
        className="h-auto w-48 rounded-3xl drop-shadow-[0_0px_35px_rgba(346,91,41,0.4)]"
      />

      <div className="space-y-3">
        <h1 className="text-4xl">Her</h1>
        <div className="flex gap-3">
          <Image
            src={imageScarlett}
            alt="Scarlett"
            className="size-8 rounded-full object-cover object-top"
          />
          <p className="font-medium">Samantha (Scarlett)</p>
          <p className="text-muted-foreground">@scarlettjo</p>
        </div>
        <p className="text-lg text-muted-foreground">December 18, 2013</p>
      </div>

      <div className="max-w-md space-y-8">
        <p>
          Theodore is a lonely man in the final stages of his divorce. When
          he&apos;s not working as a letter writer, his down time is spent
          playing video games and occasionally hanging out with friends. He
          decides to purchase the new OS1, which is advertised as the
          world&apos;s first artificially intelligent operating system,
          &quot;It&apos;s not just an operating system, it&apos;s a
          consciousness,&quot; the ad states. Theodore quickly finds himself
          drawn in with Samantha, the voice behind his OS1.
        </p>
        <p>
          As they start spending time together they grow closer and closer and
          eventually find themselves in love. Having fallen in love with his OS,
          Theodore finds himself dealing with feelings of both great joy and
          doubt. As an OS, Samantha has powerful intelligence that she uses to
          help Theodore in ways others hadn&apos;t, but how does she help him
          deal with his inner conflict of being in love with an OS?
        </p>
        <p>
          A great film about loneliness. Splendid performance of Joaquin
          Phoenix. And pure poetry. Admirable poem about isolation, need of
          other, social surogate and , off course, freedom. Its basic virtue -
          the proposed questions creating perfect atmosphere , becoming inspired
          challenges to discover new perspectives.
        </p>
      </div>

      <LoveThis />
    </main>
  );
}
