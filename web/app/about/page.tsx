import type { NextPage } from "next";

export const metadata = {
  title: "About",
};

export const dynamic = "force-static";

const About: NextPage = () => {
  return (
    <>
      <h1 className="heading-primary">About me</h1>
      <p>Hello.</p>
      <p>
        I am a programmer who enjoys web technologies and admires low-level
        programming and systems programming. I love exploring new languages. I
        have a lot of opinions about the world of software and I can&apos;t wait
        to have them destroyed by new experiences.
      </p>
      <p>
I have a master's degree from the Faculty of Information Technology at Brno University of Technology.
      </p>
      <h2>What is in my toolbox?</h2>
      <p>
        My favorite technologies so far are{" "}
        <b>Zig, Rust, TypeScript, and React</b>. I recently fell in love with
        Neovim, Nix and windowing manager Hyprland. I like to automate what I
        can with scripts.
      </p>
      <p>I also have experience in languages like Java, C, C++ and Python.</p>
      <h2>What do I do in my free time?</h2>
      <p>
        Outside of computers, I enjoy reading a good sci-fi book, playing the
        occasional video game and lifting weights. I have also recently found a
        passion for bouldering. 🧗
      </p>
    </>
  );
};

export default About;
