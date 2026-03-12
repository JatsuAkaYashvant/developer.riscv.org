/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import { translate } from '@docusaurus/Translate';
import { sortBy } from '@site/src/utils/jsUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faCircleMinus } from '@fortawesome/free-solid-svg-icons';

// LIST OF AVAILABLE TAGS
// Available tags to assign to a showcase site
// Please choose all tags that you think might apply.
// We'll remove inappropriate tags, but it's less likely that we add tags.
export type TagType =
  // DO NOT USE THIS TAG: we choose sites to add to favourites
  | 'favourite'
  // DO NOT USE THIS TAG: we will add official devices/themes to the showcase.
  | 'asic'
  | 'fpga'
  | 'certified'
  | 'profile_compliant';

export type MaintainedType = 
  | 'maintained'
  | 'unmaintained'
  | 'unknown';

export type ProfileType = 
  | 'rvi20'
  | 'rva20'
  | 'rva22'
  | 'rva23'
  | 'rvb23'
  | 'unknown';

// Add devices to this list
// prettier-ignore
const Devices: Device[] = [
  {
    id: 'microchip.polarfire.icicle',
    name: 'PolarFire SoC Icicle Kit',
    image: 'microchip/fpga-icicle-kit.png',
    description: 'The PolarFire SoC Icicle Kit is a low-cost development platform that enables evaluation of the five-core Linux capable RISC-V microprocessor subsystem, innovative Linux, and real-time execution, low-power capabilities, and the rich set of peripherals of the PolarFire SoC FPGA. PolarFire SoC is ideally suited for secure, reliable and power-efficient compute across a wide range of applications including Imaging, AI/ML, Industrial automation, IoT, Wireline Access Networks, Aerospace, and Defense & Automotive. The Icicle kit features onboard memories (LPDDR4, SPI, and eMMC flash) to run Linux off-the-shelf; a multi-rail power sensor to monitor various power domains; PCIe root port, Raspberry pi, and mikroBUS expansion ports and a host of wired connectivity options for quick prototyping and fast time to market. Features: PolarFire SoC FPGA (MPFS250T-FCVG484EES) , SiFive E51 Monitor core (1 x RV64IMAC) , SiFive U54 Application cores (4 x RV64GC) and Secure boot.  Memory and Storage: 2 GB LPDDR4 x 32, 1 Gb SPI flash, 8 GB eMMC flash & SD card slot (multiplexed).Programming & Debugging:Onboard JTAG connector or onboard embedded FlashPro (multiplexed), UART via micro USB, 52 x test points. Interfaces:4 x 12.7 Gbps SERDES, PCIe Gen2 Rootport, 2 x Gigabit Ethernet, Micro USB 2.0 Hi-Speed OTG , 4 x UART (via single micro USB) , 2 x CAN , 2 x SPI , 2 x I²C.',
    preview: null,
    website: 'pathname:///directory/microchip/polarfile-soc-icicle',
    page: 'https://www.microchip.com/en-us/development-tool/MPFS-ICICLE-KIT-ES',
    author: 'Microchip',
    tags: ['asic','fpga'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    profile: 'rvi20',
  },
  {
    id: 'sifive.hifivep550',
    name: 'SiFive HiFive Pro P550',
    image: 'sifive/hifivep550.png',
    description: 'RISC-V is inevitable, and the HiFive Pro P550 development system exemplifies that. In partnership, Intel and SiFive are excited to introduce the highest performance RISC-V development board, which is scheduled to be available Summer 2023. HiFive Pro P550 Features & Specifications:The soul of the machine is the Intel Horse Creek SoC, built on the Intel 4 process, that includes a SiFive Performance™ P550 Core Complex, a quad-core application processor featuring a thirteen-stage, triple-issue, out-of-order pipeline with the RISC-V RV64GBC ISA, and on-board DDR5-5600 and PCIe Gen5. Board features (subject to change) include; 16GB DDR5, 2x PCIe expansion slots, 1/10GbE Networking, USB 3, on-board graphics and a remote management ready interface (OCP DC-SCM). This is a premium software development system ideal for developer desktop machines and rack-based build/test/deploy servers for RISC-V software development. RISC-V has no limits. Intel-SiFive Horse Creek SoC containing quad-core SiFive Performance P550 core complex, 16GB DDR5, Gigabit Ethernet Port, USB 3, Industry standard microATX. Expansion Capabilities, Multiple x16 PCIe® Gen 3 Expansion Slot , M.2 M-Key Slot (PCIe Gen 3) for NVME 2280 SSD Module, M.2 E-Key Slot (PCIe Gen 3) for Wi-Fi/Bluetooth Module. If you’re a serious software developer, kernel developer, or Linux hacker, there are a few great reasons to use this board, including performance for the serious software designer; port software to the RISC‑V platform; evaluate the SiFive Performance P550‑MC processor; want multi-core, Linux-capable RISC‑V hardware; need to create the next great thing!',
    preview: null,
    website: 'pathname:///directory/sifive/hifivep550',
    page: 'https://www.sifive.com/boards/hifive-pro-p550',
    author: 'SiFive',
    tags: ['certified'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    profile: 'rva20',
  },
  {
    id: 'OpenHW.corevdevkit',
    name: 'OpenHW CORE-V MCU DevKit',
    image: 'openhw/Core-V-Dev-Kit-Render-GG-Main.jpeg',
    description: 'The CORE-V MCU DevKit is a turnkey, open-source development and prototyping platform for the CORE-V MCU System on Chip. The CORE-V MCU DevKit enables makers of IoT and embedded systems to evaluate the performance of the CORE-V MCU, to interconnect with WiFi and the IoT cloud, and to develop and test software using the CORE-V SDK. Features: CORE-V MCU, CV32E40P processor core, Quicklogic ArticPro 2 eFPGA, 4 MB flash memory, Ashling Opella-LD onboard JTAG debug module, USB-C for terminal and onboard debug access, JTAG connector for external debug access, Espressif AWS IoT ExpressLink Module for AWS IoT cloud interconnect, mikroBUS onboard socket, allowing access to a vast range of mikroBUS modules, Himax HM01B0 Ultralow Power CMOS Image Sensor, I2C temperature sensor, Several LEDs, Reset button and general purpose button, Dimensions 75 mm x 100 mm, Power supply via USB-C or barrel connector (5V - 18V in). The CORE-V MCU DevKit is supported by OpenHW Group’s open-source CORE-V MCU SDK. The SDK comprises: Eclipse based IDE, Debug support, FreeRTOS, CORE-V GNU GCC tool chain, Peripheral driver libraries, Example Code.',
    preview: null,
    website: 'pathname:///directory/openhw/corev-mcu-devkit',
    page: 'https://www.openhwgroup.org/core-v-devkits/',
    author: 'OpenHW',
    tags: ['asic'],
    minimumVersion: null,
    maintenanceStatus: 'unknown', 
    profile: 'rva22',
  },
  {
    id: 'deepcomputing.mainboard3',
    name: 'DC-ROMA RISC-V Mainboard III',
    image: 'deepcomputing/DC-ROMA-RISC-V-Mainboard-III.jpeg',
    description: 'SpacemiT K3 integrates high-performance RISC-V CPU cores with a powerful AI engine, enabling developers to run modern Linux distributions, accelerate AI workloads, and explore next-generation software stacks on open hardware.',
    preview: null,
    website: 'https://deepcomputing.io/dc-roma-risc-v-mainboard-iii-unveiled-at-fosdem-powered-by-spacemit-k3-for-framework-laptop-13/',
    page: 'https://deepcomputing.io/dc-roma-risc-v-mainboard-iii-unveiled-at-fosdem-powered-by-spacemit-k3-for-framework-laptop-13/',
    author: 'DeepComputing',
    tags: ['profile_compliant','favourite'],
    minimumVersion: null,
    maintenanceStatus: 'unknown', 
    profile: 'rva23',
  },
  {
    id: 'banana.pi.f3',
    name: 'Banana Pi F3',
    image: 'bananapi/f3/banana_pi_f3.jpg',
    description: 'Banana Pi BPI-F3: Powered by the SpacemiT K1 (an 8-core RISC-V SoC), this board is designed for high-performance computing, supporting RVA22 and RVV 1.0.',
    preview: null,
    website: 'https://docs.banana-pi.org/en/BPI-F3/BananaPi_BPI-F3',
    page: 'https://docs.banana-pi.org/en/BPI-F3/BananaPi_BPI-F3',
    author: 'Banana Pi',
    tags: ['favourite'],
    minimumVersion: null,
    maintenanceStatus: 'unknown',
    profile: 'rva22',
  },
  {
    id: 'orangepi.rv2',
    name: 'OrangePi RV2',
    image: 'orangepi/rv2.jpeg',
    description: 'RISC-V development board with Ky X1 8-core RISC-V AI CPU, providing 2TOPS CPU fusion of general-purpose computing power to support rapid deployment of AI model algorithms. ',
    preview: null,
    website: 'http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-RV2.html',
    page: 'http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-RV2.html',
    author: 'OrangePi',
    tags: ['favourite'],
    minimumVersion: null,
    maintenanceStatus: 'unknown', 
    profile: 'rva22',
  },
  {
    id: "deepcomputing.dcromapad2",
    name: "DC-ROMA RISC-V Pad II",
    company: "DeepComputing",
    description: "Equipped with Ubuntu and powered by an 8-core RISC-V CPU, DC-ROMA RISC-V Pad II is tailored for mobile terminal applications, the touch interface of the DC-ROMA RISC-V Pad II facilitates direct testing and interaction, streamlining the development process.",
    website: "https://deepcomputing.io/product/dc-roma-risc-v-pad-ii/",
    page: "https://deepcomputing.io/product/dc-roma-risc-v-pad-ii/",
    //image: "https://drive.google.com/file/d/1nMoC398B9osmlzzxWMzuTiULGtx8Oiv2/view?usp=sharing",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "deepcomputing.dcromalaptop2",
    name: "DC-ROMA RISC-V Laptop II",
    company: "DeepComputing",
    description: "The DC-ROMA RISC-V Laptop II is the world’s first RISC-V laptop pre-installed and powered by Ubuntu, which is one of the most popular Linux distributions in the world, providing developers with an outstanding mix of usability and reliability, as well as a rich ecosystem with security and support. The new DC-ROMA laptop II is the first to feature SpacemiT’s SoC K1 – with its 8-cores RISC-V CPU running at up to 2.0GHz with 16GB of memory. This significantly doubled its overall performance and energy efficiency over the previous generation’s 4-cores SoC running at 1.5GHz. Moreover, SpacemiT’s SoC K1 is also the world’s first SoC to support RISC-V high performance computing RVA 22 Profile RVV 1.0 with 256 bit width, and to have powerful AI capabilities with its customised matrix operation instruction based on IME Group design principle!",
    website: "https://deepcomputing.io/product/dc-roma-risc-v-laptop-ii/",
    page: "https://deepcomputing.io/product/dc-roma-risc-v-laptop-ii/",
    //image: "https://drive.google.com/file/d/1Ohg8YvizfkfvNeVRGLZl07H2e7zlFJL5/view?usp=sharing",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "beagleboard.beaglevfire",
    name: "Beagleboard - BeagleV®-Fire",
    company: "RISC-V International",
    description: "BeagleV®-Fire is a revolutionary single-board computer (SBC) powered by the Microchip’s PolarFire® MPFS025T 5x core RISC-V System on Chip (SoC) with FPGA fabric. BeagleV®-Fire opens up new horizons for developers, tinkerers, and the open-source community to explore the vast potential of RISC-V architecture and FPGA technology. It has the same P8 & P9 cape header pins as BeagleBone Black allowing you to stack your favorite BeagleBone cape on top to expand it’s capability. Built around the powerful and energy-efficient RISC-V instruction set architecture (ISA) along with its versatile FPGA fabric, BeagleV®-Fire SBC offers unparalleled opportunities for developers, hobbyists, and researchers to explore and experiment with RISC-V technology.",
    website: "https://www.beagleboard.org/boards/beaglev-fire",
    page: "https://www.beagleboard.org/boards/beaglev-fire",
    //image: "https://riscv.org/wp-content/uploads/2023/10/beagleboard-logo.png",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "bosc.osoc1",
    name: "BOSC - One Student One Chip Phase1",
    company: "RISC-V International",
    description: "On August 27, 2019, five 2016 undergraduate students from the University of Chinese Academy of Sciences and the teaching team held a relaxed but significant mobilization meeting in the office of Professor Bao Yungang. At the meeting, they discussed and formulated the overall design plan for the processor chip, determined the technical route, basic platform, development environment, tape-out process, etc. At this point, the first session of the 'One Student One Chip' Initiative was officially launched. Subsequently, during the 4 months intensive development process, five students, under the leadership of the teaching team, were responsible for implementing each core functional module of the processor chip. Although a lot of professional knowledge was not introduced in class, the students independently reviewed the information and solved various problems encountered during development.Finally, through the joint efforts of the students and the teaching team, the first session of the 'One Student One Chip' processor chip was successfully lit, and was able to successfully run the GNU/Linux operating system and print the logo of UCAS on the terminal.",
    website: "https://ysyx.oscc.cc/en/project/intro-past.html",
    page: "https://ysyx.oscc.cc/en/project/intro-past.html",
    //image: "https://riscv.org/wp-content/uploads/2024/10/Beijing-Institute-Open-Source-Chip.svg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "bosc-osoc2",
    name: "BOSC - One Student One Chip Phase2",
    company: "RISC-V International",
    description: "The second session of the 'One Student One Chip' Initiative was officially launched in the fall of 2020. The student composition is no longer limited to undergraduates from the University of Chinese Academy of Sciences, but has successfully attracted a total of 11 outstanding students from Zhejiang University, Nanjing University, Northwestern Polytechnical University, Harbin Institute of Technology (Shenzhen) and other universities to sign up. In addition to the increase in the number of participants in the initiative, the staffing of the second session of the 'One Student One Chip' teaching team has also been further upgraded. Two teachers from the ICT and Zhejiang University have joined the teaching team, and six 2016 UCAS undergraduate students have served as TAs (including the first 5 students from the first session of the 'One Student One Chip' Initiative and one student in charge of the FPGA simulation platform provide technical guidance to students in this session at key development nodes. Finally, after several months of independent development and debugging verification, 11 students all completed the processor core design and tape-out.",
    website: "https://ysyx.oscc.cc/en/project/intro-past.html",
    page: "https://ysyx.oscc.cc/en/project/intro-past.html",
    //image: "https://riscv.org/wp-content/uploads/2024/10/Beijing-Institute-Open-Source-Chip.svg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "bosc.osoc3",
    name: "BOSC - One Student One Chip Phase3",
    company: "RISC-V International",
    description: "The third session of the 'One Student One Chip' Initiative was officially launched on July 7, 2021. It strives to combine the training of processor chip design talents with the construction of an open source processor chip ecosystem, and cultivate both masters of knowledge in the field of processor chip architecture design. Professional talents who have experience in the entire process of processor chip design and manufacturing. The total number of applicants for the third session is 760, and participating students cover 168 domestic and foreign universities (including 30 foreign universities). According to statistics from the student's perspective, among the number of applicants, there are 625 current students, accounting for 82%. At the same time, many graduated students are also interested in processor chip design. Among the students on campus, undergraduates, masters and doctoral students are distributed in all grades, of which 44% are undergraduates, 50% are master students, and 6% are masters and doctoral students. In terms of grade breakdown, the five grades with the most applicants are: first-year graduate students (27%), junior students (23%), second-year graduate students (14%), sophomore students (11%), and senior students (7%). Judging from the registration data, the third session of the 'One Student One Chip' Initiative has officially entered the cross-regional large-scale talent training stage.In order to cope with the huge challenges in labor costs brought about by large-scale talent training, the project team tried for the first time to establish a set of teaching processes that 'let students guide students'. Lecture Q&A, progress inspection, SoC integration verification and back-end physical design are all completed independently by the students. Engineers only participate in the inspection of the chip back-end in the final stage and make suggestions for improvement. This not only fundamentally solves the problem of imbalance between supply and demand of teachers, but also cultivates a group of TA teams with excellent technical skills and excellent psychological quality, laying a solid foundation for the subsequent development of the 'One Student One Chip' Initiative. There are 27 front-end TAs in total, who are mainly responsible for preparing lecture notes and other auxiliary materials, organizing reports and answering questions, and following up on students' learning progress. The SoC team has 4 people, mainly responsible for collecting processor codes submitted by students and performing SoC integration and post-integration verification work. The IC back-end team has a total of 5 people, mainly responsible for the physical design of the chip and generating a GDSII layout that can be taped out. With the support of the above process, the number of tape-out students in this session has reached more than 50.",
    website: "https://ysyx.oscc.cc/en/project/intro-past.html",
    page: "https://ysyx.oscc.cc/en/project/intro-past.html",
    //image: "https://riscv.org/wp-content/uploads/2024/10/Beijing-Institute-Open-Source-Chip.svg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "bosc.osoc4",
    name: "BOSC - One Student One Chip Phase4",
    company: "RISC-V International",
    description: "After learning from the valuable experiences summarized by students who participated in the third session of the initiative, the project team sorted out the goals of the fourth session of the 'One Student One Chip' Initiative and clarified the three-step strategy of the 'One Student One Chip' Initiative. The first step is to break the barriers of imbalanced educational resources, so that those college students from both sides of the country who are very interested in processor chip design can also have the opportunity to participate in the full-process learning of processor chips. This has very important and positive significance for improving the popularization of processor chip education in colleges and universities in my country. The second step is to break through the boundaries of traditional courses and integrate EE and CS for full-stack talent training. The core of the fourth session of the'One Student One Chip' Initiative is to build a set of software and hardware co-design concepts and integrate them into the entire processor chip teaching process so that students not only understand how to design processor chips with code , but also to understand how processor chips are made, that is, the entire process of processor chips from design to manufacturing. The third step is to encourage students who have participated in the program to enter the software and hardware open source community and strive to overcome various bottleneck problems that our country currently needs to solve. In stuck areas, major breakthroughs in key areas will ultimately attract more students to participate in the 'One Student One Chip' Initiative, thus achieving a virtuous positive cycle.The number of applicants for the fourth session of 'One Student One Chip' was 1,753, covering a total of 328 colleges and universities at home and abroad. The number of applicants increased by 130.0% compared with the previous session, and the growth rate of college coverage was 95.2%. This shows that with the progress of third session of 'One Student One Chip' Initiative, more students recognized the large-scale talent training plan proposed by the teaching team, and the scale of teaching began to gradually expand. The fourth session of the 'One Student One Chip' Initiative is divided into four training stages, of which a total of 98 people have studied to stage B, a total of 101 people have studied to stage A, a total of 16 people have completed the tape-out through defense, and a total of 215 people have continued to study. People, despite increasing the difficulty of learning, the number of students continuing to study this period has basically remained the same as that of the previous session. And as the learning stage deepens, there is no obvious one-sided situation in the number of undergraduates and graduate students. This shows that whether you are just starting students with zero-based in professional knowledge or scholars who have already engaged in research in related fields can adapt well to the training program provided by 'One Student One Chip'.",
    website: "https://ysyx.oscc.cc/en/project/intro-past.html",
    page: "https://ysyx.oscc.cc/en/project/intro-past.html",
    //image: "https://riscv.org/wp-content/uploads/2024/10/Beijing-Institute-Open-Source-Chip.svg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "bosc.osoc5",
    name: "BOSC - One Student One Chip Phase5",
    company: "RISC-V International",
    description: "As of now, the number of applicants for the fifth session of 'One Student One Chip' is 1,744, and the coverage of universities, the proportion of disciplines and majors, and the number of people who have passed the tape-out are basically consistent with the previous session. Compared with the previous sessions, there are two biggest highlights of the fifth session of the 'One Student One Chip' Initiative: First, the teaching team has added new teaching courseware and videos based on the study handouts of the fourth session. The learning slope is further slowed down, allowing students to complete various stages of processor chip design step by step. Secondly, for the first time, there are students in high school and below among the registered students, and the number has reached 22, which indicates that the continuously optimized'One Student One Chip' Initiative training program will be more universal: Facts have proved regardless of the age of the students, as long as they love processor chip design and have the most basic understanding of computer software and hardware, they can participate in the 'One Student One Chip' Initiative and achieve quite good results. At the same time, it can be seen that the attraction and influence of the 'One Student One Chip' Initiative is increasing day by day. We believe that as time goes by, 'One Student One Chip' will enable every student to learn something and have the opportunity to achieve it. The ultimate goal is to graduate with a processor chip designed by themselves.# ",
    website: "https://ysyx.oscc.cc/en/project/intro-past.html",
    page: "https://ysyx.oscc.cc/en/project/intro-past.html",
    //image: "https://riscv.org/wp-content/uploads/2024/10/Beijing-Institute-Open-Source-Chip.svg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "andes.voyagerdev",
    name: "Andes Voyager Development Platform",
    company: "RISC-V International",
    description: "The QiLai SoC chip includes high performance quad-core RISC-V AX45MP cluster and one NX27V vector processor. The AndesCore™ AX45MP superscalar multicore contains a 2MB Level-2 cache, a coherence manger to manage Level-1 cache coherence, and a MMU (Memory Management Unit) for Linux based applications. The AndesCore™ NX27V vector processor with 512KB data cache supports a full range of RISC-V standard data types and Andes-enhanced data types optimized for AI workloads. The NX27V contains an efficient scalar unit and an out-of-order Vector Processing Unit (VPU) with 512-bit vector length (VLEN) and 512-bit data path width (DLEN), capable of generating up to 4 512-bit results per cycle. The NX27V can cooperate with the AX45MP cluster and make QiLai a heterogeneous software development platform where a Linux SMP system and an RTOS or bare-metal system can run simultaneously. The AX45MP and NX27V can run up to 2.2 GHz and 1.5GHz  respectively, and the total power consumption of the QiLai SoC is around 5W when running at its full speed.",
    website: "https://www.andestech.com/en/products-solutions/andeshape-platforms/qilai-chip/",
    page: "https://www.andestech.com/en/products-solutions/andeshape-platforms/qilai-chip/",
    //image: "https://riscv.org/wp-content/uploads/2023/03/Andes-Logo.svg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "spacemit.powerstonep1",
    name: "SpacemiT Power Stone P1 ",
    company: "SpacemiT",
    description: "The SpacemiT Power Stone P1 is a customized power supply solution for high-performance computing systems. The PMIC (Power Management IC) P1 is a powerful solution, designed to meet the diverse power requirements of various applications. The P1 is mainly used for AR/VR, industrial devices, AI Robots and drone.",
    website: "https://www.spacemit.com/en/spacemit-power-stone-2/",
    page: "https://www.spacemit.com/en/spacemit-power-stone-2/",
    //image: "https://riscv.org/wp-content/uploads/2022/06/SpacemiT.logo_-scaled.jpg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: " spacemit.keystonek1",
    name: "SpacemiT Key Stone K1",
    company: "SpacemiT",
    description: "K1 is an octa-core 64-bit RISC-V AI CPU. K1 is mainly used for single board computer, intelligent robots, various terminals running edge-side large models, home storage and computing terminals, industry computing terminals, AI PCs, edge node computers, and so on.",
    website: "https://www.spacemit.com/en/key-stone-k1/",
    page: "https://www.spacemit.com/en/key-stone-k1/",
    //image: "https://riscv.org/wp-content/uploads/2022/06/SpacemiT.logo_-scaled.jpg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "asus.iottinkerv",
    name: "ASUS IoT Tinker V",
    company: "RISC-V International",
    description: "The first RISC-V single-board computer (SBC) from ASUS IoT embraces open-source architecture to expand options for industrial IoT developer community. First ASUS IoT RISC-V SBC:64-bit processor embraces open-source RISC-V architecture to deepen diversity and flexibility for IoT developers. Ideal for industrial IoT:Rich connectivity, assured longevity and reliable, trusted technical support. Linux Debian and Yocto support:Accelerates adoption of RISC-V and deployment in industrial IoT applications.",
    website: "https://tinker-board.asus.com/series/tinker-v.html",
    page: "https://tinker-board.asus.com/series/tinker-v.html",
    //image: "",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "adp.corvette-t1",
    name: "ADP-Corvette-T1",
    company: "ADP",
    description: "The ADP-Corvette-T1 is a highly integrated SoC with 32-bit RISC-V CPU, DSP, AI Engine, RF front-end and on board PCB Antenna, which can reduce overall BOM cost. Users can easily build the prototypes and applications of IoT devices under Arduino standard IDE and full-featured AndeSight™ IDE.",
    website: "https://www.andestech.com/en/products-solutions/andeshape-platforms/corvette-t1/",
    page: "https://www.andestech.com/en/products-solutions/andeshape-platforms/corvette-t1/",
    //image: "",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "metasilicon.mat",
    name: "MetaSilicon MAT Series",
    company: "MetaSilicon",
    description: "MAT series products meet the requirements of vehicle regulations and will cover various resolutions such as 1.3MP, 3MP, 8MP, and 14+MP, and can be used in Automotive applications such as electronic rearview mirrors, 360° surround view, and advanced assisted driving (ADAS). With the support of self-developed ultra-low noise and power consumption reading circuits, unique MTSEx high dynamic HDR and other technologies, it provides low power consumption, high sensitivity, high dynamic range, and high frame rate car specifications for smart vehicle applications.",
    website: "http://www.mtsilicon.com/product#mat_series",
    page: "http://www.mtsilicon.com/product#mat_series",
    //image: "",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "milkv.jupiter",
    name: "Milk-V Jupiter",
    company: "Milk-V",
    description: "Powered by the Spacemit K1/M1 SoC, is the world's first Mini ITX device to support both RVA22 and RVV1.0. This device integrates a standard PCIe connector, supporting common PCIe devices such as graphics cards, PCIe to SATA adapters, and network cards. It features dual Gigabit Ethernet interfaces, onboard Wi-Fi 6/BT 5.2, and supports NVMe SSDs, making it an ideal choice for an entry-level RISC-V desktop.",
    website: "https://milkv.io/jupiter",
    page: "https://milkv.io/jupiter",
    //image: "",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "milkv.megrez",
    name: "Milk-V Megrez",
    company: "Milk-V",
    description: "The Megrez is an 170 x 170mm motherboard with an ESWIN EIC7700X SOC running at 1.6 GHz using a SiFive P550 quad-core RISC-V (RV64CG) processor, integrated graphics, and a 20 TOPS NPU. The board supports 8GB, 16GB, or 32GB of LPDDR5-6400 memory, has an M.2 x2 connector for PCIe 2.0 x2 storage, an eMMC connector, a microSD card reader, and SPI flash for boot.",
    website: "https://milkv.io/megrez",
    page: "https://milkv.io/megrez",
    //image: "",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "milkv.ruyibook",
    name: "Milk-V Ruyibook",
    company: "Ruyibook",
    description: "The Ruyibook is the world's first laptop powered by a Xiangshan Nanhu RISC-V processor. It has 8GB of DDR5 memory, and has an AMD RX 550 GPU. The Ruyibook has 2 ethernet ports, 2 USB3 ports, a 14 inch display, HDMI out, and built in speakers.",
    website: "https://milkv.io/ruyibook",
    page: "https://milkv.io/ruyibook",
    //image: "",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "milkv.jupiternx",
    name: "Milk-V Jupiter NX",
    company: "RISC-V International",
    description: "Milk-V Jupiter NX, powered by the Spacemit K1/M1 SoC, is the world's first Mini ITX device to support both RVA22 and RVV1.0. This device is compatible with the Jetson NANO Baseboard.  The Jupiter NX is a powerful multimedia device, supporting OpenCL3.0, OpenGLES 1.1/3.2, and Vulkan 1.3 with 4k H.265/H.264/VP9/VP8. The NX has 1x 2-lane and 1x 1-lane PCIe Gen2, and supports triple camera input with 1xMIPI CSI 4-lane and 2x MIPI CSI 2-lane device support.",
    website: "https://milkv.io/jupiter-nx",
    page: "https://milkv.io/jupiter-nx",
    //image: "https://riscv.org/wp-content/uploads/2023/10/FInal-Logo-to-Uaw.png",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "milkv.megreznx",
    name: "Milk-V Megrez NX",
    company: "RISC-V International",
    description: "The Megrez NX is compatible with the Jeetson Xavier NX Baseboard.  The device contains an ESWIN EIC7700X SOC running at 1.6 GHz using a SiFive P550 quad-core RISC-V (RV64CG) processor, integrated graphics, and a 20 TOPS NPU. The board supports 8GB, 16GB, or 32GB of LPDDR5-6400 memory, has an M.2 x2 connector for PCIe 2.0 x2 storage, an eMMC connector, a microSD card reader, and SPI flash for boot.",
    website: "https://milkv.io/megrez-nx",
    page: "https://milkv.io/megrez-nx",
    //image: "https://riscv.org/wp-content/uploads/2023/10/FInal-Logo-to-Uaw.png",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "adafruit.rp2350feather",
    name: "RP2350 Feather",
    company: "Adafruit",
    description: "RP2350 flies high with the Feather format - now you can use any FeatherWings with this battery-powered dev board. It comes with 8MB of flash, a 22 pin HSTX output port, Stemma QT, debug SWD, and an optional PSRAM spot. It's our first RP2350 board and we crammed a ton of goodies into our classic Feather format. It's an excellent starter board to go along with your Pico 2.",
    website: "https://www.adafruit.com/product/6000",
    page: "https://www.adafruit.com/product/6000",
    //image: "https://d2794n4cyhr13z.cloudfront.net/vite/production/assets/adafruit-compact-256-D3J8AshC.png",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "spacemit.musebox",
    name: "SpacemiT MUSE Box",
    company: "SpacemiT",
    description: "SpacemiT MUSE™ Box is an exquisite and compact yet powerful RISC-V terminal device, equipped with the world's first 8-core RISC-V AI CPU developed by Jin Die Time Space, known as the SpacemiT Key Stone™ K1 processor . The MUSE Box is based on a standard Mini ITX motherboard. The MUSE Box has a variety of interfaces, including USB, DP&HDMI, and Ethernet. The RISC-V architecture is open-source and flexible, making the MUSE Box adaptable and future-proof.",
    website: "https://www.spacemit.com/spacemit-muse-box/",
    page: "https://www.spacemit.com/spacemit-muse-box/",
    //image: "https://riscv.org/wp-content/uploads/2022/06/SpacemiT.logo_-scaled.jpg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "spacemit.musepi",
    name: "SpacemiT MUSE Pi",
    company: "SpacemiT",
    description: "SpacemiT’s Muse Pi board has a custom P1 power management chip, 8GB of LPDDR4x-4266 memory and 32GB of eMMC storage and a set of ports that includes  USB 2.0 OTG Type-C (for power and data),  USB 3.0 Type-A, USB 2.0 Type-A, HDMI 1.4, Gigabit Ethernet, and a microSD card reader. There are also two M.2 connectors on the bottom of the board, each with support for PCIe SSDs or other devices with support for data transfer speeds up to 10 Gbps. Finally, the Muse Pi has a 26-pin GPIO header, a 4-lane MIPI-DSI connector and two 4-lane MIPI-CSI connectors as well as support for WiFi 6 and Bluetooth 5.0.",
    website: "https://www.spacemit.com/spacemit-muse-pi/",
    page: "https://www.spacemit.com/spacemit-muse-pi/",
    //image: "https://riscv.org/wp-content/uploads/2022/06/SpacemiT.logo_-scaled.jpg",
    image: null,
    tags:[],
    profile: 'unknown',
  },
    {
    id: "spacemit.musebook",
    name: "SpacemiT MUSE Book",
    company: "SpacemiT",
    description: "MUSE Book is a RISC-V laptop powered by SpacemiT’s 8-core RISC-V AI-CPU M1. It comes pre-installed with the self-developed Bianbu Operating System and includes the SpacemiT AI Development Kit. With seamless migration support for AI projects developed on ONNX Runtime, it aims to offer a more efficient and user-friendly RISC-V development platform for RISC-V enthusiasts, AI developers, tech innovators,researchers, and more.",
    website: "https://store.deepcomputing.io/products/muse-book",
    page: "https://store.deepcomputing.io/products/muse-book",
    image: null,
    tags:[],
    profile: 'unknown',
  },
  {
    id: "sifive.hifivep550devsystem",
    name: "HiFIve Premier P550 Development System",
    company: "SiFive",
    description: "The soul of the machine is a SiFive Performance™ P550 Core Complex, fabricated in a 12nm process technology; it is a quad-core application processor featuring a thirteen-stage, triple-issue, out-of-order pipeline with the RISC-V RV64GBC ISA, on-board LPDDR5, eMMC and PCIe Gen3. Board features include; 16GB/32GB LPDDR5, 1x PCIe expansion slots, dual 10/100/1000 Ethernet, SATA3, 5 x USB 3 ports, on-board GPU, NPU, 2D/3D accelerator and up to 8K@50fps or 28-channel 1080P@30fps video encoder/decoder. This is a premium software development system that comes in a modular design with the use of a System-On-Module (SOM) with up to 19.95 TOPS in INT8 AI computing power and is designed for applications like machine vision, intelligence video analysis, AI PC, server solution. RISC-V has no limits.",
    website: "https://www.sifive.com/boards/hifive-premier-p550",
    page: "https://www.sifive.com/boards/hifive-premier-p550",
    //image: "https://riscv.org/wp-content/uploads/job-manager-uploads/company_logo/2022/09/sifive-logo.png",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "renesas.fpb-r9a02g021",
    name: "FPB-R9A02G021 RISC-V MCU Fast Prototyping Board",
    company: "Renesas",
    description: "The FPB-R9A02G021 Fast Prototyping Board provides an entry point for evaluation, prototyping and development with the R9A02G021 MCU. Moreover, since this board incorporates a SEGGER J-Link™ emulator circuit, you can use it for designing your own applications without further investments in tools. This product includes through-holes for pin headers that allow access to all MCU signal pins, allowing easy prototyping with a breadboard.",
    website: "https://www.renesas.com/en/products/microcontrollers-microprocessors/risc-v/fpb-r9a02g021-fpb-r9a02g021-risc-v-mcu-fast-prototyping-board",
    page: "https://www.renesas.com/en/products/microcontrollers-microprocessors/risc-v/fpb-r9a02g021-fpb-r9a02g021-risc-v-mcu-fast-prototyping-board",
    //image: "https://riscv.org/wp-content/uploads/2022/02/renesas-electronics-corporation.svg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "raspberrypi.pico2",
    name: "Raspberry Pi Pico 2",
    company: "Raspberry Pi",
    description: "With a higher core clock speed, double the memory, more powerful Arm cores, optional RISC‑V cores, new security features, and upgraded interfacing capabilities, Raspberry Pi Pico 2 delivers a significant performance boost, while retaining compatibility with earlier members of the Raspberry Pi Pico series. Programmable in C / C++ and Python, and with detailed documentation, Raspberry Pi Pico 2 is the ideal microcontroller board for enthusiasts and professional developers alike.",
    website: "https://www.raspberrypi.com/products/raspberry-pi-pico-2/",
    page: "https://www.raspberrypi.com/products/raspberry-pi-pico-2/",
    //image: "https://riscv.org/wp-content/uploads/2020/08/Raspberry_Pi_Logo.svg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "deepcomputing.minimainboard",
    name: "DC-ROMA RISC-V Modular Mini Mainboard",
    company: "DeepComputing",
    description: "Sporting a RISC-V StarFive JH7110 SoC, this groundbreaking Mainboard was independently designed and developed by DeepComputing. It’s the main component of the very first RISC-V laptop to run Canonical’s Ubuntu Desktop and Server, and the Fedora Desktop OS and represents the first independently developed Mainboard for a Framework Laptop.  DeepComputing is leading the way in connecting developer communities, suppliers, tools and systems with the world of RISC-V.",
    website: "https://deepcomputing.io/a-risc-v-world-first-independently-developed-risc-v-mainboard-for-a-framework-laptop-from-deepcomputing/",
    page: "https://deepcomputing.io/a-risc-v-world-first-independently-developed-risc-v-mainboard-for-a-framework-laptop-from-deepcomputing/",
    //image: "https://riscv.org/wp-content/uploads/2024/09/DeepComputing-Primary-Logo.png",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "deepcompting.routerv",
    name: "DeepCompting RouterV",
    company: "DeepCompting",
    description: "A RISC-V router featuring StarFive JH7110.",
    website: "https://deepcomputing.io/ ",
    page: "https://deepcomputing.io/ ",
    //image: "https://riscv.org/wp-content/uploads/2024/09/DeepComputing-Primary-Logo.png",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "eswin.eic7700xdeveloperboard",
    name: "ESWIN EIC7700X Developer Board",
    company: "ESWIN",
    description: "EIC7700X is an excellent SoC specialized in edge computing. It has 64-bit RISC-V high-performanceCPU(processors) and self-developed efficient NPU, also it supports full-stack floating-point computingandcomprehensively accelerating generative LLM. The product has rich peripheral expansion interfaces, strongcapabilities of audio and video processing, and can be well applied in the field of computer vision(CV).",
    website: "https://www.eswincomputing.com/en/bocupload/2024/06/19/17187920991529ene8q.pdf",
    page: "https://www.eswincomputing.com/en/bocupload/2024/06/19/17187920991529ene8q.pdf",
    //image: "https://riscv.org/wp-content/uploads/2021/06/beijing-eswin-computing-technology-co.-ltd..svg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "eswin.yiyong",
    name: "ESWIN YIYONG Developer Board With EAM2011 MCU",
    company: "ESWIN",
    description: "EAM2011 32-bit MCU is a high-performance microcontroller designed specifically for theautomotiveindustry and aims to provide comprehensive solutions for automobile manufacturers andsystemintegrators. With its excellent performance, flexible and rich-featured peripherals, wide voltage power supply and wide operating temperature range, this chip provides customers with highly reliable and cost-effective solutions. EAM2011 is mainly used in automotive applications. It has a high-performance CPU, rich-featuredandflexible peripherals, a wide power supply range and a wide operating temperature. Solutions canbebuiltthat are both highly reliable and cost-effective.",
    website: "https://www.eswincomputing.com/en/bocupload/2024/06/13/171826535885466dcpe.pdf",
    page: "https://www.eswincomputing.com/en/bocupload/2024/06/13/171826535885466dcpe.pdf",
    //image: "https://riscv.org/wp-content/uploads/2021/06/beijing-eswin-computing-technology-co.-ltd..svg",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "deepcomputing.frameworkmainboard",
    name: "Framework&CoolerMasterCase withDC-ROMARISC-V Mainboard",
    company: "DeepComputing",
    description: "The DC-ROMA RISC-V Mainboard is the first RISC-V mainboard compatible with Framework Laptop 13. It is powered by the RISC-V 64-bit Quad-core CPU JH7110, this mainboard supports both Ubuntu Desktop 24.04 and Fedora 41. The modular design of the Framework laptop allows for easy replacement and upgrading of the mainboard. It features a stylish transparent case designed by Framework and Cooler Master for mainboard protection and it easily set up your desktop computer with storage, a WiFi or Ethernet Expansion Card, a USB-C Power Adapter, and a display.",
    website: "https://deepcomputing.io/product/dc-roma-risc-v-mainboard/",
    page: "https://deepcomputing.io/product/dc-roma-risc-v-mainboard/",
    //image: "https://riscv.org/wp-content/uploads/2024/09/DeepComputing-Primary-Logo.png",
    image: null,
    tags:[],
    profile: 'unknown',

  },
  {
    id: "eswin.prodigys8-100",
    name: "Prodigy S8-100 Logic System",
    company: "Eswin",
    description: "Available in three configurations—S8-100S (Single), S8-100D (Dual), and S8-100Q (Quad).",
    website: "https://www.s2cinc.com/products/prototyping-s8-100-with-VP1902/",
    page: "https://www.s2cinc.com/products/prototyping-s8-100-with-VP1902/",
    //image: "https://www.s2cinc.com/Public/Resources/img/en/product/S8-100Q.png",
    image: null,
    tags:[],
    profile: 'unknown',
  },
  {
    id: "sipeed.licheerv",
    name: "Sipeed LicheeRV - Nezha CM",
    company: "Sipeed",
    description: "A System-on-Module (SoM) based on the T-Head C906 core.",
    website: "https://www.riscvschool.com/2023/03/09/t-head-xuantie-c906-risc-v/",
    page: "https://www.riscvschool.com/2023/03/09/t-head-xuantie-c906-risc-v/",
    image: null,
    tags:[],
    profile: 'unknown',
  },
  /*
  Pro Tip: add your device in alphabetical order.
  Appending your device here (at the end) is more likely to produce Git conflicts.
   */
];

export type Device = {
  id: string;
  name: string;
  image: string;
  description: string;
  preview: string | null; // null = use our serverless screenshot service
  website: string;
  page: string | null;
  minimumVersion: string | null; // null = no minimum version
  author: string | null;
  tags: TagType[];
  maintenanceStatus: MaintainedType; // Any device with a known vulnerability is considered unmaintained, any device incompatible with latest Docusaurus stable version is considered unmaintained.
};

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export const Tags: {[type in TagType]: Tag} = {
  favourite: {
    label: translate({message: 'Featured'}),
    description: translate({
      message: 'Recent additions to the RISC-V Ecosystem',
      id: 'showcase.tag.favourite.description',
    }),
    color: '#e9669e',
  },

  asic: {
    label: translate({message: 'ASIC'}),
    description: translate({
      message: 'Device uses a custom core. Non-profile compliant.',
      id: 'showcase.tag.asic.profile',
    }),
    color: '#3ecc5f',
  },

  fpga: {
    label: translate({message: 'FPGA'}),
    description: translate({
      message: 'The device is an FPGA',
      id: 'showcase.tag.fpga.description',
    }),
    color: '#ca3c25',
  },

  certified: {
    label: translate({message: 'RISC-V Certified'}),
    description: translate({
      message: 'This device has passed the RISC-V Certification Process.',
      id: 'showcase.tag.certified.description',
    }),
    color: '#e6af2e',
  },

  profile_compliant: {
    label: translate({message: 'Profile Compliant'}),
    description: translate({
      message:
        'This device complies with one of the RISC-V Profiles.',
      id: 'showcase.tag.profile_compliant.description',
    }),
    color: '#baff29',
  }
};

export const TagList = Object.keys(Tags) as TagType[];

export type MaintenanceStatus = {
  label: string;
  description: string;
  icon: JSX.Element;
};

export const MaintenanceStatuses: {[type in MaintainedType]: MaintenanceStatus} = {
  maintained: {
    label: translate({message: 'Maintained'}),
    description: translate({
      message:
        'This device is maintained by its author and is compatible with the latest Docusaurus stable version.',
      id: 'showcase.maintenancestatus.maintained.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleCheck} color="#28a745" style={{marginLeft: 8}}/>,
  },
  unmaintained: {
    label: translate({message: 'Unmaintained'}),
    description: translate({
      message:
        'This device is not maintained by its author and is likely not compatible with the latest Docusaurus stable version.',
      id: 'showcase.maintenancestatus.unmaintained.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleXmark} color="#dc3545" style={{marginLeft: 8}}/>,
  },
  unknown: {
    label: translate({message: 'Unknown'}),
    description: translate({
      message:
        'We could not determine the maintenance status of this device.',
      id: 'showcase.maintenancestatus.unknown.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleMinus} color="#ffc107" style={{marginLeft: 8}}/>,
  },
};

export const MaintenanceStatusList = Object.keys(MaintenanceStatuses) as MaintainedType[];

export type Profile = {
  label: string;
  description: string;
  icon: JSX.Element;
};

export const Profiles: {[type in ProfileType]: ProfileStatus} = {
  rvi20: {
    label: translate({message: 'RVI20'}),
    description: translate({
      message:
        'Insert description of profile here',
      id: 'showcase.profile.rvi20.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleCheck} color="#28a745" style={{marginLeft: 8}}/>,
  },
  rva20: {
    label: translate({message: 'RVA20'}),
    description: translate({
      message:
        'Insert description of profile here',
      id: 'showcase.profile.rva20.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleXmark} color="#dc3545" style={{marginLeft: 8}}/>,
  },
  rva22: {
    label: translate({message: 'RVA22'}),
    description: translate({
      message:
        'Insert description of profile here',
      id: 'showcase.profile.RVA22.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleXmark} color="#dc3545" style={{marginLeft: 8}}/>,
  },
  rva23: {
    label: translate({message: 'RVA23'}),
    description: translate({
      message:
        'Insert description of profile here',
      id: 'showcase.profile.rva23.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleXmark} color="#dc3545" style={{marginLeft: 8}}/>,
  },
  rvb23: {
    label: translate({message: 'RVB23'}),
    description: translate({
      message:
        'Insert description of profile here',
      id: 'showcase.profile.rvb23.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleXmark} color="#dc3545" style={{marginLeft: 8}}/>,
  },
  unknown: {
    label: translate({message: 'Unknown'}),
    description: translate({
      message:
        'We could not determine the maintenance status of this device.',
      id: 'showcase.profile.unknown.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleMinus} color="#ffc107" style={{marginLeft: 8}}/>,
  },
};

export const ProfileList = Object.keys(Profiles) as ProfileType[];

function sortDevices() {
  let result = Devices;
  // Sort by site name
  result = sortBy(result, (device) => device.name.toLowerCase());
  // Sort by favourite tag, favourites first
  result = sortBy(result, (device) => !device.tags.includes('favourite'));
  return result;
}

export const sortedDevices = sortDevices();

export const deviceCount = Devices.length;
