import memories from "../assets/memories.mp3"; // importing the music
import resonance from "../assets/resonance.mp3";
import Last from "../assets/last.mp3";
import cube from "../assets/C418.mp3";
import trinix from "../assets/image/00059.png";
import reso from "../assets/image/reso.jpg";
import ofus from "../assets/image/000586.png";
import cubes from "../assets/image/cube.png";

export const Tracks = [
    {
        title: 'Memories',
        src: memories,
        author: 'Trinix ft Rushawn',
        thumbnail: trinix,
    },
    {
        title: 'resonance',
        src: resonance,
        author: 'Home',
        thumbnail: reso,
    },
    {
        title: 'Last',
        src: Last,
        author: 'Rachel Hardy',
        thumbnail: ofus,
    },
    {
        title: 'C418',
        src: cube,
        author: 'Minecraft',
        thumbnail: cubes,
    },
    // ...
  ];