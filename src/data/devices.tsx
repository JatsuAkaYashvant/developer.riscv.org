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
    id: 'test.test1',
    name: 'Test 1',
    image:null,
    description: 'Test 1 description 12345',
    preview: null,
    website: 'pathname:///directory/test/1',
    page: 'https://riscv.org',
    author: 'riscv',
    tags: ['certified', 'profile_compliant'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    profile: 'rva23',
  },
  {
    id: 'test.test2',
    name: 'Test 2',
    image:null,
    description: 'This is yet another test device',
    preview: null,
    website: 'pathname:///directory/test/2',
    page: 'https://riscv.org',
    author: 'riscv',
    tags: ['certified','favourite'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    profile: 'unknown',
  },
  {
    id: 'test.test3',
    name: 'Test 3',
    image:null,
    description: 'ipsum lorum mcawesome sauce',
    preview: null,
    website: 'pathname:///directory/test/3',
    page: 'https://riscv.org',
    author: 'riscv',
    tags: ['fpga','profile_compliant'],
    minimumVersion: null,
    maintenanceStatus: 'unknown', 
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
