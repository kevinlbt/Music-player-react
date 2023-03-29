import memories from "../assets/memories.mp3"; // importing the music
import resonance from "../assets/resonance.mp3";
import Last from "../assets/last.mp3";
import cube from "../assets/C418.mp3";
import time from "../assets/Time.mp3";
import m83 from "../assets/M83.mp3";
import trinix from "../assets/image/00059.png";
import reso from "../assets/image/reso.jpg";
import ofus from "../assets/image/000586.png";
import cubes from "../assets/image/cube.png";
import times from "../assets/image/time.jpg";
import m833 from "../assets/image/m83.jpg";


export const Tracks = [
    {   
        id:0,
        title: 'Memories',
        src: memories,
        author: 'Trinix ft Rushawn',
        thumbnail: trinix,
    },
    {
        id:1,
        title: 'resonance',
        src: resonance,
        author: 'Home',
        thumbnail: reso,
    },
    {
        id:2,
        title: 'Last',
        src: Last,
        author: 'Rachel Hardy',
        thumbnail: ofus,
    },
    {
        id:3,
        title: 'C418',
        src: cube,
        author: 'Minecraft',
        thumbnail: cubes,
    },
    {
        id:4,
        title: 'my tears are becomming a sea',
        src: m83,
        author: 'M83',
        thumbnail: m833,
    },
    {
        id:5,
        title: 'time - inception',
        src: time,
        author: 'Hans Zimmer',
        thumbnail: times,
    },
  ];