/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root designs of this source tree.
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
  // DO NOT USE THIS TAG: we will add official designs/themes to the showcase.
  | 'open'
  | 'free'
  | 'commercial'
  | 'verilog'
  | 'systemverilog'
  | 'chisel'
  | 'otherlang'
  | 'sail'
  | 'fpga'
  | 'vhdl'
  | 'rv64'
  | 'rv32';

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

// Add designs to this list
// prettier-ignore
const Designs: Design[] = [
  {
name: "XuanTie C906",
company: "T-Head (Alibaba group)",
image: null,
license: "Alibaba commercial license",
tags: ['commercial', 'verilog'],
website: "https://occ.t-head.cn/vendor/cpu/index?id=3817197695983423488",
description: "UserSpec: RV64IMA[FD]C[V] + SV39 + ISA Extension + Memory model Extension PrivSpec: 1.1",
capability: "RV64",
},

{
name: "XuanTie C910",
company: "T-Head (Alibaba group)",
image: null,
license: "Alibaba commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.t-head.cn/product/c910?spm=a2ouz.12987052.0.0.5c5c6245WIbjoG",
description: "UserSpec: RV64GCV + SV39 + ISA Extension + Memory model Extension + multi-core & multi-cluster(16 cores maximum) PrivSpec: 1.1",
capability: "RV64",
},

{
name: "XuanTie E902",
company: "T-Head (Alibaba group)",
image: null,
license: "Alibaba commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.t-head.cn/product/e902?spm=a2ouz.12987052.0.0.5c5c6245R2yhfA",
description: "UserSpec: RV32EMC/IMC/EC PrivSpec: 1.1",
capability: "RV32",
},

{
name: "XuanTie E906",
company: "T-Head (Alibaba group)",
image: null,
license: "Alibaba commercial license",
tags: ['commercial', 'verilog'],
website: "https://occ.t-head.cn/vendor/cpu/index?id=3806463049662468096",
description: "UserSpec: RV32IMA[F][D]C + ISA Extension PrivSpec: 1.1",
capability: "RV32",
},

{
name: "A25",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-a25/",
description: "UserSpec: RV32GCP + Sv32 + Andes V5 ext. PrivSpec: 1.11",
capability: "RV32",
},

{
name: "A25MP",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-a25mp/",
description: "UserSpec: RV32GCP + Sv32 + Andes V5 ext. + Multi-core PrivSpec: 1.11",
capability: "RV32",
},

{
name: "A27",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-a27/",
description: "UserSpec: RV32GCP + Sv32 + Andes V5 ext. PrivSpec: 1.11",
capability: "RV32",
},

{
name: "A27L2",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-ax27l2/",
description: "UserSpec: RV32GCP + Sv39/48 + Andes V5 ext. PrivSpec: 1.11",
capability: "RV32",
},

{
name: "A45",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-a45/",
description: "UserSpec: RV32GCP + Sv32 + Andes V5 ext. PrivSpec: 1.11",
capability: "RV32",
},

{
name: "AX25",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-ax25/",
description: "UserSpec: RV64GCP + Sv39/48 + Andes V5 ext. PrivSpec: 1.11",
capability: "RV64",
},

{
name: "AX25MP",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-ax25mp/",
description: "UserSpec: RV64GCP + Sv39/48 + Andes V5 ext. + Multi-core PrivSpec: 1.11",
capability: "RV64",
},

{
name: "AX27",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-ax27/",
description: "UserSpec: RV64GCP + Sv39/48 + Andes V5 ext. PrivSpec: 1.11",
capability: "RV64",
},

{
name: "AX27L2",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-ax27l2/",
description: "UserSpec: RV64GCP + Sv39/48 + Andes V5 ext. PrivSpec: 1.11",
capability: "RV64",
},

{
name: "AX45",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-ax45/",
description: "UserSpec: RV64GCP + Sv39/48 + Andes V5 ext. PrivSpec: 1.11",
capability: "RV64",
},

{
name: "D25F",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-d25f/",
description: "UserSpec: RV32GCP + Andes V5 ext. PrivSpec: 1.11",
capability: "RV32",
},

{
name: "D45",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-d45/",
description: "UserSpec: RV32GCP + Andes V5 ext. PrivSpec: 1.11",
capability: "RV32",
},

{
name: "N25F",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-n25f/",
description: "UserSpec: RV32GC + Andes V5 ext. PrivSpec: 1.11",
capability: "RV32",
},

{
name: "N45",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-n45/",
description: "UserSpec: RV32GC + Andes V5 ext. PrivSpec: 1.11",
capability: "RV32",
},

{
name: "NX25F",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-nx25f/",
description: "UserSpec: RV64GC + Andes V5 ext. PrivSpec: 1.11",
capability: "RV64",
},

{
name: "NX27V",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://www.andestech.com/en/products-solutions/andescore-processors/riscv-nx27v/",
description: "UserSpec: RV64GCPV PrivSpec: 1.11",
capability: "RV64",
},

{
name: "NX45",
company: "Andes",
image: null,
license: "Andes Commercial License",
tags: ['commercial', 'verilog'],
website: "http://whttp/www.andestech.com/en/products-solutions/andescore-processors/riscv-nx45/",
description: "UserSpec: RV64GC + Andes V5 ext. PrivSpec: 1.11",
capability: "RV64",
},

{
name: "N22",
company: "Andes",
image: null,
license: "Andes FreeStart IPEA",
tags: ['commercial', 'verilog'],
website: "http://freestart.andestech.com/",
description: "UserSpec: RV32IMAC/EMAC + Andes V5/V5e ext. PrivSpec: 1.11",
capability: "RV32",
},

{
name: "Tinyriscv",
company: "Blue Liang",
image: null,
license: "Apache 2.0",
tags: ['open', 'verilog'],
website: "https://github.com/liangkangnan/tinyriscv",
description: "UserSpec: 2.1, RV32I PrivSpec: ",
capability: "RV32",
},

{
name: "Hummingbird E200",
company: "Bob Hu",
image: null,
license: "Apache 2.0",
tags: ['open', 'verilog'],
website: "https://github.com/SI-RISCV/e200_opensource",
description: "UserSpec: 2.2, RV32IMAC PrivSpec: 1.1",
capability: "RV32",
},

{
name: "RPU",
company: "Domipheus Labs",
image: null,
license: "Apache 2.0",
tags: ['open', 'vhdl'],
website: "https://github.com/Domipheus/RPU",
description: "UserSpec: RV32I PrivSpec: ",
capability: "RV32",
},

{
name: "Reve-R",
company: "Gavin Stark",
image: null,
license: "Apache 2.0",
tags: ['open', 'otherlang'],
website: "https://github.com/atthecodeface/cdl_hardware",
description: "UserSpec: RV32IMAC PrivSpec: 1.1",
capability: "RV32",
},

{
name: "Ibex (formerly Zero-riscy)",
company: "lowRISC",
image: null,
license: "Apache 2.0",
tags: ['open', 'systemverilog'],
website: "https://github.com/lowRISC/ibex",
description: "UserSpec: RV32I[M]C/RV32E[M]C PrivSpec: 1.11",
capability: "RV32",
},

{
name: "Taiga",
company: "Reconfigurable Computing Lab, Simon Fraser University",
image: null,
license: "Apache 2.0",
tags: ['open', 'systemverilog'],
website: "https://gitlab.com/sfu-rcl/Taiga",
description: "UserSpec: RV32IMA PrivSpec: ",
capability: "RV32",
},

{
name: "SSRV",
company: "risclite",
image: null,
license: "Apache 2.0",
tags: ['open', 'verilog'],
website: "https://github.com/risclite/SuperScalar-RISCV-CPU",
description: "UserSpec: RV32IMC PrivSpec: 1.1",
capability: "RV32",
},

{
name: "RSD",
company: "rsd-devel",
image: null,
license: "Apache 2.0",
tags: ['open', 'systemverilog'],
website: "https://github.com/rsd-devel/rsd",
description: "UserSpec: RV32IM PrivSpec: ",
capability: "RV32",
},

{
name: "Kronos",
company: "Sonal Pinto",
image: null,
license: "Apache 2.0",
tags: ['open', 'systemverilog'],
website: "https://github.com/SonalPinto/kronos",
description: "UserSpec: RV32I PrivSpec: ",
capability: "RV32",
},

{
name: "Starsea_riscv",
company: "Starsea",
image: null,
license: "Apache 2.0",
tags: ['open'],
website: "https://github.com/haogwb/starsea_riscv",
description: "UserSpec: RV32I PrivSpec: ",
capability: "RV32",
},

{
name: "biRISC-V",
company: "UltraEmbedded",
image: null,
license: "Apache 2.0",
tags: ['open', 'verilog'],
website: "https://github.com/ultraembedded/biriscv",
description: "UserSpec: RV32I[M] PrivSpec: 1.11",
capability: "RV32",
},

{
name: "SweRV EH1",
company: "Western Digital Corporation",
image: null,
license: "Apache 2.0",
tags: ['open', 'systemverilog'],
website: "https://github.com/chipsalliance/Cores-SweRV",
description: "UserSpec: 2.1, RV32IMC PrivSpec: 1.11",
capability: "RV32",
},

{
name: "SweRV EH2",
company: "Western Digital Corporation",
image: null,
license: "Apache 2.0",
tags: ['open', 'systemverilog'],
website: "https://github.com/chipsalliance/Cores-SweRV-EH2",
description: "UserSpec: 2.1, RV32IMAC PrivSpec: 1.11",
capability: "RV32",
},

{
name: "SweRV EL2",
company: "Western Digital Corporation",
image: null,
license: "Apache 2.0",
tags: ['open', 'systemverilog'],
website: "https://github.com/chipsalliance/Cores-SweRV-EL2",
description: "UserSpec: 2.1, RV32IMC PrivSpec: 1.11",
capability: "RV32",
},

{
name: "ParaNut",
company: "Augsburg University of Applied Sciences",
image: null,
license: "BSD",
tags: ['open', 'vhdl'],
website: "https://github.com/hsa-ees/paranut",
description: "UserSpec: RV32IM, multicore PrivSpec: 1.1",
capability: "RV32",
},

{
name: "Lizard",
company: "Cornell CSL BRG",
image: null,
license: "BSD",
tags: ['open', 'otherlang'],
website: "https://github.com/cornell-brg/lizard",
description: "UserSpec: RV64IM PrivSpec: ",
capability: "RV64",
},

{
name: "DarkRISCV",
company: "Darklife",
image: null,
license: "BSD",
tags: ['open', 'verilog'],
website: "https://github.com/darklife/darkriscv",
description: "UserSpec: most of RV32I PrivSpec: ",
capability: "RV32",
},

{
name: "Shakti",
company: "IIT Madras",
image: null,
license: "BSD",
tags: ['open', 'otherlang'],
website: "https://gitlab.com/shaktiproject",
description: "UserSpec: 2.2, RV64IMAFDC PrivSpec: 1.11",
capability: "RV64",
},

{
name: "Minerva",
company: "LambdaConcept",
image: null,
license: "BSD",
tags: ['open', 'otherlang'],
website: "https://github.com/lambdaconcept/minerva",
description: "UserSpec: RV32I PrivSpec: 1.1",
capability: "RV32",
},

{
name: "MYTH Cores",
company: "MYTH Workshop students",
image: null,
license: "BSD",
tags: ['open', 'verilog'],
website: "https://github.com/stevehoover/RISC-V_MYTH_Workshop/blob/master/student_projects.md",
description: "UserSpec: RV32I PrivSpec: ",
capability: "RV32",
},

{
name: "freedom",
company: "SiFive",
image: null,
license: "BSD",
tags: ['open', 'chisel'],
website: "https://github.com/sifive/freedom",
description: "UserSpec: 2.3-draft PrivSpec: 1.11-draft",
capability: "RV32,RV64",
},

{
name: "rocket",
company: "SiFive, UCB Bar",
image: null,
license: "BSD",
tags: ['open', 'chisel'],
website: "https://github.com/freechipsproject/rocket-chip",
description: "UserSpec: 2.3-draft PrivSpec: 1.11-draft",
capability: "RV32",
},

{
name: "NEORV32",
company: "Stephan Nolting",
image: null,
license: "BSD",
tags: ['open', 'vhdl'],
website: "https://github.com/stnolting/neorv32",
description: "UserSpec: RV32[I/E][M][A][C][Zfinx][Zicsr][Zifencei] PrivSpec: 1.12-draft",
capability: "RV32",
},

{
name: "WARP-V",
company: "Steve Hoover, Redwood EDA",
image: null,
license: "BSD",
tags: ['open', 'verilog'],
website: "https://github.com/stevehoover/warp-v",
description: "UserSpec: RV32I[M][F] PrivSpec: ",
capability: "RV32",
},

{
name: "Berkeley Out-of-Order Machine (BOOM)",
company: "UCB BAR",
image: null,
license: "BSD",
tags: ['open', 'chisel'],
website: "https://boom-core.org/",
description: "UserSpec: 2.3-draft PrivSpec: 1.11-draft",
capability: "RV64",
},

{
name: "BI-350",
company: "CloudBEAR",
image: null,
license: "CloudBEAR Commercial License",
tags: ['commercial', 'systemverilog'],
website: "https://cloudbear.ru/bi_350.html",
description: "UserSpec: RV32IMAFC + multi-core PrivSpec: 1.1",
capability: "RV32",
},

{
name: "BI-651",
company: "CloudBEAR",
image: null,
license: "CloudBEAR Commercial License",
tags: ['commercial', 'systemverilog'],
website: "https://cloudbear.ru/bi_651.html",
description: "UserSpec: RV64GC + multi-core PrivSpec: 1.1",
capability: "RV64",
},

{
name: "BI-671",
company: "CloudBEAR",
image: null,
license: "CloudBEAR Commercial License",
tags: ['commercial', 'systemverilog'],
website: "https://cloudbear.ru/bi_671.html",
description: "UserSpec: RV64GC + multi-core PrivSpec: 1.1",
capability: "RV64",
},

{
name: "BM-310",
company: "CloudBEAR",
image: null,
license: "CloudBEAR Commercial License",
tags: ['commercial', 'systemverilog'],
website: "https://cloudbear.ru/bm_310.html",
description: "UserSpec: RV32IMC PrivSpec: 1.1",
capability: "RV32",
},

{
name: "A70X",
company: "Codasip",
image: null,
license: "Codasip EULA",
tags: ['commercial', 'verilog'],
website: "https://codasip.com/risc-v-processors",
description: "UserSpec: RV64IMAFDC PrivSpec: 1",
capability: "RV64",
},

{
name: "H50X",
company: "Codasip",
image: null,
license: "Codasip EULA",
tags: ['commercial', 'verilog'],
website: "https://codasip.com/risc-v-processors",
description: "UserSpec: RV64IMC PrivSpec: 1",
capability: "RV64",
},

{
name: "H50XF",
company: "Codasip",
image: null,
license: "Codasip EULA",
tags: ['commercial', 'verilog'],
website: "https://codasip.com/risc-v-processors",
description: "UserSpec: RV64IMFDC PrivSpec: 1",
capability: "RV64",
},

{
name: "L10",
company: "Codasip",
image: null,
license: "Codasip EULA",
tags: ['commercial', 'verilog'],
website: "https://codasip.com/risc-v-processors",
description: "UserSpec: RV32EMC PrivSpec: 1",
capability: "RV32",
},

{
name: "L30",
company: "Codasip",
image: null,
license: "Codasip EULA",
tags: ['commercial', 'verilog'],
website: "https://codasip.com/risc-v-processors",
description: "UserSpec: RV32IMC PrivSpec: 1",
capability: "RV32",
},

{
name: "L30F",
company: "Codasip",
image: null,
license: "Codasip EULA",
tags: ['commercial', 'verilog'],
website: "https://codasip.com/risc-v-processors",
description: "UserSpec: RV32IMFC PrivSpec: 1",
capability: "RV32",
},

{
name: "L50",
company: "Codasip",
image: null,
license: "Codasip EULA",
tags: ['commercial', 'verilog'],
website: "https://codasip.com/risc-v-processors",
description: "UserSpec: RV32IMC PrivSpec: 1",
capability: "RV32",
},

{
name: "L50F",
company: "Codasip",
image: null,
license: "Codasip EULA",
tags: ['commercial', 'verilog'],
website: "https://codasip.com/risc-v-processors",
description: "UserSpec: RV32IMFC PrivSpec: 1",
capability: "RV32",
},

{
name: "VEGA",
company: "C-DAC",
image: null,
license: "commercial",
tags: ['commercial', 'otherlang'],
website: "https://vegaprocessors.in/",
description: "UserSpec: 2.2, RV[32/64]IMA[F][D][C], Multi-core PrivSpec: 1.1",
capability: "RV32, RV64",
},

{
name: "EMSA5-FS",
company: "Fraunhofer IPMS",
image: null,
license: "Commercial",
tags: ['commercial', 'systemverilog'],
website: "https://www.ipms.fraunhofer.de/de/Components-and-Systems/Components-and-Systems-Data-Communication/ip-cores/IP-Core-Modules/RISC-V-Processor-IP-Core.html",
description: "UserSpec: RV32I(E)[M][C][Zicsr][Zifencei] + ISO 26262 pre certification PrivSpec: 1.11",
capability: "RV32",
},

{
name: "Atrevido",
company: "SemiDynamics",
image: null,
license: "Commercial",
tags: ['commercial', 'systemverilog'],
website: "https://semidynamics.com/products/atrevido",
description: "UserSpec: RV64GC, 2.2, multicore, V-ready PrivSpec: 1.1",
capability: "RV64",
},

{
name: "Avispado",
company: "SemiDynamics",
image: null,
license: "Commercial",
tags: ['commercial', 'systemverilog'],
website: "https://semidynamics.com/products/avispado",
description: "UserSpec: RV64GC, 2.2, multicore, V-ready PrivSpec: 1.1",
capability: "RV64",
},

{
name: "SCR3",
company: "Syntacore",
image: null,
license: "commercial",
tags: ['commercial', 'systemverilog'],
website: "https://syntacore.com/page/products/processor-ip/scr3",
description: "UserSpec: RV[32/64]IMC[A], 2.2, milticore PrivSpec: 1.1",
capability: "RV32,RV64",
},

{
name: "SCR4",
company: "Syntacore",
image: null,
license: "commercial",
tags: ['commercial', 'systemverilog'],
website: "https://syntacore.com/page/products/processor-ip/scr4",
description: "UserSpec: RV[32/64]IMCF[DA], 2.2, milticore PrivSpec: 1.1",
capability: "RV32,RV64",
},

{
name: "SCR5",
company: "Syntacore",
image: null,
license: "commercial",
tags: ['commercial', 'systemverilog'],
website: "https://syntacore.com/page/products/processor-ip/scr5",
description: "UserSpec: RV[32/64]IMC[FDA], 2.2, milticore PrivSpec: 1.1",
capability: "RV32,RV64",
},

{
name: "SCR7",
company: "Syntacore",
image: null,
license: "commercial",
tags: ['commercial', 'systemverilog'],
website: "https://syntacore.com/page/products/processor-ip/scr7",
description: "UserSpec: RV64GC, 2.2, milticore PrivSpec: 1.1",
capability: "RV64",
},

{
name: "Instant SoC",
company: "FPGA Cores",
image: null,
license: "Free Non Commercial",
tags: ['open', 'vhdl'],
website: "http://www.fpga-cores.com/instant-soc/",
description: "UserSpec: RV32IM PrivSpec: ",
capability: "RV32",
},

{
name: "ReonV",
company: "Lucas Castro",
image: null,
license: "GPL v3",
tags: ['open', 'vhdl'],
website: "https://github.com/lcbcFoo/ReonV",
description: "UserSpec:  PrivSpec: ",
capability: "RV32",
},

{
name: "NOEL-V",
company: "Cobham Gaisler",
image: null,
license: "GPL, Commercial",
tags: ['open', 'vhdl'],
website: "https://www.gaisler.com/NOEL-V",
description: "UserSpec: RV32GC,RV64GC PrivSpec: 1.11",
capability: "RV32,RV64",
},

{
name: "RV32EC_FMP5",
company: "IQonIC Works",
image: null,
license: "IQonIC Works Commercial License",
tags: ['commercial', 'systemverilog'],
website: "http://iqonicworks.com/risc-v-ip/",
description: "UserSpec: RV32EC PrivSpec: Custom",
capability: "RV32",
},

{
name: "RV32EC_P2",
company: "IQonIC Works",
image: null,
license: "IQonIC Works Commercial License",
tags: ['commercial', 'systemverilog'],
website: "http://iqonicworks.com/risc-v-ip/",
description: "UserSpec: RV32E[M]C/RV32I[M]C PrivSpec: 1.11",
capability: "RV32",
},

{
name: "RV32IC_P5",
company: "IQonIC Works",
image: null,
license: "IQonIC Works Commercial License",
tags: ['commercial', 'systemverilog'],
website: "http://iqonicworks.com/risc-v-ip/",
description: "UserSpec: RV32I[M][N][A]C PrivSpec: 1.11",
capability: "RV32",
},

{
name: "PicoRV32",
company: "Clifford Wolf",
image: null,
license: "ISC",
tags: ['commercial', 'verilog'],
website: "https://github.com/cliffordwolf/picorv32",
description: "UserSpec: RV32I/E[MC] PrivSpec: ",
capability: "RV32",
},

{
name: "SERV",
company: "Olof Kindgren",
image: null,
license: "ISC",
tags: ['commercial', 'verilog'],
website: "https://github.com/olofk/serv",
description: "UserSpec: RV32I PrivSpec: ",
capability: "RV32",
},

{
name: "RV01",
company: "Stefano Tonello",
image: null,
license: "LPGL",
tags: ['open', 'vhdl'],
website: "https://opencores.org/projects/rv01_riscv_core",
description: "UserSpec: 2.1, RV32IM PrivSpec: 1.7",
capability: "RV32",
},

{
name: "Fedar F1",
company: "Emin FEDAR",
image: null,
license: "MIT",
tags: ['open', 'verilog'],
website: "https://github.com/eminfedar/fedar-f1-rv64im",
description: "UserSpec: RV64IM PrivSpec: ",
capability: "RV64",
},

{
name: "Maestro",
company: "João Chrisóstomo",
image: null,
license: "MIT",
tags: ['open', 'vhdl'],
website: "https://github.com/Artoriuz/maestro",
description: "UserSpec: RV32I PrivSpec: ",
capability: "RV32",
},

{
name: "Riscy Processors",
company: "MIT CSAIL CSG",
image: null,
license: "MIT",
tags: ['open', 'otherlang'],
website: "https://github.com/csail-csg/riscy",
description: "UserSpec:  PrivSpec: ",
capability: "RV32,RV64",
},

{
name: "RiscyOO",
company: "MIT CSAIL CSG",
image: null,
license: "MIT",
tags: ['open', 'otherlang'],
website: "https://github.com/csail-csg/riscy-OOO",
description: "UserSpec: RV64IMAFD PrivSpec: 1.1",
capability: "RV64",
},

{
name: "OPenV/mriscv",
company: "OnChipUIS",
image: null,
license: "MIT",
tags: ['open', 'verilog'],
website: "https://github.com/onchipuis/mriscv",
description: "UserSpec: RV32I(?) PrivSpec: ",
capability: "RV32",
},

{
name: "VexRiscv Plugins for B and K",
company: "Romain Dolbeau",
image: null,
license: "MIT",
tags: ['open', 'otherlang'],
website: "https://github.com/rdolbeau/VexRiscvBPluginGenerator/",
description: "UserSpec: RV32[B][K] for the VexRiscV core PrivSpec: N/A",
capability: "RV32",
},

{
name: "VexRiscv",
company: "SpinalHDL",
image: null,
license: "MIT",
tags: ['open', 'verilog'],
website: "https://github.com/SpinalHDL/VexRiscv",
description: "UserSpec: RV32I/E[M][A][F[D]][C] PrivSpec: 1.1",
capability: "RV32",
},

{
name: "Hornet",
company: "Yavuz Selim Tozlu",
image: null,
license: "MIT",
tags: ['open', 'verilog'],
website: "https://github.com/yavuz650/RISC-V",
description: "UserSpec: RV32IM PrivSpec: 1.1",
capability: "RV32",
},

{
name: "Steel",
company: "Rafael Calcada",
image: null,
license: "MIT License",
tags: ['open', 'verilog'],
website: "https://github.com/rafaelcalcada/steel-core",
description: "UserSpec: RV32IZicsr PrivSpec: 1.11",
capability: "RV32",
},

{
name: "NutShell",
company: "UCAS & ICT,CAS",
image: null,
license: "Mulan Permissive Software License V2",
tags: ['commercial', 'chisel'],
website: "https://github.com/OSCPU/NutShell",
description: "UserSpec: RV64IMAC PrivSpec: 1.11",
capability: "RV64",
},

{
name: "Roa Logic RV12",
company: "Roa Logic",
image: null,
license: "Non-Commercial License",
tags: ['commercial', 'systemverilog'],
website: "https://github.com/roalogic/RV12",
description: "UserSpec: 2.1 PrivSpec: 1.9.1",
capability: "RV32",
},

{
name: "N100",
company: "Nuclei",
image: null,
license: "Nuclei commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.nucleisys.com/product.php",
description: "UserSpec: RV32EC PrivSpec: 1.11",
capability: "RV32",
},

{
name: "N200",
company: "Nuclei",
image: null,
license: "Nuclei commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.nucleisys.com/product.php",
description: "UserSpec: RV32IC(E)(M)(A) PrivSpec: 1.11",
capability: "RV32",
},

{
name: "N300",
company: "Nuclei",
image: null,
license: "Nuclei commercial license",
tags: ['commercial', 'verilog'],
website: "",
description: "UserSpec: RV32IMAC(F)(D)(P) PrivSpec: 1.11",
capability: "RV32",
},

{
name: "N600",
company: "Nuclei",
image: null,
license: "Nuclei commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.nucleisys.com/product.php",
description: "UserSpec: RV32IMAC(F)(D)(P) PrivSpec: 1.11",
capability: "RV32",
},

{
name: "NX600",
company: "Nuclei",
image: null,
license: "Nuclei commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.nucleisys.com/product.php",
description: "UserSpec: RV64IMAC(F)(D)(P) PrivSpec: 1.11",
capability: "RV32",
},

{
name: "UX600",
company: "Nuclei",
image: null,
license: "Nuclei commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.nucleisys.com/product.php",
description: "UserSpec: RV64IMAC(F)(D)(P) + MMU-SV39 PrivSpec: 1.11",
capability: "RV64",
},

{
name: "Pluto",
company: "PQShield",
image: null,
license: "PQShield Commercial License",
tags: ['commercial', 'verilog'],
website: "https://pqsoc.com/",
description: "UserSpec: RV32I[M][C] / RV32E[M][C] + Crypto Functions PrivSpec: 1.11",
capability: "RV32",
},

{
name: "SCR1",
company: "Syntacore",
image: null,
license: "SHL v. 2.0",
tags: ['commercial', 'systemverilog'],
website: "https://github.com/syntacore/scr1",
description: "UserSpec: 2.2, RV32I/E[MC] PrivSpec: 1.1",
capability: "RV32",
},

{
name: "E2",
company: "SiFive",
image: null,
license: "SiFive commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.sifive.com/cores/e24",
description: "UserSpec: RV32I(E)MAFC 2.2 PrivSpec: 1.11",
capability: "RV32",
},

{
name: "E3",
company: "SiFive",
image: null,
license: "SiFive commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.sifive.com/cores/e34",
description: "UserSpec: RV32I(E)MAFDC 2.2 PrivSpec: 1.11",
capability: "RV32",
},

{
name: "E7",
company: "SiFive",
image: null,
license: "SiFive commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.sifive.com/cores/e76",
description: "UserSpec: RV32I(E)MAFDC 2.2 PrivSpec: 1.11",
capability: "RV32",
},

{
name: "S2",
company: "SiFive",
image: null,
license: "SiFive commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.sifive.com/cores/s21",
description: "UserSpec: RV64GC 2.2 PrivSpec: 1.11",
capability: "RV64",
},

{
name: "S5",
company: "SiFive",
image: null,
license: "SiFive commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.sifive.com/cores/s54",
description: "UserSpec: RV64GC 2.2 PrivSpec: 1.11",
capability: "RV64",
},

{
name: "S7",
company: "SiFive",
image: null,
license: "SiFive commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.sifive.com/cores/s76",
description: "UserSpec: RV64GC 2.2 PrivSpec: 1.11",
capability: "RV64",
},

{
name: "U5",
company: "SiFive",
image: null,
license: "SiFive commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.sifive.com/cores/u54",
description: "UserSpec: RV64GC 2.2 PrivSpec: 1.11",
capability: "RV64",
},

{
name: "U7",
company: "SiFive",
image: null,
license: "SiFive commercial license",
tags: ['commercial', 'verilog'],
website: "https://www.sifive.com/cores/u74",
description: "UserSpec: RV64GC 2.2 PrivSpec: 1.11",
capability: "RV64",
},

{
name: "Klessydra-F03",
company: "Digital Systems Lab at Sapienza University of Rome",
image: null,
license: "Solderpad Hardware License v. 0.51",
tags: ['commercial', 'vhdl'],
website: "https://github.com/klessydra/F03x",
description: "UserSpec: RV32I[A] PrivSpec: 1.11",
capability: "RV32",
},

{
name: "Klessydra-T02",
company: "Digital Systems Lab at Sapienza University of Rome",
image: null,
license: "Solderpad Hardware License v. 0.51",
tags: ['commercial', 'vhdl'],
website: "https://github.com/klessydra/T02x",
description: "UserSpec: RV32I[A] PrivSpec: 1.11",
capability: "RV32",
},

{
name: "Klessydra-T03",
company: "Digital Systems Lab at Sapienza University of Rome",
image: null,
license: "Solderpad Hardware License v. 0.51",
tags: ['commercial', 'vhdl'],
website: "https://github.com/klessydra/T03x",
description: "UserSpec: RV32I[A] PrivSpec: 1.11",
capability: "RV32",
},

{
name: "Klessydra-T13",
company: "Digital Systems Lab at Sapienza University of Rome",
image: null,
license: "Solderpad Hardware License v. 0.51",
tags: ['commercial', 'vhdl'],
website: "https://github.com/klessydra/T13x",
description: "UserSpec: RV32[I/E][M][A] + Kless-Vect PrivSpec: 1.11",
capability: "RV32",
},

{
name: "CV32E40P",
company: "OpenHW Group",
image: null,
license: "Solderpad Hardware License v. 0.51",
tags: ['commercial', 'systemverilog'],
website: "https://github.com/openhwgroup/cv32e40p",
description: "UserSpec: RV32IM[F]C PrivSpec: 1.11",
capability: "RV32",
},

{
name: "CVA6",
company: "OpenHW Group",
image: null,
license: "Solderpad Hardware License v. 0.51",
tags: ['commercial', 'systemverilog'],
website: "https://github.com/openhwgroup/cva6",
description: "UserSpec: RV[32/64]GC PrivSpec: 1.11",
capability: "RV32,RV64",
},

{
name: "WH32",
company: "UC Techip",
image: null,
license: "UC Techip Commercial License",
tags: ['commercial', 'chisel'],
website: "https://www.uctechip.com/#product",
description: "UserSpec: RV32GCX PrivSpec: 1.1",
capability: "RV32",
},

{
name: "MR1",
company: "Tom Verbeure",
image: null,
license: "Unlicense",
tags: ['commercial', 'otherlang'],
website: "https://github.com/tomverbeure/mr1",
description: "UserSpec: RV32I PrivSpec: ",
capability: "RV32",
},
  /*
  Pro Tip: add your design in alphabetical order.
  Appending your design here (at the end) is more likely to produce Git conflicts.
   */
];

export type Design = {
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
  maintenanceStatus: MaintainedType; // Any design with a known vulnerability is considered unmaintained, any design incompatible with latest Docusaurus stable version is considered unmaintained.
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
      message: 'a',
      id: 'showcase.tag.favourite.description',
    }),
    color: '#e9669e',
  },

  open: {
    label: translate({message: 'Open'}),
    description: translate({
      message: 'a',
      id: 'showcase.tag.open.description',
    }),
    color: '#3ecc5f',
  },

  free: {
    label: translate({message: 'Free'}),
    description: translate({
      message: 'a',
      id: 'showcase.tag.free.description',
    }),
    color: '#ca3c25',
  },

  commercial: {
    label: translate({message: 'Commercial'}),
    description: translate({
      message: 'a',
      id: 'showcase.tag.commercial.description',
    }),
    color: '#e6af2e',
  },

  verilog: {
    label: translate({message: 'Verilog'}),
    description: translate({
      message: 'a',
      id: 'showcase.tag.verilog.description',
    }),
    color: '#e6af2e',
  },

  sail: {
    label: translate({message: 'SAIL'}),
    description: translate({
      message: 'a',
      id: 'showcase.tag.sail.description',
    }),
    color: '#e6af2e',
  },

  fpga: {
    label: translate({message: 'FPGA'}),
    description: translate({
      message: 'a',
      id: 'showcase.tag.fpga.description',
    }),
    color: '#e6af2e',
  },

  vhdl: {
    label: translate({message: 'VHDL'}),
    description: translate({
      message:
        'This design complies with one of the RISC-V Profiles.',
      id: 'showcase.tag.vhdl.description',
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
        'This design is maintained and is compatible with the latest Docusaurus stable version.',
      id: 'showcase.maintenancestatus.maintained.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleCheck} color="#28a745" style={{marginLeft: 8}}/>,
  },
  unmaintained: {
    label: translate({message: 'Unmaintained'}),
    description: translate({
      message:
        'This design is not maintained and is likely not compatible with the latest Docusaurus stable version.',
      id: 'showcase.maintenancestatus.unmaintained.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleXmark} color="#dc3545" style={{marginLeft: 8}}/>,
  },
  unknown: {
    label: translate({message: 'Unknown'}),
    description: translate({
      message:
        'We could not determine the maintenance status of this design.',
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
        'We could not determine the maintenance status of this design.',
      id: 'showcase.profile.unknown.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleMinus} color="#ffc107" style={{marginLeft: 8}}/>,
  },
};

export const ProfileList = Object.keys(Profiles) as ProfileType[];

function sortDesigns() {
  let result = Designs;
  // Sort by site name
  result = sortBy(result, (design) => design.name.toLowerCase());
  // Sort by favourite tag, favourites first
  result = sortBy(result, (design) => !design.tags.includes('favourite'));
  return result;
}

export const sortedDesigns = sortDesigns();

export const designCount = Designs.length;
